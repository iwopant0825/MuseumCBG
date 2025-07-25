import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function ChangdeokgungPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "창덕궁이 세계문화유산으로 등재된 해는?",
      options: ["1995년", "1997년", "1999년", "2001년"],
      correct: 1,
    },
    {
      question: "창덕궁의 정전은?",
      options: ["근정전", "인정전", "중화전", "경복궁"],
      correct: 1,
    },
    {
      question: "창덕궁 후원의 다른 이름은?",
      options: ["어원", "비원", "신원", "동원"],
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
      <header className="heritage-header changdeokgung-header">
        <div className="header-content">
          <div className="header-text">
            <h1>창덕궁</h1>
            <p className="heritage-subtitle">Changdeokgung Palace Complex</p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 1997년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 서울특별시
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/창덕궁​.png" alt="창덕궁" />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            창덕궁은 조선시대 궁궐 중 자연과 가장 조화롭게 설계된 궁궐로, 1405년
            태종에 의해 창건되었습니다. 특히 후원(비원)의 아름다운 정원은 한국
            전통 조경 예술의 정수를 보여주며, 자연지형을 거스르지 않는 조선 궁궐
            건축의 특징을 완벽하게 구현했습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 건축물</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>인정전</h3>
              <p>
                창덕궁의 정전으로 왕의 즉위식과 조회가 열린 곳입니다. 조선 궁궐
                건축의 웅장함과 격조를 보여줍니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>후원(비원)</h3>
              <p>
                자연과 조화된 한국 전통 정원의 백미로, 연못과 정자가 아름답게
                어우러진 왕실 정원입니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>낙선재</h3>
              <p>
                한국 전통 건축의 소박한 아름다움을 보여주는 건물로, 왕실의
                생활공간이었습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>자연 조화</h3>
              <p>
                지형을 거스르지 않은 자연친화적 배치로 동양 건축 철학의 정수를
                구현했습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">nature</span>
                자연과의 조화
              </h3>
              <p>
                지형의 자연스러운 곡선을 따라 배치된 건물들이 인공과 자연의
                완벽한 조화를 이룹니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">landscape</span>
                전통 조경 예술
              </h3>
              <p>
                후원의 정원 설계는 한국 전통 조경 예술의 최고 수준을 보여주는
                걸작입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">architecture</span>
                궁궐 건축술
              </h3>
              <p>
                조선시대 궁궐 건축의 완성된 형태로 건축사적 가치가 매우
                높습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">history_edu</span>역사적 의미</h3>
              <p>
                조선 왕조 500년 역사의 중심지로서 한국사의 중요한 무대였습니다.
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
            <h2>창덕궁 퀴즈</h2>
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

      {/* 푸터 */}
      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
