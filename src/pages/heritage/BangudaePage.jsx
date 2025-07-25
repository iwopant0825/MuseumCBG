import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function BangudaePage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "반구천의 암각화가 만들어진 시대는?",
      options: ["구석기시대", "신석기시대~청동기시대", "철기시대", "삼국시대"],
      correct: 1,
    },
    {
      question: "반구천 암각화의 가장 특징적인 그림은?",
      options: ["호랑이", "고래", "말", "새"],
      correct: 1,
    },
    {
      question: "반구천 암각화의 주된 내용은?",
      options: [
        "모두 추상적",
        "주로 식물 그림",
        "동물과 사냥 장면",
        "글자만 새겨짐",
      ],
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

      <header className="heritage-header bangudae-header">
        <div className="header-content">
          <div className="header-text">
            <h1>반구천의암각화</h1>
            <p className="heritage-subtitle">Bangudae Petroglyphs</p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2024년 (등재 신청)
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 울산광역시
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/반구천의암각화.png" alt="반구천의암각화" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            반구대 암각화는 신석기시대부터 청동기시대에 이르는 선사시대 바위그림으로, 고래, 바다동물, 육지동물 등 300여 점의 그림이 새겨져 있습니다. 선사시대 인류의 생활과 신앙을 보여주는 귀중한 문화유산으로, 2024년 7월 유네스코 세계유산에 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>고래 그림</h3>
              <p>세계에서 가장 오래된 고래 사냥 장면을 묘사한 암각화</p>
            </div>
            <div className="feature-card">
              <h3>동물 그림</h3>
              <p>사슴, 멧돼지, 호랑이 등 다양한 동물들의 생동감 있는 표현</p>
            </div>
            <div className="feature-card">
              <h3>사냥 장면</h3>
              <p>선사시대 사람들의 생활상과 사냥 방식을 보여주는 장면들</p>
            </div>
            <div className="feature-card">
              <h3>의식 장면</h3>
              <p>종교적 의식이나 샤머니즘과 관련된 신비로운 그림들</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>🐋 선사 예술</h3>
              <p>신석기시대 암각화 예술의 세계적 보고입니다.</p>
            </div>
            <div className="significance-item">
              <h3>🎨 예술적 가치</h3>
              <p>생동감 넘치는 표현력과 뛰어난 예술성을 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3>📚 역사적 자료</h3>
              <p>선사시대 인류의 생활과 신앙을 보여주는 귀중한 자료입니다.</p>
            </div>
            <div className="significance-item">
              <h3>🌊 해양 문화</h3>
              <p>고대 해양 문화와 고래 사냥 문화의 증거입니다.</p>
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
            <h2>🧠 반구천의암각화 퀴즈</h2>
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
