import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Text } from "@react-three/drei";

function RotatingBox({ position }) {
  const boxRef = useRef();

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.5;
      boxRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Box
      ref={boxRef}
      position={position}
      args={[1, 1, 1]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color="orange" />
    </Box>
  );
}

function FloatingSphere({ position }) {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Sphere ref={sphereRef} position={position} args={[0.5, 32, 16]} castShadow>
      <meshStandardMaterial color="lightblue" roughness={0.1} metalness={0.8} />
    </Sphere>
  );
}

export default function Scene() {
  return (
    <group>
      {/* 3D 텍스트 */}
      <Text
        position={[0, 3, 0]}
        fontSize={1}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        React Three Fiber
      </Text>

      {/* 회전하는 박스 */}
      <RotatingBox position={[-2, 0, 0]} />

      {/* 떠다니는 구 */}
      <FloatingSphere position={[2, 0, 0]} />

      {/* 바닥 */}
      <Box position={[0, -1, 0]} args={[10, 0.1, 10]} receiveShadow>
        <meshStandardMaterial color="white" />
      </Box>
    </group>
  );
}
