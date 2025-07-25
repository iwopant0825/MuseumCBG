import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export function FirstPersonControls() {
  const { camera } = useThree();
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  });

  const velocity = useRef(new Vector3(0, 0, 0));
  const direction = useRef(new Vector3(0, 0, 0));
  const isJumping = useRef(false);
  const moveSpeed = 8;
  const jumpSpeed = 10;
  const gravity = -25;

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
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 마우스 포인터 락
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const handleClick = () => {
      canvas.requestPointerLock();
    };

    const handleMouseMove = (event) => {
      if (document.pointerLockElement === canvas) {
        const { movementX, movementY } = event;

        camera.rotation.y -= movementX * 0.002;
        camera.rotation.x -= movementY * 0.002;

        // 상하 시야각 제한
        camera.rotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, camera.rotation.x)
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

  useFrame((state, delta) => {
    // 이동 방향 계산
    direction.current.set(0, 0, 0);

    if (keys.w) direction.current.z -= 1;
    if (keys.s) direction.current.z += 1;
    if (keys.a) direction.current.x -= 1;
    if (keys.d) direction.current.x += 1;

    // 카메라 방향에 따른 이동
    direction.current.normalize();
    direction.current.applyQuaternion(camera.quaternion);
    direction.current.y = 0; // Y축 이동 제거 (걷기만)

    // 속도 적용
    velocity.current.x = direction.current.x * moveSpeed;
    velocity.current.z = direction.current.z * moveSpeed;

    // 점프 처리
    if (keys.space && !isJumping.current) {
      velocity.current.y = jumpSpeed;
      isJumping.current = true;
    }

    // 중력 적용
    velocity.current.y += gravity * delta;

    // 위치 업데이트
    camera.position.add(velocity.current.clone().multiplyScalar(delta));

    // 바닥 충돌 감지 (간단한 구현)
    if (camera.position.y < 2) {
      camera.position.y = 2;
      velocity.current.y = 0;
      isJumping.current = false;
    }
  });

  return null;
}
