import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function MuseumGLB(props) {
  // public 폴더 기준 경로
  const gltf = useGLTF("/models/museuml.glb");

  // 모델 전체에 충돌체 적용 (옵션)
  return (
    <RigidBody type="fixed" colliders="trimesh" {...props}>
      <primitive scale={0.5} object={gltf.scene} />
    </RigidBody>
  );
}

// glTF preloading (권장)
useGLTF.preload("/models/museuml.glb");
