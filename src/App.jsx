import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
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

// 게임 관련 임포트
import { useGameStore } from "./store/gameStore";
import InteractionUI from "./components/InteractionUI";

// 문화유산 페이지 임포트
import GayaPage from "./pages/heritage/GayaPage";
import GyeongjuPage from "./pages/heritage/GyeongjuPage";
import DolmenPage from "./pages/heritage/DolmenPage";
import NamhansanseongPage from "./pages/heritage/NamhansanseongPage";
import BangudaePage from "./pages/heritage/BangudaePage";
import BaekjePage from "./pages/heritage/BaekjePage";
import SeokguramPage from "./pages/heritage/SeokguramPage";
import JejuPage from "./pages/heritage/JejuPage";
import JoseonPage from "./pages/heritage/JoseonPage";
import JongmyoPage from "./pages/heritage/JongmyoPage";
import ChangdeokgungPage from "./pages/heritage/ChangdeokgungPage";
import HahoePage from "./pages/heritage/HahoePage";
import GetbolPage from "./pages/heritage/GetbolPage";
import HaeinsaPage from "./pages/heritage/HaeinsaPage";
import HwaseongPage from "./pages/heritage/HwaseongPage";
import SansaPage from "./pages/heritage/SansaPage";
import SeowonPage from "./pages/heritage/SeowonPage";

// 박물관 메인 화면 컴포넌트
function MuseumScene() {
  const { heritages } = useGameStore();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            <PostProcessing />

            {/* 조명 */}
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
              {/* 플레이어 */}
              <Player />

              {/* 박물관 모델 */}
              <MuseumGLB />

              {/* 동적으로 카드 렌더링 */}
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
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* 상호작용 UI */}
      <InteractionUI />
    </div>
  );
}

// 문화유산 소개 페이지 컴포넌트
function HeritagePage() {
  const { heritageId } = useParams();

  const heritagePages = {
    gaya: GayaPage,
    gyeongju: GyeongjuPage,
    dolmen: DolmenPage,
    namhansanseong: NamhansanseongPage,
    bangudae: BangudaePage,
    baekje: BaekjePage,
    seokguram: SeokguramPage,
    jeju: JejuPage,
    joseon: JoseonPage,
    jongmyo: JongmyoPage,
    changdeokgung: ChangdeokgungPage,
    hahoe: HahoePage,
    getbol: GetbolPage,
    haeinsa: HaeinsaPage,
    hwaseong: HwaseongPage,
    sansa: SansaPage,
    seowon: SeowonPage,
  };

  const PageComponent = heritagePages[heritageId];

  if (!PageComponent) {
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

  return <PageComponent />;
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
