import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function DolmenPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (quizCompleted) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [quizCompleted]);

  const questions = [
    {
      question: "고인돌이 만들어진 시기는?",
      options: ["구석기시대", "신석기시대", "청동기시대", "철기시대"],
      correct: 2,
    },
    {
      question: "한국 고인돌의 특징은?",
      options: [
        "세계에서 가장 작다",
        "세계 최대 규모와 밀집도",
        "모두 같은 형태",
        "주로 평지에만 위치",
      ],
      correct: 1,
    },
    {
      question: "고인돌의 주요 용도는?",
      options: ["주거지", "제단", "거대한 무덤", "창고"],
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
      markQuizAsSolved("dolmen");
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

      <header className="heritage-header dolmen-header">
        <div className="header-content">
          <div className="header-text">
            <h1>고인돌유적</h1>
            <p className="heritage-subtitle">
              Gochang, Hwasun and Ganghwa Dolmen Sites
            </p>
            <div className="heritage-info">
              <span className="info-item">📅 등재년도: 2000년</span>
              <span className="info-item">🏛️ 유형: 문화유산</span>
              <span className="info-item">
                📍 위치: 전라북도 고창, 전라남도 화순, 인천광역시 강화
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/고인돌유적.png" alt="고인돌유적" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            고창, 화순, 강화의 고인돌유적은 청동기시대(기원전 1000년경)에
            만들어진 거대한 돌무덤으로, 세계에서 가장 큰 규모와 밀집도를
            자랑합니다. 2000년 유네스코 세계문화유산으로 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>구성 지역</h2>
          <div className="features-grid">
            {[
              {
                title: "고창 고인돌유적",
                text: "전북 고창군에 약 2,000여 기의 고인돌이 분포하며, 특히 죽림리 일원에는 500기 이상이 밀집 분포하여 단일 구역으로는 최대 밀집도를 보입니다. 다양한 형식의 고인돌이 분포하여 동북아 고인돌의 변천사를 한눈에 볼 수 있습니다.",
              },
              {
                title: "화순 고인돌유적",
                text: "전남 화순군에 약 596기의 고인돌이 분포하며, 최근에 발견되어 보존 상태가 좋고 고인돌 축조 과정을 보여주는 채석장이 발견되어 당시 기술을 엿볼 수 있습니다.",
              },
              {
                title: "강화 고인돌유적",
                text: "인천 강화군에는 탁자식(북방식)과 바둑판식(남방식) 고인돌이 섞여 있으며, 특히 탁자식 고인돌이 압도적으로 많고 산 능선 등 구릉 지역에 많이 분포하는 것이 특징입니다.",
              },
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
              <h3>🗿 세계 최대 규모</h3>
              <p>
                전 세계 고인돌의 40% 이상이 한반도에 분포하며, 그 중심지입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🏗️ 뛰어난 건축술</h3>
              <p>
                거대한 돌을 정교하게 가공하고 운반한 고도의 건축 기술을
                보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>👥 사회 조직</h3>
              <p>
                거대한 고인돌 건설을 통해 청동기시대 사회의 계급과 조직을 알 수
                있습니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>🌏 문화 전파</h3>
              <p>
                동아시아 거석문화의 전파와 발전 과정을 보여주는 중요한
                증거입니다.
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
            <h2>🧠 고인돌유적 퀴즈</h2>
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
