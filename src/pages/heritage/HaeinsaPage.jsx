import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function HaeinsaPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "해인사장경판전이 세계문화유산으로 등재된 해는?",
      options: ["1993년", "1995년", "1997년", "1999년"],
      correct: 1,
    },
    {
      question: "팔만대장경이 제작된 시대는?",
      options: ["신라", "고려", "조선", "근현대"],
      correct: 1,
    },
    {
      question: "해인사가 위치한 곳은?",
      options: ["경상북도", "경상남도", "전라남도", "충청남도"],
      correct: 1,
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
      alert("모든 문제를 맞춰야 합니다. 다시 시도해주세요.");
    }
  };

  const scrollToQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => {
      document.getElementById("quiz-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="heritage-page">
      {/* 상단 네비게이션 */}
      <nav className="heritage-nav">
        <h1>한국의 세계문화유산</h1>
        <button onClick={() => navigate("/")} className="back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          박물관으로 돌아가기
        </button>
      </nav>

      {/* 헤더 섹션 */}
      <header className="heritage-header haeinsa-header">
        <div className="header-content">
          <div className="header-text">
            <h1>해인사장경판전</h1>
            <p className="heritage-subtitle">
              Haeinsa Temple Janggyeong Panjeon
            </p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 1995년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 경상남도 합천군
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/해인사장경판전​.png" alt="해인사장경판전" />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            해인사 장경판전은 고려 대장경판 8만여 매를 보관하는 세계 유일의
            장경판전으로, 13세기 목판인쇄문화의 정수를 보여줍니다. 팔만대장경은
            현존하는 세계 최고·최대의 목판 인쇄본으로, 700년 이상 완벽하게
            보존되어 그 가치가 인정받고 있습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>팔만대장경</h3>
              <p>
                고려 고종 때 제작된 세계 최고의 목판 대장경으로, 불교 경전의
                완벽한 집대성입니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>장경판전</h3>
              <p>
                완벽한 보존 환경을 갖춘 13세기 건축물로, 자연 통풍 시스템을 통해
                경판을 보존합니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>목판 보존</h3>
              <p>
                700년 이상 완벽하게 보존된 목판 인쇄 기술로, 세계 인쇄문화사의
                걸작입니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>불교 문화</h3>
              <p>
                한국 불교 문화의 정수를 담은 종합 문화유산으로, 정신문화의
                보고입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">library_books</span>
                인쇄문화 유산
              </h3>
              <p>
                세계 최고 수준의 목판 인쇄 기술과 완벽한 경전 집성의 걸작입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">construction</span>
                보존 기술
              </h3>
              <p>
                700년간 목판을 완벽 보존한 과학적 건축 기술의 우수성을
                보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">
                  self_improvement
                </span>
                불교 정신
              </h3>
              <p>
                불교 경전의 집대성으로 동아시아 불교 문화의 정수를 담고
                있습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">history</span>
                역사적 의미
              </h3>
              <p>
                몽골 침입기 국난 극복 의지가 담긴 민족 문화의 상징적 유산입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 퀴즈 유도 버튼 */}
        {!showQuiz && (
          <div className="quiz-trigger">
            <button onClick={scrollToQuiz} className="quiz-button">
              <span className="material-symbols-outlined">quiz</span>
              지식 확인하기
            </button>
          </div>
        )}

        {/* 퀴즈 섹션 */}
        {showQuiz && (
          <section id="quiz-section" className="quiz-section">
            <h2>해인사장경판전 퀴즈</h2>
            <p className="quiz-description">
              위 내용을 잘 읽어보셨나요? 3문제를 모두 맞추면 다음 문화유산을
              해금할 수 있습니다!
            </p>

            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="quiz-question">
                <h3>
                  문제 {questionIndex + 1}. {question.question}
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
                className="submit-button"
                onClick={handleQuizSubmit}
                disabled={
                  Object.keys(selectedAnswers).length < questions.length
                }
              >
                답안 제출
              </button>
            </div>

            {quizCompleted && (
              <div className="quiz-success">
                <h3>축하합니다!</h3>
                <p>모든 문제를 맞췄습니다. 다음 문화유산이 해금되었습니다!</p>
                <button onClick={() => navigate("/")} className="return-button">
                  박물관으로 돌아가기
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* 푸터 */}
      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
