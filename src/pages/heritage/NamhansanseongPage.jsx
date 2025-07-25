import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function NamhansanseongPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
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
            남한산성은 조선시대에 축조된 산성으로, 수도 한양을 방어하는 핵심
            요새였습니다. 비상시에는 임시 수도 역할을 하도록 설계되었으며,
            2014년 유네스코 세계문화유산으로 등재되었습니다.
          </p>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">security</span>
                방어 체계
              </h3>
              <p>조선시대 최고 수준의 방어 건축술과 도시 계획을 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">palace</span>
                행궁 문화
              </h3>
              <p>왕이 거처하는 행궁과 관련 시설들이 잘 보존되어 있습니다.</p>
            </div>
            <div className="significance-item">
              <h3>📚 역사적 의미</h3>
              <p>정유재란과 정묘정란 등 중요한 역사적 사건들의 무대였습니다.</p>
            </div>
            <div className="significance-item">
              <h3>🌿 자연과 조화</h3>
              <p>산의 지형을 활용한 친환경적 건축의 모범 사례입니다.</p>
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
            <h2>🧠 남한산성 퀴즈</h2>
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
