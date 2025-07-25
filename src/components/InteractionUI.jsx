import { useGameStore } from "../store/gameStore";
import "./InteractionUI.css";

export default function InteractionUI() {
  const {
    heritages,
    currentInteractionCard,
    showInteractionPrompt,
    getUnlockedCount,
    gameCompleted,
    resetGame,
  } = useGameStore();

  const currentHeritage = heritages.find(
    (h) => h.id === currentInteractionCard
  );
  const unlockedCount = getUnlockedCount();
  const totalCount = heritages.length;

  return (
    <div className="museum-ui">
      {/* 헤더 */}
      <div className="museum-header">
        <div className="museum-logo">
          <span style={{ color: "white" }} className="material-symbols-outlined">account_balance</span>
          <h1 style={{ color: "white" }}>한국 문화유산 박물관</h1>
        </div>
        <div className="museum-description">
          <p>이곳은 한국의 아름다운 유네스코 문화유산을 둘러볼 수 있는 가상 박물관입니다.</p>
          <p>자유롭게 이동하며 전시물을 감상하고, F키를 눌러 문화유산에 대한 설명을 확인해보세요.</p>
          <p><strong>문화 유산을 발견하면 퀴즈를 풀어 다음 문화 유산을 해금해보세요.</strong></p>
          <strong>모든 문화 유산을 해금하면 게임이 완료됩니다.</strong>
        </div>
      </div>

      {/* 진행 상황 */}
      <div className="progress-panel">
        <div className="progress-header">
          <span className="material-symbols-outlined">explore</span>
          <h3>탐험 진행도</h3>
        </div>
        <div className="progress-stats">
          <span className="current">{unlockedCount}</span>
          <span className="divider">/</span>
          <span className="total">{totalCount}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 게임 완료 메시지 */}
      {gameCompleted && (
        <div className="completion-panel">
          <h2><span className="material-symbols-outlined">emoji_events</span> 탐험 완료</h2>
          <p>모든 한국 문화유산을 발견하셨습니다</p>
        </div>
      )}

      {/* 상호작용 프롬프트 */}
      {showInteractionPrompt && currentHeritage && (
        <div className="interaction-panel">
          <div className="heritage-info">
            <span className="material-symbols-outlined">location_on</span>
            <span className="heritage-name">{currentHeritage.name}</span>
          </div>
          <div className="interaction-guide">
            <kbd>F</kbd>
            <span>키를 눌러 자세히 보기</span>
          </div>
        </div>
      )}

      {/* 조작 안내 */}
      <div className="controls-panel">
        <div className="controls-header">
          <span style={{ color: "white" }} className="material-symbols-outlined">gamepad</span>
          <h4>조작 가이드</h4>
        </div>
        <div className="controls-list">
          <div className="control-item">
            <div className="key-group">
              <kbd style={{ backgroundColor: "rgba(0, 0, 0, 0.082)", color: "white" }}>W</kbd>
              <kbd style={{ backgroundColor: "rgba(0, 0, 0, 0.082)", color: "white" }}>A</kbd>
              <kbd style={{ backgroundColor: "rgba(0, 0, 0, 0.082)", color: "white" }}>S</kbd>
              <kbd style={{ backgroundColor: "rgba(0, 0, 0, 0.082)", color: "white" }}>D</kbd>
            </div>
            <span>이동</span>
          </div>
          <div className="control-item">
            <kbd style={{ backgroundColor: "rgba(0, 0, 0, 0.082)", color: "white" }}>Space</kbd>
            <span>점프</span>
          </div>
          <div className="control-item">
            <span style={{ color: "white" }}   className="material-symbols-outlined mouse-icon">mouse</span>
            <span>시점 변경</span>
          </div>
          <div className="control-item">
            <kbd style={{ backgroundColor: "rgba(0, 0, 0, 0.082)", color: "white" }}>F</kbd>
            <span>상호작용</span>
          </div>
        </div>
        <p className="interaction-hint">
          화면을 클릭하여 포인터 락을 활성화하세요
        </p>
      </div>

      {/* 액션 버튼 */}
      <div className="action-panel">
        <button
          className="reset-button"
          onClick={() => {
            if (confirm("게임을 처음부터 다시 시작하시겠습니까?")) {
              resetGame();
              window.location.reload();
            }
          }}
        >
          <span className="material-symbols-outlined">refresh</span>
          게임 리셋
        </button>
      </div>
    </div>
  );
}
