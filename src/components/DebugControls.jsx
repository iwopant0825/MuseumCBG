import { useControls } from "leva";
import { useState } from "react";

export function DebugControls() {
  const [showControls, setShowControls] = useState(false);

  // Leva 컨트롤러 설정 - 올바른 형식으로 수정
  const {
    backgroundColor,
    ambientIntensity,
    directionalIntensity,
    enableFog,
    enableShadows,
  } = useControls({
    backgroundColor: "#87CEEB",
    enableFog: true,
    enableShadows: true,
    ambientIntensity: { value: 0.4, min: 0, max: 2, step: 0.1 },
    directionalIntensity: { value: 1.2, min: 0, max: 3, step: 0.1 },
  });

  return (
    <>
      {/* 토글 버튼 */}
      <div className="controls">
        <button onClick={() => setShowControls(!showControls)}>
          {showControls ? "컨트롤 숨기기" : "컨트롤 보기"}
        </button>
        {showControls && (
          <div>
            <h3>디버그 컨트롤</h3>
            <p>배경색: {backgroundColor}</p>
            <p>주변광 강도: {ambientIntensity}</p>
            <p>방향광 강도: {directionalIntensity}</p>
            <p>안개: {enableFog ? "활성화" : "비활성화"}</p>
            <p>그림자: {enableShadows ? "활성화" : "비활성화"}</p>
          </div>
        )}
      </div>
    </>
  );
}

// FPS 카운터
export function FPSCounter() {
  const [fps, setFps] = useState(0);

  useState(() => {
    let frames = 0;
    let lastTime = performance.now();

    function updateFPS() {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(updateFPS);
    }

    updateFPS();
  }, []);

  return (
    <div className="stats">
      <div style={{ color: "black", fontSize: "14px", padding: "10px" }}>
        FPS: {fps}
      </div>
    </div>
  );
}
