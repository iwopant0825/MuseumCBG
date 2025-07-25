import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function SansaPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "산사가 세계문화유산으로 등재된 해는?",
      options: ["2016년", "2017년", "2018년", "2019년"],
      correct: 2,
    },
    {
      question: "산사에 포함된 사찰의 개수는?",
      options: ["5개", "6개", "7개", "8개"],
      correct: 2,
    },
    {
      question: "통도사의 특징은?",
      options: ["목조건물", "진신사리", "미륵불상", "화엄종"],
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
      <nav className="heritage-nav">
        <h1>한국의 세계문화유산</h1>
        <button onClick={() => navigate("/")} className="back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          박물관으로 돌아가기
        </button>
      </nav>

      <header className="heritage-header sansa-header">
        <div className="header-content">
          <div className="header-text">
            <h1>산사한국의산지승원</h1>
            <p className="heritage-subtitle">
              Sansa, Buddhist Mountain Monasteries in Korea
            </p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2018년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 전국 7개 사찰
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/산사한국의산지승원.png" alt="산사한국의산지승원" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            산사, 한국의 산지승원은 통도사, 부석사, 봉정사, 법주사, 마곡사, 선암사, 대흥사 등 7개 사찰로 구성되어 있으며, 자연과 조화를 이루는 한국 불교 건축의 특징을 보여줍니다. 2018년 유네스코 세계문화유산에 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>구성 사찰</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>통도사</h3>
              <p>부처의 진신사리를 모신 불보사찰로 한국 불교의 성지입니다.</p>
            </div>
            <div className="feature-card">
              <h3>부석사</h3>
              <p>
                의상대사가 창건한 화엄종 사찰로 무량수전의 아름다운 건축이
                유명합니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>봉정사</h3>
              <p>한국에서 가장 오래된 목조건물을 보유한 고찰입니다.</p>
            </div>
            <div className="feature-card">
              <h3>법주사</h3>
              <p>속리산의 대표 사찰로 미륵불상이 유명한 법상종 사찰입니다.</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">nature_people</span>
                자연과의 조화
              </h3>
              <p>
                산의 지형을 활용한 자연친화적 배치로 한국적 미감을 보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">
                  temple_buddhist
                </span>
                불교 문화
              </h3>
              <p>
                1500년 동안 지속된 한국 불교 문화의 전통을 계승하고 있습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">architecture</span>
                전통 건축
              </h3>
              <p>한국 전통 목조 건축의 우수성과 아름다움을 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3><span className="material-symbols-outlined">school</span>수행 전통</h3>
              <p>
                불교 수행과 교육의 전통이 현재까지 이어지는 살아있는 유산입니다.
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
            <h2>산사한국의산지승원 퀴즈</h2>
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

      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
