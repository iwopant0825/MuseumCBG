import { useGameStore } from "../store/gameStore";
import "./InteractionUI.css";

export default function InteractionUI() {
  const {
    heritages,
    currentInteractionCard,
    showInteractionPrompt,
    getSolvedQuizCount, // 변경
    gameCompleted,
    resetGame,
  } = useGameStore();

  const currentHeritage = heritages.find(
    (h) => h.id === currentInteractionCard
  );
  const solvedQuizCount = getSolvedQuizCount(); // 변경
  const totalCount = heritages.length;

  return (
    <div className="museum-ui">
      {/* 헤더 */}
      <div className="museum-header">
        <div className="museum-logo">
          <span
            style={{ color: "white" }}
            className="material-symbols-outlined"
          >
            account_balance
          </span>
          <h1 style={{ color: "white" }}>한국 문화유산 박물관</h1>
        </div>
        <div className="museum-description">
          <p>
            이곳은 한국의 아름다운 유네스코 문화유산을 둘러볼 수 있는 가상
            박물관입니다.
          </p>
          <p>
            자유롭게 이동하며 전시물을 감상하고, F키를 눌러 문화유산에 대한
            설명을 확인해보세요.
          </p>
          <p>
            <strong>
              문화 유산을 발견하면 퀴즈를 풀어 다음 문화 유산을 해금해보세요.
            </strong>
          </p>
          <strong>모든 문화 유산을 해금하면 게임이 완료됩니다.</strong>
        </div>
      </div>

      {/* 진행 상황 */}
      <div className="progress-panel">
        <div className="progress-header">
          <span className="material-symbols-outlined">explore</span>
          <h3 style={gameCompleted ? { color: "#2196f3" } : {}}>
            {gameCompleted ? "탐험 클리어" : "탐험 진행도"}
          </h3>
        </div>
        <div className="progress-stats">
          <span className="current">{solvedQuizCount}</span>
          <span className="divider">/</span>
          <span className="total">{totalCount}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(solvedQuizCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 게임 완료 메시지 */}
      {gameCompleted && (
        <div className={`completion-panel ${gameCompleted ? "visible" : ""}`}>
          <span className="material-symbols-outlined">emoji_events</span>
          <h2>탐험 완료</h2>
          <p>모든 한국 문화유산을 발견하셨습니다</p>
        </div>
      )}

      {/* 상호작용 프롬프트 */}
      <div
        className={`interaction-panel ${
          showInteractionPrompt && currentHeritage ? "visible" : ""
        }`}
      >
        {currentHeritage && (
          <>
            <div className="heritage-info">
              <span className="material-symbols-outlined">location_on</span>
              <span className="heritage-name">
                {currentHeritage.unlocked ? currentHeritage.name : "???"}
              </span>
            </div>
            <div className="interaction-guide">
              {currentHeritage.unlocked ? (
                <>
                  <kbd>F</kbd>
                  <span>키를 눌러 자세히 보기</span>
                </>
              ) : (
                <span>잠금 해제되지 않은 문화유산입니다.</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* 조작 안내 */}
      <div className="controls-panel">
        <div className="controls-header">
          <span
            style={{ color: "white" }}
            className="material-symbols-outlined"
          >
            gamepad
          </span>
          <h4>조작 가이드</h4>
        </div>
        <div className="controls-list">
          <div className="control-item">
            <div className="key-group">
              <kbd
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.082)",
                  color: "white",
                }}
              >
                W
              </kbd>
              <kbd
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.082)",
                  color: "white",
                }}
              >
                A
              </kbd>
              <kbd
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.082)",
                  color: "white",
                }}
              >
                S
              </kbd>
              <kbd
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.082)",
                  color: "white",
                }}
              >
                D
              </kbd>
            </div>
            <span>이동</span>
          </div>
          <div className="control-item">
            <kbd
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.082)",
                color: "white",
              }}
            >
              Space
            </kbd>
            <span>점프</span>
          </div>
          <div className="control-item">
            <span
              style={{ color: "white" }}
              className="material-symbols-outlined mouse-icon"
            >
              mouse
            </span>
            <span>시점 변경</span>
          </div>
          <div className="control-item">
            <kbd
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.082)",
                color: "white",
              }}
            >
              F
            </kbd>
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
          style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.082)" }}
          className="reset-button"
          onClick={() => {
            resetGame();
            window.location.reload();
          }}
        >
          <span className="material-symbols-outlined">refresh</span>
          게임 리셋
        </button>
      </div>
    </div>
  );
}
