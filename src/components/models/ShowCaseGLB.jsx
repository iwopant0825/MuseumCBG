import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";

export default function ShowCaseGlb(props) {
  const { position = [0, 0, 0] } = props;
  const gltf = useGLTF("/models/showcase.glb");

  // const spotlightRef = useRef();
  // const targetRef = useRef();

  // useEffect(() => {
  //   if (spotlightRef.current && targetRef.current) {
  //     spotlightRef.current.target = targetRef.current;
  //   }
  // }, [position]);

  return (
    <>
      {/* spotLight: RigidBody 위에서 아래로 비추기 */}
      {/* MAX_TEXTURE_IMAGE_UNITS(16) err */}
      {/* <spotLight
        ref={spotlightRef}
        position={[position[0], position[1] + 6, position[2]]}
        angle={0.35}
        penumbra={0.5}
        intensity={50}
        distance={10}
        decay={1}
        castShadow
      /> */}
      {/* target: RigidBody 바로 위 */}


      {/* <object3D ref={targetRef} position={[position[0], position[1], position[2]]} /> */}
     <pointLight position={[position[0], position[1] + 4, position[2]]} distance={6}   intensity={20} />
      <RigidBody type="fixed" colliders="trimesh" position={position}>
        <primitive scale={1.7} object={gltf.scene.clone()} />
      </RigidBody>
    </>
  );
}

// glTF preloading (권장)
useGLTF.preload("/models/showcase.glb");