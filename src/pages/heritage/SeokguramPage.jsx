import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function SeokguramPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
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
            석굴암과 불국사는 8세기 통일신라시대에 건립된 불교 건축의 걸작으로,
            한국 불교 예술의 정수를 보여줍니다. 1995년 종묘와 함께 유네스코
            세계문화유산으로 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 구성</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>석굴암</h3>
              <p>
                인공 석굴로 만든 불교 사원으로 석가여래좌상을 중심으로 한 조각군
              </p>
            </div>
            <div className="feature-card">
              <h3>불국사</h3>
              <p>다보탑과 석가탑으로 유명한 신라 불교 건축의 대표작</p>
            </div>
            <div className="feature-card">
              <h3>청운교와 백운교</h3>
              <p>불국사로 오르는 계단으로 속세에서 불국으로의 상징적 통로</p>
            </div>
            <div className="feature-card">
              <h3>극락전과 무설전</h3>
              <p>아미타여래와 비로자나불을 모신 신라 시대 불전의 정수</p>
            </div>
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
                <h3>
                  <span className="material-symbols-outlined">celebration</span>
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
