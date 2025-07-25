import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const MuseumGLB = () => {
  const { scene } = useGLTF("/models/museuml.glb");
  return (
    <RigidBody position={[-14, 0, 0]} scale={0.5} type="fixed" colliders="trimesh">
      <primitive object={scene} />
    </RigidBody>
  );
};

useGLTF.preload("/models/museuml.glb");

export default MuseumGLB;