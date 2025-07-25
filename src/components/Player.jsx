import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Euler } from "three";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";

export function Player() {
  const { camera } = useThree();
  const playerRef = useRef();
  const cameraRotation = useRef(new Euler(0, 0, 0, "YXZ"));
  const navigate = useNavigate();

  // 게임 상태
  const {
    heritages,
    setCurrentInteractionCard,
    setShowInteractionPrompt,
    currentInteractionCard,
  } = useGameStore();

  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    f: false,
  });

  // 걷기 화면 흔들림(bob) 관련 상태
  const walkTime = useRef(0);

  const moveSpeed = 8; // 속도 증가
  const jumpForce = 6; // 점프력 감소 (더 낮은 점프)
  const interactionDistance = 3; // 상호작용 거리

  // 카메라 초기 설정
  useEffect(() => {
    // 카메라 초기 위치 및 회전 설정 (박물관 중심, 오른쪽 바라보게)
    camera.position.set(0, 3, 0);
    camera.rotation.set(0, Math.PI / 2, 0); // Y축 90도
    camera.up.set(0, 1, 0);
    cameraRotation.current.set(0, Math.PI / -2, 0); // Y축 90도
    camera.updateMatrixWorld();
  }, [camera]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "KeyW":
          setKeys((prev) => ({ ...prev, w: true }));
          break;
        case "KeyA":
          setKeys((prev) => ({ ...prev, a: true }));
          break;
        case "KeyS":
          setKeys((prev) => ({ ...prev, s: true }));
          break;
        case "KeyD":
          setKeys((prev) => ({ ...prev, d: true }));
          break;
        case "Space":
          event.preventDefault();
          setKeys((prev) => ({ ...prev, space: true }));
          break;
        case "KeyF":
          event.preventDefault();
          setKeys((prev) => ({ ...prev, f: true }));
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case "KeyW":
          setKeys((prev) => ({ ...prev, w: false }));
          break;
        case "KeyA":
          setKeys((prev) => ({ ...prev, a: false }));
          break;
        case "KeyS":
          setKeys((prev) => ({ ...prev, s: false }));
          break;
        case "KeyD":
          setKeys((prev) => ({ ...prev, d: false }));
          break;
        case "Space":
          setKeys((prev) => ({ ...prev, space: false }));
          break;
        case "KeyF":
          setKeys((prev) => ({ ...prev, f: false }));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // F키 상호작용 처리
  useEffect(() => {
    if (keys.f && currentInteractionCard) {
      const heritage = heritages.find((h) => h.id === currentInteractionCard);
      if (heritage && heritage.unlocked) {
        navigate(`/heritage/${heritage.id}`);
      }
      setKeys((prev) => ({ ...prev, f: false })); // F키 상태 리셋
    }
  }, [keys.f, currentInteractionCard, heritages, navigate]);

  // 마우스 컨트롤 설정
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const handleClick = () => {
      canvas.requestPointerLock();
    };

    const handleMouseMove = (event) => {
      if (document.pointerLockElement === canvas) {
        const { movementX, movementY } = event;

        cameraRotation.current.y -= movementX * 0.002;
        cameraRotation.current.x -= movementY * 0.002;

        // 상하 시야각 제한
        cameraRotation.current.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, cameraRotation.current.x)
        );
      }
    };

    canvas?.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas?.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera]);

  // 가장 가까운 카드 찾기 함수
  const findNearestCard = (playerPosition) => {
    let nearestCard = null;
    let nearestDistance = interactionDistance;

    heritages.forEach((heritage) => {
      const cardPosition = new Vector3(...heritage.position);
      const distance = playerPosition.distanceTo(cardPosition);

      if (distance < nearestDistance && heritage.unlocked) {
        nearestDistance = distance;
        nearestCard = heritage.id;
      }
    });

    return nearestCard;
  };

  useFrame((_, delta) => {
    if (!playerRef.current) {
      camera.position.set(0, 3, 0);
      camera.rotation.copy(cameraRotation.current);
      return;
    }

    const player = playerRef.current;

    // 플레이어 회전 제어 (기울어짐 방지)
    const currentRotation = player.rotation();
    if (
      Math.abs(currentRotation.x) > 0.1 ||
      Math.abs(currentRotation.z) > 0.1
    ) {
      player.setRotation({ x: 0, y: currentRotation.y, z: 0, w: 1 }, false);
    }

    // 카메라 시점 기준 이동 방식
    const currentVel = player.linvel();
    let newVelX = 0;
    let newVelZ = 0;

    // 기본 이동 방향 (카메라 로컬 좌표계)
    let forwardBack = 0;
    let leftRight = 0;

    if (keys.w) forwardBack = 1; // 앞으로
    if (keys.s) forwardBack = -1; // 뒤로
    if (keys.a) leftRight = -1; // 왼쪽
    if (keys.d) leftRight = 1; // 오른쪽

    // 카메라 Y축 회전 기준으로 방향 변환
    let isWalking = false;
    if (forwardBack !== 0 || leftRight !== 0) {
      isWalking = true;
      const yRotation = cameraRotation.current.y;
      const cos = Math.cos(yRotation);
      const sin = Math.sin(yRotation);

      // 전진/후진: 카메라가 보는 방향
      const forwardX = -sin * forwardBack; // 카메라 forward는 -Z 방향
      const forwardZ = -cos * forwardBack;

      // 좌우: 카메라의 우측 방향
      const rightX = cos * leftRight;
      const rightZ = -sin * leftRight;

      newVelX = (forwardX + rightX) * moveSpeed;
      newVelZ = (forwardZ + rightZ) * moveSpeed;

      // 대각선 이동시 속도 정규화
      if (forwardBack !== 0 && leftRight !== 0) {
        const factor = 0.707; // sqrt(2)/2
        newVelX *= factor;
        newVelZ *= factor;
      }
    }

    // 속도 설정
    player.setLinvel({ x: newVelX, y: currentVel.y, z: newVelZ }, true);

    // 점프 (더 빠르고 낮게)
    const currentVel2 = player.linvel();
    if (keys.space && Math.abs(currentVel2.y) < 0.3) {
      player.setLinvel(
        { x: currentVel2.x, y: jumpForce, z: currentVel2.z },
        true
      );
    }

    // 걷기 화면 흔들림(bob) 계산
    if (isWalking) {
      walkTime.current += delta * 8; // 속도 조절 (8이 기본, 더 빠르게/느리게 조정 가능)
    } else {
      // 멈추면 천천히 0으로 감쇠
      walkTime.current = Math.max(0, walkTime.current - delta * 10);
    }

    // 카메라를 플레이어 위치에 맞춤 + bobbing 적용
    const playerPosition = player.translation();
    // 걷기 bobbing 파라미터
    const bobAmountY = isWalking ? Math.sin(walkTime.current) * 0.07 : 0; // 상하
    const bobAmountX = isWalking ? Math.sin(walkTime.current * 2) * 0.03 : 0; // 좌우
    camera.position.set(
      playerPosition.x + bobAmountX,
      playerPosition.y + 1.6 + bobAmountY,
      playerPosition.z
    );

    // 카메라 회전 적용 (기울어짐 방지)
    camera.rotation.copy(cameraRotation.current);
    camera.rotation.z = 0;
    camera.up.set(0, 1, 0);
    camera.quaternion.normalize();

    // 상호작용 가능한 카드 찾기
    const playerPos = new Vector3(
      playerPosition.x,
      playerPosition.y,
      playerPosition.z
    );
    const nearestCard = findNearestCard(playerPos);

    if (nearestCard !== currentInteractionCard) {
      setCurrentInteractionCard(nearestCard);
      setShowInteractionPrompt(nearestCard !== null);
    }
  });

  return (
    <RigidBody
      ref={playerRef}
      position={[-35, 7, 1]} // 박물관 중심에서 시작
      enabledRotations={[false, false, false]} // 모든 회전 비활성화
      type="dynamic"
      mass={1}
      friction={0.0} // 마찰 제거 - 순수한 키보드 컨트롤
      restitution={0} // 탄성 제거
      linearDamping={0.8} // 높은 감쇠로 즉시 정지
      angularDamping={1.0}
    >
      <CapsuleCollider args={[0.8, 0.4]} />
    </RigidBody>
  );
}
