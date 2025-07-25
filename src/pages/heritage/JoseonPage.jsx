import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function JoseonPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "조선왕릉이 세계유산에 등재된 해는?",
      options: ["2007년", "2009년", "2011년", "2013년"],
      correct: 1,
    },
    {
      question: "남한에 위치한 조선왕릉의 개수는?",
      options: ["38기", "40기", "42기", "44기"],
      correct: 1,
    },
    {
      question: "왕과 왕비가 함께 묻힌 능은?",
      options: ["단릉", "쌍릉", "합장릉", "동원릉"],
      correct: 2,
    },
  ];

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctCount++;
      }
    });

    if (correctCount === questions.length) {
      const nextHeritage = getNextHeritageToUnlock();
      if (nextHeritage) {
        unlockHeritage(nextHeritage.id);
      }
      setQuizCompleted(true);
    } else {
      alert(
        `정답: ${correctCount}/${questions.length}\n모든 문제를 맞춰야 다음 카드를 해금할 수 있습니다.`
      );
    }
  };

  const scrollToQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => {
      document.getElementById("quiz-section").scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="heritage-page">
      <nav className="heritage-nav">
        <button onClick={() => navigate("/")} className="back-button">
          ← 박물관으로 돌아가기
        </button>
        <h1>한국의 세계문화유산</h1>
      </nav>

      <header className="heritage-header joseon-header">
        <div className="header-content">
          <div className="header-text">
            <h1>조선왕릉</h1>
            <p className="heritage-subtitle">
              Royal Tombs of the Joseon Dynasty
            </p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2009년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 서울, 경기 일원
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/조선왕릉.png" alt="조선왕릉" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            조선왕릉은 518년간 조선왕조의 왕과 왕비, 추존왕과 추존왕비의 무덤
            40기를 지칭합니다. 조선시대 왕실의 효사상과 유교적 세계관이 반영된
            독특한 장례문화를 보여주며, 2009년 유네스코 세계문화유산으로
            등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>릉역 구성</h3>
              <p>진입로, 제향공간, 능침공간의 3단계로 구성된 신성한 공간</p>
            </div>
            <div className="feature-card">
              <h3>석물 조각</h3>
              <p>문무석인, 석수, 망주석 등 정교한 석조 조각품들</p>
            </div>
            <div className="feature-card">
              <h3>자연과 조화</h3>
              <p>풍수지리와 유교 사상에 따른 자연 친화적 배치</p>
            </div>
            <div className="feature-card">
              <h3>제례 전통</h3>
              <p>500년 이상 이어진 종묘제례와 제향 의식의 연속성</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>👑 왕실 문화</h3>
              <p>
                조선왕조 518년간의 왕실 문화와 제례 전통을 완벽하게 보존하고
                있습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🎨 건축 예술</h3>
              <p>
                유교 이념과 풍수지리가 결합된 독창적인 장례 건축 양식을
                보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🌿 경관 보존</h3>
              <p>도시화 속에서도 원형이 잘 보존된 역사적 문화경관입니다.</p>
            </div>
            <div className="significance-item">
              <h3>📚 무형 유산</h3>
              <p>
                제례 의식과 관련된 음악, 무용 등 무형문화유산도 함께 전승됩니다.
              </p>
            </div>
          </div>
        </section>

        

        {!showQuiz && (
          <div className="quiz-trigger">
            <button onClick={scrollToQuiz} className="quiz-button">
              📝 지식 확인하기
            </button>
          </div>
        )}

        {showQuiz && (
          <section id="quiz-section" className="quiz-section">
            <h2>🧠 조선왕릉 퀴즈</h2>
            <p className="quiz-description">
              위 내용을 잘 읽어보셨나요? 3문제를 모두 맞추면 다음 문화유산을
              해금할 수 있습니다!
            </p>

            {questions.map((question, questionIndex) => (
              <div key={questionIndex + 1} className="quiz-question">
                <h3>
                  Q{questionIndex + 1}. {question.question}
                </h3>
                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`quiz-option ${
                        selectedAnswers[questionIndex] === optionIndex
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleAnswerSelect(questionIndex, optionIndex)
                      }
                    >
                      {optionIndex + 1}. {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="quiz-submit">
              <button
                onClick={handleQuizSubmit}
                className="submit-button"
                disabled={
                  Object.keys(selectedAnswers).length !== questions.length
                }
              >
                답안 제출하기
              </button>
            </div>

            {quizCompleted && (
              <div id="quiz-success" className="quiz-success">
                <h3><span className="material-symbols-outlined">celebration</span> 축하합니다!</h3>
                <p>모든 문제를 맞췄습니다. 다음 문화유산이 해금되었습니다!</p>
                <button onClick={() => navigate("/")} className="return-button">
                  박물관으로 돌아가기
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 체험관. 문화재청 협력.</p>
      </footer>
    </div>
  );
}
