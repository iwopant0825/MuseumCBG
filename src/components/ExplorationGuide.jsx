import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import './ExplorationGuide.css';

export default function ExplorationGuide() {
  const { setGuideSeen } = useGameStore();
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setGuideSeen();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="guide-overlay">
      <div className="guide-modal">
        <h2><span className="material-symbols-outlined">map</span> 탐험 가이드</h2>
        <div className="guide-content">
          <p><strong>한국 문화유산 박물관에 오신 것을 환영합니다!</strong></p>
          <p>이곳은 가상의 박물관을 자유롭게 거닐며 유네스코에 등재된 자랑스러운 우리 문화유산을 체험하는 공간입니다.</p>
          <div className="guide-section">
            <h4><span className="material-symbols-outlined">gamepad</span> 기본 조작</h4>
            <ul>
              <li><strong>W, A, S, D:</strong> 이동</li>
              <li><strong>마우스:</strong> 시점 변경</li>
              <li><strong>Space:</strong> 점프</li>
            </ul>
          </div>
          <div className="guide-section">
            <h4><span className="material-symbols-outlined">quiz</span> 게임 목표</h4>
            <ul>
              <li>박물관에 전시된 문화유산 카드를 찾아보세요.</li>
              <li>카드에 다가가 <kbd>F</kbd> 키를 눌러 상세 정보를 확인하고, 퀴즈를 풀어 다음 유산을 해금하세요.</li>
              <li>모든 문화유산을 해금하면 탐험이 완료됩니다!</li>
            </ul>
          </div>
        </div>
        <button onClick={handleClose} className="guide-close-button">
          탐험 시작하기
        </button>
      </div>
    </div>
  );
}
