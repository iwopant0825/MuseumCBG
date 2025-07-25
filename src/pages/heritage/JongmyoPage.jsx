import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function JongmyoPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "종묘가 세계유산에 등재된 해는?",
      options: ["1993년", "1995년", "1997년", "1999년"],
      correct: 1,
    },
    {
      question: "종묘의 주요 건물은?",
      options: ["정전과 영녕전", "대웅전과 극락전", "인정전과 선정전", "경복궁과 창덕궁"],
      correct: 0,
    },
    {
      question: "종묘제례의 특징은?",
      options: ["1년에 한 번", "매월 거행", "500년 이상 이어진 제례 전통", "근래에 복원"],
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
      markQuizAsSolved("jongmyo");
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

      <header className="heritage-header jongmyo-header">
        <div className="header-content">
          <div className="header-text">
            <h1>종묘</h1>
            <p className="heritage-subtitle">Jongmyo Shrine</p>
            <div className="heritage-info">
              <span className="info-item">📅 등재년도: 1995년</span>
              <span className="info-item">🏛️ 유형: 문화유산</span>
              <span className="info-item">📍 위치: 서울특별시</span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/종묘.png" alt="종묘" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            종묘는 조선왕조 역대 왕과 왕비의 신주를 모신 왕실의 사당으로, 유교적
            제례 전통이 500년 이상 지속되고 있는 세계 유일의 장소입니다. 1995년
            한국 최초로 유네스코 세계문화유산으로 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            {[
              { title: "건축 양식", text: "가장 정제되고 장엄한 건축물 중 하나로, 화려한 단청이나 장식을 최소화하고 절제된 아름다움을 보여줍니다. 특히 정전은 지붕 길이가 100미터가 넘어 우리나라에서 가장 긴 목조건물로 꼽힙니다." },
              { title: "정전", text: "정식으로 왕위에 오른 왕과 왕비의 신주를 모시는 중심 건물입니다. 현재 19실에 49위의 신위가 모셔져 있습니다." },
              { title: "영녕전", text: "추존된 왕과 왕비, 또는 복위된 왕들의 신주를 모시는 별묘입니다. 현재 16실에 34위의 신위가 모셔져 있습니다." },
              { title: "종묘제례", text: "조선시대 국가의 가장 중요한 제사였으며, 현재도 매년 5월 첫째 주 일요일에 거행됩니다. 유네스코 무형문화유산으로 지정된 제례 의식입니다." },
              { title: "종묘제례악", text: "제례와 함께 연주되는 전통 궁중음악으로, 유네스코 인류무형문화유산으로 등재되어 있습니다." },
              { title: "부속 건물", text: "제례 준비를 위한 어숙실(재궁), 향대청, 망묘루 등 여러 부속 전각들이 있습니다." },
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
              <h3>⛩️ 제례 전통</h3>
              <p>600년간 이어진 세계에서 가장 오래된 왕실 제례 전통입니다.</p>
            </div>
            <div className="significance-item">
              <h3>🎵 음악 유산</h3>
              <p>종묘제례악은 조선시대 궁중음악의 정수를 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3>🏛️ 건축 예술</h3>
              <p>조선시대 목조 건축의 간결하고 장엄한 아름다움을 보여줍니다.</p>
            </div>
            <div className="significance-item">
              <h3>🙏 유교 정신</h3>
              <p>
                효와 조상 숭배의 유교적 가치관이 구현된 성스러운 공간입니다.
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
            <h2>🧠 종묘 퀴즈</h2>
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
