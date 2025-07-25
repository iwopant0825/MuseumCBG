import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function HaeinsaPage() {
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
      question: "해인사가 위치한 산은?",
      options: ["지리산", "가야산", "설악산", "한라산"],
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
      markQuizAsSolved("haeinsa");
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
            해인사 장경판전은 13세기 고려시대에 제작된 팔만대장경을 보관하는
            건축물로, 세계에서 가장 오래된 목판 대장경을 보존하고 있습니다.
            1995년 유네스코 세계문화유산에 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            {[
              {
                title: "팔만대장경",
                text: "고려 고종 때 몽골의 침입을 불교의 힘으로 극복하고자 제작된 세계 최고의 목판 대장경으로, 불교 경전의 완벽한 집대성이자 당시 고려인들의 역사와 애국심, 신앙심의 결정체입니다.",
              },
              {
                title: "장경판전의 과학적 설계",
                text: "자연적인 환기, 습도 조절, 실내 적정 온도 유지 등 과학적이고 합리적인 설계가 특징입니다. 앞뒤 벽에 창의 크기를 다르게 하여 공기 순환을 유도하고, 바닥에는 숯, 횟가루, 소금 등을 깔아 습도를 조절합니다.",
              },
              {
                title: "목판 보존 기술",
                text: "760년이 넘는 시간 동안 팔만대장경판이 온전히 보존될 수 있었던 것은 장경판전 건물의 과학적인 설계 덕분입니다. 이는 세계 인쇄문화사의 걸작으로 평가받습니다.",
              },
              {
                title: "불교 문화의 보고",
                text: "한국 불교 문화의 정수를 담은 종합 문화유산으로, 불교 경전의 집대성뿐만 아니라 당시의 건축 기술, 과학 기술, 그리고 불교 신앙이 결합된 인류의 소중한 유산입니다.",
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
            {[
              {
                icon: "library_books",
                title: "인쇄문화 유산",
                text: "세계 최고 수준의 목판 인쇄 기술과 완벽한 경전 집성의 걸작입니다. 팔만대장경은 내용의 완전성과 정확성, 판각 기술의 예술성과 기술성 면에서 전 세계 불교 역사에서 독보적인 위치를 가집니다.",
              },
              {
                icon: "construction",
                title: "과학적 보존 기술",
                text: "760년이 넘는 시간 동안 팔만대장경판이 온전히 보존될 수 있었던 것은 장경판전 건물의 과학적인 설계 덕분입니다. 자연적인 환기, 습도 조절, 실내 적정 온도 유지 등 합리적인 설계가 돋보입니다.",
              },
              {
                icon: "self_improvement",
                title: "불교 정신과 역사적 의의",
                text: "불교 경전의 집대성으로 동아시아 불교 문화의 정수를 담고 있으며, 몽골 침입기 국난 극복 의지가 담긴 민족 문화의 상징적 유산입니다.",
              },
              {
                icon: "architecture",
                title: "건축사적 가치",
                text: "15세기 조선 초기의 전통적인 목조건축 양식을 보여주며, 건물 자체의 아름다움과 함께 대장경판 보관을 위한 기능적 측면이 탁월하게 구현된 건축물입니다.",
              },
            ].map((item, index) => (
              <div key={index} className="significance-item">
                <h3>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </div>
            ))}
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

      {/* 푸터 */}
      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
