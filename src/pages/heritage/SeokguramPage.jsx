import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function SeokguramPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "석굴암과 불국사가 건립된 시대는?",
      options: ["삼국시대", "통일신라시대", "고려시대", "조선시대"],
      correct: 1,
    },
    {
      id: 2,
      question: "석굴암의 주불상은?",
      options: ["아미타불", "관세음보살", "석가여래좌상", "미륵보살"],
      correct: 2,
    },
    {
      id: 3,
      question: "불국사의 대표적인 석탑은?",
      options: [
        "다보탑과 석가탑",
        "경천사십층석탑",
        "백제대향로",
        "감은사지삼층석탑",
      ],
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
      markQuizAsSolved("seokguram");
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

  return (
    <div className="heritage-page">
      <nav className="heritage-nav">
        <button onClick={() => navigate("/")} className="back-button">
          ← 박물관으로 돌아가기
        </button>
        <h1>한국의 세계문화유산</h1>
      </nav>

      <header className="heritage-header seokguram-header">
        <div className="header-content">
          <div className="header-text">
            <h1>석굴암과 불국사</h1>
            <p className="heritage-subtitle">
              Seokguram Grotto and Bulguksa Temple
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
                위치: 경상북도 경주시
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/석굴암과불국사.png" alt="석굴암과불국사" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            석굴암과 불국사는 8세기 통일신라시대에 건립된 불교 건축의 걸작으로, 한국 불교 예술의 정수를 보여줍니다. 1995년 유네스코 세계문화유산에 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 구성</h2>
          <div className="features-grid">
            {[
              { title: "석굴암", text: "화강암을 다듬어 인공적으로 축조한 석굴 사원으로, 주실 중앙에는 거대한 본존불인 석가여래불상이 안치되어 있으며, 그 주위 벽면에는 보살상, 제자상, 역사상, 천왕상 등 총 38구의 불상이 조화롭게 배치되어 있습니다." },
              { title: "불국사", text: "'불국정토(부처의 나라)'를 지상에 구현하고자 한 신라인의 염원이 담긴 사찰로, 돌을 다듬어 만든 석조 구조물과 아름다운 목조 건축물이 조화를 이루어 고대 불교 건축의 정수로 평가됩니다." },
              { title: "다보탑과 석가탑", text: "불국사의 대표적인 석탑으로, 완벽한 비례와 기하학적인 직선미, 그리고 자유롭고 독특한 형식으로 대칭되면서도 강렬한 대비를 이루는 절묘한 구성을 갖추고 있습니다." },
              { title: "청운교와 백운교", text: "불국사로 오르는 계단으로 속세에서 불국으로의 상징적 통로이며, 연화교와 칠보교 등 돌계단과 다리들이 아름다운 조화를 이룹니다." },
              { title: "극락전과 무설전", text: "아미타여래와 비로자나불을 모신 신라 시대 불전의 정수로, 다양한 불전들이 각 부처와 보살들의 불국토를 체계화하고 통합하고자 한 다원식(多院式) 구조를 보여줍니다." },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>🗿 조각 예술</h3>
              <p>
                석굴암 본존불은 동아시아 불교 조각의 최고 걸작으로 평가받습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🏗️ 건축 기술</h3>
              <p>
                화강암을 정교하게 가공한 뛰어난 석조 건축 기술을 보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🌟 종교 철학</h3>
              <p>불교의 이상향인 불국토 사상을 건축으로 구현한 걸작입니다.</p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">palette</span>
                예술적 조화
              </h3>
              <p>건축, 조각, 종교가 완벽하게 조화를 이룬 종합 예술품입니다.</p>
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
            <h2>
              <span className="material-symbols-outlined">quiz</span>
              석굴암과 불국사 퀴즈
            </h2>
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
