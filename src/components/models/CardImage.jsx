import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function CardImage({
  r = "false",
  url,
  on,
  backUrl = "/card/뒷면.png",
  position = [0, 0, 0],
  ...props
}) {
  const front = useLoader(THREE.TextureLoader, on? url:'/card/미확인.png');
  const back = useLoader(THREE.TextureLoader, backUrl);

  return (
    <group
      scale={0.28}
      position={position}
      rotation={r === "true" || r === true ? [0.1, Math.PI, 0] : [-0.1, 0, 0]}
      {...props}
    >
      {/* 앞면 */}
      <mesh>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial map={front} transparent />
      </mesh>
      {/* 뒷면 (Y축 180도 회전) */}
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial map={back} transparent />
      </mesh>
    </group>
  );
}
