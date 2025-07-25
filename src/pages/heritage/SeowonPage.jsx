import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function SeowonPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "한국의 서원이 세계유산에 등재된 해는?",
      options: ["2017년", "2018년", "2019년", "2020년"],
      correct: 2,
    },
    {
      question: "한국 최초의 서원은?",
      options: ["도산서원", "소수서원", "남계서원", "옥산서원"],
      correct: 1,
    },
    {
      question: "서원의 주요 기능은?",
      options: ["교육과 제향", "정치와 경제", "군사와 방어", "상업과 무역"],
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
      markQuizAsSolved("seowon");
      setQuizCompleted(true);
    } else {
      alert("아쉽지만 모든 문제를 맞춰야 합니다. 다시 시도해주세요.");
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
      <nav className="heritage-nav">
        <h1>한국의 세계문화유산</h1>
        <button onClick={() => navigate("/")} className="back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          박물관으로 돌아가기
        </button>
      </nav>

      <header className="heritage-header seowon-header">
        <div className="header-content">
          <div className="header-text">
            <h1>한국의서원</h1>
            <p className="heritage-subtitle">
              Seowon, Korean Neo-Confucian Academies
            </p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2019년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 전국 9개 서원
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/한국의서원.png" alt="한국의서원" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            한국의 서원은 조선시대 성리학 교육과 선현 제향을 담당한 사설
            교육기관으로, 한국 성리학 문화의 정수를 보여줍니다. 9개
            서원(소수서원, 남계서원, 옥산서원, 도산서원, 필암서원, 도동서원,
            병산서원, 무성서원, 돈암서원)이 포함되어 있으며, 조선시대 지식인
            문화와 교육 전통을 보여줍니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 서원</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>소수서원</h3>
              <p>
                한국 최초의 서원으로 안향을 기리는 곳으로 서원 제도의 모범이
                되었습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>도산서원</h3>
              <p>
                이황(퇴계)을 기리는 한국 대표 서원으로 성리학 교육의
                중심지였습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>병산서원</h3>
              <p>
                류성룡을 기리는 서원으로 아름다운 자연 경관과 조화를 이룹니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>무성서원</h3>
              <p>
                최치원과 신잠을 기리는 서원으로 호남 지역 성리학의
                중심지였습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">school</span>
                교육 전통
              </h3>
              <p>
                조선시대 성리학 교육의 중심지로 한국 교육 문화의 뿌리를
                보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">temple_hindu</span>
                제향 문화
              </h3>
              <p>
                선현에 대한 존경과 제향 전통을 통해 한국의 예(禮) 문화를
                보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">nature</span>
                자연 조화
              </h3>
              <p>자연환경과 조화된 배치로 성리학적 이상향을 구현했습니다.</p>
            </div>
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">groups</span>지역 문화</h3>
              <p>
                각 지역의 특색을 반영하면서도 공통된 서원 문화를 보여줍니다.
              </p>
            </div>
          </div>
        </section>

        

        {!showQuiz && (
          <div className="quiz-trigger">
            <button onClick={scrollToQuiz} className="quiz-button">
              <span className="material-symbols-outlined">quiz</span>
              지식 확인하기
            </button>
          </div>
        )}

        {showQuiz && (
          <section id="quiz-section" className="quiz-section">
            <h2>한국의서원 퀴즈</h2>
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
                      key={`${questionIndex}-${optionIndex}`}
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

      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
