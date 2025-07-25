import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function JejuPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "제주화산섬과용암동굴이 유네스코 세계유산으로 등재된 해는?",
      options: ["2005년", "2007년", "2009년", "2011년"],
      correct: 1,
    },
    {
      question: "제주도의 최고봉은?",
      options: ["한라산", "성산일출봉", "만장굴", "거문오름"],
      correct: 0,
    },
    {
      question: "제주 용암동굴 중 가장 긴 동굴은?",
      options: ["만장굴", "김녕굴", "벵뒤굴", "협재굴"],
      correct: 0,
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

      <header className="heritage-header jeju-header">
        <div className="header-content">
          <div className="header-text">
            <h1>제주화산섬과용암동굴</h1>
            <p className="heritage-subtitle">
              Jeju Volcanic Island and Lava Tubes
            </p>
            <div className="heritage-info">
              <span className="info-item">📅 등재년도: 2007년</span>
              <span className="info-item">🌿 유형: 자연유산</span>
              <span className="info-item">📍 위치: 제주특별자치도</span>
            </div>
          </div>
          <div className="header-image">
            <img
              src="/card/제주화산섬과용암동굴.png"
              alt="제주화산섬과용암동굴"
            />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            제주화산섬과용암동굴은 한라산천연보호구역, 성산일출봉, 거문오름
            용암동굴계로 구성된 세계자연유산입니다. 화산 활동으로 형성된 독특한
            지질학적 특성과 생물 다양성을 인정받아 2007년 유네스코
            세계자연유산으로 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 구성</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>한라산천연보호구역</h3>
              <p>해발 1,950m의 한라산을 중심으로 한 고산식물과 화산지형</p>
            </div>
            <div className="feature-card">
              <h3>성산일출봉</h3>
              <p>수중 화산 분출로 형성된 응회환과 아름다운 일출 경관</p>
            </div>
            <div className="feature-card">
              <h3>거문오름 용암동굴계</h3>
              <p>만장굴, 김녕굴, 벵뒤굴 등 세계적 규모의 용암동굴군</p>
            </div>
            <div className="feature-card">
              <h3>독특한 생태계</h3>
              <p>화산섬 특유의 고유종과 아열대-온대 식생 분포</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>자연적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>🌋 화산 지형</h3>
              <p>
                세계적으로 보기 드문 화산 활동의 완전한 기록을 보존하고
                있습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🕳️ 용암동굴</h3>
              <p>세계에서 가장 긴 용암동굴 중 하나인 만장굴을 포함합니다.</p>
            </div>
            <div className="significance-item">
              <h3>🌿 생물 다양성</h3>
              <p>다양한 고도대에 따른 수직적 식생 분포를 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3>🏔️ 경관적 가치</h3>
              <p>
                화산섬의 아름다운 자연경관과 독특한 지질 구조를 간직하고
                있습니다.
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
            <h2>🧠 제주화산섬과용암동굴 퀴즈</h2>
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
              <div className="quiz-success">
                <h3>🎉 축하합니다!</h3>
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
