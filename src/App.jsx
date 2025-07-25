import React, { Suspense, lazy } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

// 컴포넌트 임포트
import { Player } from "./components/Player";
import MuseumGLB from "./components/models/MuseumGLB";
import ShowCaseGlb from "./components/models/ShowCaseGLB";
import CardImage from "./components/models/CardImage";
import { PostProcessing } from "./components/PostProcessing";
import InteractionUI from "./components/InteractionUI";
import { DebugControls } from "./components/DebugControls";

// 게임 관련 임포트
import { useGameStore } from "./store/gameStore";

// 페이지 로딩 스피너
const PageSpinner = () => (
  <div className="page-spinner">
    <div className="spinner"></div>
  </div>
);

// 문화유산 페이지 동적 임포트
const heritagePages = {
  gaya: lazy(() => import("./pages/heritage/GayaPage")),
  gyeongju: lazy(() => import("./pages/heritage/GyeongjuPage")),
  dolmen: lazy(() => import("./pages/heritage/DolmenPage")),
  namhansanseong: lazy(() => import("./pages/heritage/NamhansanseongPage")),
  bangudae: lazy(() => import("./pages/heritage/BangudaePage")),
  baekje: lazy(() => import("./pages/heritage/BaekjePage")),
  seokguram: lazy(() => import("./pages/heritage/SeokguramPage")),
  jeju: lazy(() => import("./pages/heritage/JejuPage")),
  joseon: lazy(() => import("./pages/heritage/JoseonPage")),
  jongmyo: lazy(() => import("./pages/heritage/JongmyoPage")),
  changdeokgung: lazy(() => import("./pages/heritage/ChangdeokgungPage")),
  hahoe: lazy(() => import("./pages/heritage/HahoePage")),
  getbol: lazy(() => import("./pages/heritage/GetbolPage")),
  haeinsa: lazy(() => import("./pages/heritage/HaeinsaPage")),
  hwaseong: lazy(() => import("./pages/heritage/HwaseongPage")),
  sansa: lazy(() => import("./pages/heritage/SansaPage")),
  seowon: lazy(() => import("./pages/heritage/SeowonPage")),
};

// 3D 씬 컴포넌트
function MuseumSceneContent() {
  const { heritages } = useGameStore();
  return (
    <>
      <PostProcessing />
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Physics gravity={[0, -9.81, 0]} debug={false}>
        <Player />
        <MuseumGLB />
        {heritages.map((heritage) => (
          <group key={heritage.id}>
            <ShowCaseGlb
              position={[heritage.position[0], 0, heritage.position[2]]}
            />
            <CardImage
              on={heritage.unlocked}
              position={heritage.position}
              r={heritage.position[2] > 0 ? true : false}
              url={heritage.url}
            />
          </group>
        ))}
      </Physics>
      <OrbitControls />
    </>
  );
}

// 박물관 메인 화면 컴포넌트
function MuseumScene() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {import.meta.env.DEV && <DebugControls />}
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 70,
            near: 0.1,
            far: 1000,
          }}
          style={{ background: "linear-gradient(to bottom, #ffffff, #ffffff)" }}
        >
          <Suspense fallback={null}>
            <MuseumSceneContent />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <InteractionUI />
    </div>
  );
}

// 문화유산 소개 페이지 컴포넌트
function HeritagePage() {
  const { heritageId } = useParams();
  const Page = heritagePages[heritageId];

  if (!Page) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>준비 중인 페이지입니다</h1>
        <p>"{heritageId}" 문화유산 페이지는 현재 준비 중입니다.</p>
        <button onClick={() => window.history.back()}>
          박물관으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <Suspense fallback={<PageSpinner />}>
      <Page />
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MuseumScene />} />
        <Route path="/heritage/:heritageId" element={<HeritagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
