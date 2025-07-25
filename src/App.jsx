import { Canvas } from "@react-three/fiber";
import { Environment, KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import "./App.css";
import MuseumGLB from "./components/models/MuseumGLB";
import { Player } from "./components/Player";
import { DebugControls, FPSCounter } from "./components/DebugControls";
import ShowCaseGlb from "./components/models/ShowCaseGLB";
import CardImage from "./components/models/CardImage";
import * as THREE from "three";

// 키보드 맵핑
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
];

function App() {
  return (
    <div className="app">
      {/* FPS 카운터 */}
      <FPSCounter />

      {/* 디버그 컨트롤 */}
      <DebugControls />

      {/* 조작법 안내 */}
      <div className="controls-info">
        <p>WASD: 이동 | Space: 점프 | 마우스: 시점 조작</p>
        <p style={{ color: "#ffff00", fontWeight: "bold" }}>
          화면을 클릭하여 포인터 락을 활성화하세요!
        </p>
      </div>

      <KeyboardControls map={keyboardMap}>
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true,
          }}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={["#87CEEB"]} />
          <fog attach="fog" args={["#87CEEB", 10, 100]} />

          {/* 조명 설정 */}
          <ambientLight intensity={0} />
          <directionalLight
            position={[1, 5, 1]}
            intensity={0.2}
            castShadow
            shadow-mapSize={2048}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          {/* 추가 조명 */}
          {/* <pointLight position={[0, 1, 0]} intensity={1} /> */}
           {/* <spotLight
            position={[0,6,0]} // 위에서
            angle={0.35}
            penumbra={0.5}
            intensity={50}
            distance={10}
            decay={1}
            castShadow
          /> */}
          {/* 환경 설정 */}
          <Suspense fallback={null}>
            
          </Suspense>

          {/* 물리 엔진 */}
          <Physics gravity={[0, -9.81, 0]} debug={false}>
            {/* 플레이어 */}
            <Player />

            {/* 박물관 모델 */}
            <MuseumGLB />


            {/* 오른쪽 */}
            <ShowCaseGlb position={[-28,0,6]}/>
            <CardImage position={[-28,2.6,6]} r={true} url={"/card/가야고분군.png"}/>

            <ShowCaseGlb position={[-23,0,6]}/>
            <CardImage position={[-23,2.6,6]} r={true} url={"/card/경주역사유적지구.png"}/>

            <ShowCaseGlb position={[-18,0,6]}/>
            <CardImage position={[-18,2.6,6]} r={true} url={"/card/고인돌유적.png"}/>

            <ShowCaseGlb position={[-13,0,6]}/>
            <CardImage position={[-13,2.6,6]} r={true} url={"/card/남한산성.png"}/>

            <ShowCaseGlb position={[-8,0,6]}/>
            <CardImage position={[-8,2.6,6]} r={true} url={"/card/반구천의암각화.png"}/>

            <ShowCaseGlb position={[-3,0,6]}/>
            <CardImage position={[-3,2.6,6]} r={true} url={"/card/백제역사유적지구.png"}/>

            <ShowCaseGlb position={[ 2,0,6]}/>
            <CardImage position={[2,2.6,6]} r={true} url={"/card/산사한국의산지승원.png"}/>

            <ShowCaseGlb position={[ 7,0,6]}/>
            <CardImage position={[7,2.6,6]} r={true} url={"/card/한국의서원.png"}/>

            {/* 왼쪽 */}
            <ShowCaseGlb position={[-28,0,-6]}/>
            <CardImage position={[-28,2.6,-6]} r={false} url={"/card/석굴암과불국사.png"}/>

            <ShowCaseGlb position={[-23,0,-6]}/>
            <CardImage position={[-23,2.6,-6]} r={false} url={"/card/제주화산섬과용암동굴.png"}/>

            <ShowCaseGlb position={[-18,0,-6]}/>
            <CardImage position={[-18,2.6,-6]} r={false} url={"/card/조선왕릉.png"}/>

            <ShowCaseGlb position={[-13,0,-6]}/>
            <CardImage position={[-13,2.6,-6]} r={false} url={"/card/종묘.png"}/>

            <ShowCaseGlb position={[-8,0,-6]}/>
            <CardImage position={[-8,2.6,-6]} r={false} url={"/card/창덕궁​.png"}/>

            <ShowCaseGlb position={[-3,0,-6]}/>
            <CardImage position={[-3,2.6,-6]} r={false} url={"/card/하회와양동.png"}/>

            <ShowCaseGlb position={[ 2,0,-6]}/>
            <CardImage position={[2,2.6,-6]} r={false} url={"/card/한국의갯벌.png"}/>

            <ShowCaseGlb position={[ 7,0,-6]}/>
            <CardImage position={[7,2.6,-6]} r={false} url={"/card/해인사장경판전​.png"}/>

            <ShowCaseGlb position={[ 12,0,-6]}/>
            <CardImage position={[12,2.6,-6]} r={false} url={"/card/화성.png"}/>



            
            {/* 바닥 (박물관 모델에 바닥이 없을 경우) */}
        
          </Physics>
          <OrbitControls/>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
