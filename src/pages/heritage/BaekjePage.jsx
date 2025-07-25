import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function BaekjePage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "백제역사유적지구의 시대적 배경은?",
      options: ["백제 전기", "백제 후기(475~660년)", "고구려시대", "신라시대"],
      correct: 1,
    },
    {
      question: "웅진시대 백제의 수도는?",
      options: ["부여", "익산", "공주", "서울"],
      correct: 2,
    },
    {
      question: "백제역사유적지구를 구성하는 지역은?",
      options: ["공주, 부여, 익산", "경주, 공주, 부여", "부여, 익산, 서울", "공주, 익산, 경주"],
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

      <header className="heritage-header baekje-header">
        <div className="header-content">
          <div className="header-text">
            <h1>백제역사유적지구</h1>
            <p className="heritage-subtitle">Baekje Historic Areas</p>
            <div className="heritage-info">
              <span className="info-item">📅 등재년도: 2015년</span>
              <span className="info-item">🏛️ 유형: 문화유산</span>
              <span className="info-item">📍 위치: 공주, 부여, 익산</span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/백제역사유적지구.png" alt="백제역사유적지구" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            백제역사유적지구는 백제 후기(475-660년)의 수도였던 웅진(공주)과
            사비(부여), 그리고 사비 별도(익산)의 유적들로 구성되어 있습니다.
            백제 문화의 정수를 보여주는 소중한 세계문화유산입니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>공주 지역</h3>
              <p>웅진시대 백제의 수도로 공산성과 송산리 고분군</p>
            </div>
            <div className="feature-card">
              <h3>부여 지역</h3>
              <p>사비시대 백제의 수도로 부소산성과 정림사지</p>
            </div>
            <div className="feature-card">
              <h3>익산 지역</h3>
              <p>백제 말기 별도로 왕궁리 유적과 미륵사지</p>
            </div>
            <div className="feature-card">
              <h3>왕릉 문화</h3>
              <p>백제 왕실의 무덤과 부장품을 통한 고대 문화 이해</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">fort</span> 왕국 문화</h3>
              <p>백제 후기 왕국 문화의 정수를 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">location_city</span> 도시 계획</h3>
              <p>고대 도시 계획과 건축 기술의 발전상을 알 수 있습니다.</p>
            </div>
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">public</span> 국제 교류</h3>
              <p>중국, 일본과의 활발한 문화 교류를 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">palette</span> 예술 문화</h3>
              <p>백제 특유의 우아하고 세련된 예술 문화를 엿볼 수 있습니다.</p>
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
            <h2>🧠 백제역사유적지구 퀴즈</h2>
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
