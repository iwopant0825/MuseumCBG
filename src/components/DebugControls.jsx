import { useGameStore } from "../store/gameStore";
import "./DebugControls.css";

export function DebugControls() {
  const { resetGame, unlockAllHeritages } = useGameStore();

  const handleUnlockAll = () => {
    unlockAllHeritages();
  };

  const handleReset = () => {
    resetGame();
    window.location.reload();
  };

  return (
    <div className="debug-controls-container">
      <button onClick={handleUnlockAll} className="debug-button">
        모두 해금
      </button>
      <button onClick={handleReset} className="debug-button">
        게임 리셋
      </button>
    </div>
  );
}