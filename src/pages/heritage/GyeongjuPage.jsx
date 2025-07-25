import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function GyeongjuPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "경주역사유적지구가 속했던 고대 왕국은?",
      options: ["고구려", "백제", "신라", "가야"],
      correct: 2,
    },
    {
      question: "불국사와 석굴암이 건립된 시기는?",
      options: ["삼국시대", "통일신라시대", "고려시대", "조선시대"],
      correct: 1,
    },
    {
      question: "경주가 신라의 수도였던 기간은?",
      options: ["약 500년", "약 700년", "약 1000년", "약 1300년"],
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

      <header className="heritage-header gyeongju-header">
        <div className="header-content">
          <div className="header-text">
            <h1>경주역사유적지구</h1>
            <p className="heritage-subtitle">Gyeongju Historic Areas</p>
            <div className="heritage-info">
              <span className="info-item">📅 등재년도: 2000년</span>
              <span className="info-item">🏛️ 유형: 문화유산</span>
              <span className="info-item">📍 위치: 경상북도 경주시</span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/경주역사유적지구.png" alt="경주역사유적지구" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            경주역사유적지구는 신라 천년의 고도 경주에 있는 5개 지구의 유적들로
            구성되어 있습니다. 2000년 유네스코 세계문화유산으로 등재되었으며,
            신라 문화의 정수를 보여주는 소중한 문화유산입니다.
          </p>
        </section>

        <section className="features-section">
          <h2>구성 지구</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>월성지구</h3>
              <p>신라 왕궁터인 월성과 계림, 첨성대 등이 위치한 핵심 지역</p>
            </div>
            <div className="feature-card">
              <h3>남산지구</h3>
              <p>신라 불교문화의 보고로 불상과 석탑 등 수많은 유물이 산재</p>
            </div>
            <div className="feature-card">
              <h3>대릉원지구</h3>
              <p>신라 왕과 왕족들의 거대한 무덤들이 모여있는 고분공원</p>
            </div>
            <div className="feature-card">
              <h3>황룡사지구</h3>
              <p>신라 최대 사찰이었던 황룡사터와 분황사 등이 위치</p>
            </div>
            <div className="feature-card">
              <h3>산성지구</h3>
              <p>명활산성을 중심으로 한 신라의 방어시설 유적</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>🏰 천년 고도</h3>
              <p>
                신라 천년왕조의 수도로서 찬란한 문화를 꽃피운 역사도시입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🗿 불교 예술</h3>
              <p>
                석굴암, 불국사 등 세계적인 불교 예술의 걸작들이 남아있습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>⭐ 과학 기술</h3>
              <p>첨성대 등 당시의 뛰어난 천문학과 과학기술을 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3>👑 왕실 문화</h3>
              <p>
                천마총 등 신라 왕실의 화려한 문화와 생활상을 엿볼 수 있습니다.
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
            <h2>🧠 경주역사유적지구 퀴즈</h2>
            <p className="quiz-description">
              위 내용을 잘 읽어보셨나요? 3문제를 모두 맞추면 다음 문화유산을
              해금할 수 있습니다!
            </p>

            {questions.map((question, questionIndex) => (
              <div key={question.id} className="quiz-question">
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
