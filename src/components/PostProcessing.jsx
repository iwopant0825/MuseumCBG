import { useRef, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  SMAAPass,
} from "three-stdlib";

// PostProcessing 확장
extend({ EffectComposer, RenderPass, UnrealBloomPass, SMAAPass });

export function PostProcessing() {
  const composer = useRef();
  const { scene, camera, gl, size } = useThree();

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[undefined, 0.4, 0.85, 0]} />
      <sMAAPass attachArray="passes" />
    </effectComposer>
  );
}

// 성능 모니터링
export function PerformanceMonitor() {
  const { gl } = useThree();

  useFrame(() => {
    // GPU 메모리 사용량 체크
    const info = gl.info;
    if (info.memory) {
      console.log("GPU Memory:", {
        geometries: info.memory.geometries,
        textures: info.memory.textures,
      });
    }
  });

  return null;
}

// 적응형 픽셀 비율 (성능 최적화)
export function AdaptivePixelRatio() {
  const { gl, performance } = useThree();

  useFrame(() => {
    if (performance.current < 0.5) {
      gl.setPixelRatio(1); // 성능이 낮으면 픽셀 비율 낮춤
    } else {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 최대 2배
    }
  });

  return null;
}
