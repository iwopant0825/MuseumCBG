import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function NamhansanseongPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "남한산성이 주로 건설된 시기는?",
      options: ["삼국시대", "조선 전기", "조선 후기", "일제강점기"],
      correct: 2,
    },
    {
      id: 2,
      question: "남한산성이 유네스코 세계문화유산으로 등재된 해는?",
      options: ["2010년", "2012년", "2014년", "2016년"],
      correct: 2,
    },
    {
      id: 3,
      question: "남한산성의 주요 역할은?",
      options: [
        "왕궁 역할",
        "종교 의식 장소",
        "비상시 임시 수도",
        "상업 중심지",
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
      markQuizAsSolved("namhansanseong");
      setQuizCompleted(true);
    } else {
      alert(
        `아쉽지만 ${correctCount}개 맞췄습니다. 모든 문제를 맞춰야 다음 카드를 해금할 수 있습니다.`
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

  useEffect(() => {
    if (quizCompleted) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [quizCompleted]);

  return (
    <div className="heritage-page">
      <nav className="heritage-nav">
        <button onClick={() => navigate("/")} className="back-button">
          ← 박물관으로 돌아가기
        </button>
        <h1>한국의 세계문화유산</h1>
      </nav>

      <header className="heritage-header namhansanseong-header">
        <div className="header-content">
          <div className="header-text">
            <h1>남한산성</h1>
            <p className="heritage-subtitle">Namhansanseong</p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2014년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 경기도 광주시
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/남한산성.png" alt="남한산성" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            남한산성은 경기도 광주시에 위치한 조선시대의 산성으로, 수도 한양을
            지키던 중요한 방어 시설입니다. 신라 문무왕 13년(673년)에 한산주에
            쌓은 주장성(晝長城)의 옛 터를 활용하여 조선 인조 4년(1626년)에
            대대적으로 구축되었으며, 이후에도 지속적인 증축과 보수를 거쳐 현재의
            모습을 갖추게 되었습니다. 병자호란(1636) 당시 조선 인조가 피난하여
            항전한 역사적 장소로, 2014년 유네스코 세계문화유산에 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 시설</h2>
          <div className="features-grid">
            {[
              {
                title: "성곽 및 방어 시설",
                text: "험준한 산세를 활용하여 방어력을 극대화한 둘레 약 12km에 달하는 거대한 산성입니다. 동·서·남문루와 같은 4대문, 장대(將臺, 지휘소), 돈대(墩臺, 포대), 옹성(甕城, 성벽의 일부를 돌출시켜 적을 입체적으로 공격하는 시설), 암문(暗門, 비밀 통로) 등이 있습니다. 특히 수어장대(서장대)는 인조 때 단층으로 건립된 후 영조 때 2층으로 중건된 중요한 지휘소입니다.",
              },
              {
                title: "행궁",
                text: "전쟁이나 비상시 임금이 한양도성에서 나와 머무르던 임시 궁궐로, 종묘에 있는 선조의 신주(神主)를 옮길 수 있는 좌전까지 갖추어 조선의 임시 수도 역할을 수행했습니다.",
              },
              {
                title: "기타 시설",
                text: "우물, 관아, 군사 훈련 시설, 사찰(망월사, 옥정사 등), 현절사, 침괘정, 지수당, 연무관 등 다양한 군사·민간·종교 시설들이 성곽 내에 자리하고 있습니다.",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
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
            <h2>🧠 남한산성 퀴즈</h2>
            <p className="quiz-description">
              위 내용을 잘 읽어보셨나요? 3문제를 모두 맞추면 다음 문화유산을
              해금할 수 있습니다!
            </p>

            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="quiz-question">
                <h3>
                  Q{questionIndex + 1}. {question.question}
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
                <h3>
                  <span className="material-symbols-outlined">celebration</span>{" "}
                  축하합니다!
                </h3>
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
