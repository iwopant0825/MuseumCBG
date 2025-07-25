import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function ChangdeokgungPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
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
      markQuizAsSolved("changdeokgung");
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

  useEffect(() => {
    if (quizCompleted) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [quizCompleted]);

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
            {[
              {
                title: "돈화문",
                text: "창덕궁의 정문으로, 현존하는 궁궐 정문 중 가장 오래된 문입니다.",
              },
              {
                title: "인정전",
                text: "창덕궁의 정전으로, 왕의 즉위식, 신하들의 하례, 외국 사신 접견 등 중요한 국가 행사가 치러지던 곳입니다.",
              },
              {
                title: "선정전",
                text: "왕이 거처하며 일상 업무를 보던 편전으로, 유일하게 청기와를 얹은 건물입니다.",
              },
              {
                title: "희정당",
                text: "원래 왕의 침실이 딸린 편전이었으나, 나중에 신하들과 국사를 논의하던 어전회의실로 사용되었습니다. 외형은 한옥이지만 실내는 서양식으로 구성되어 있습니다.",
              },
              {
                title: "대조전",
                text: "왕과 왕비가 거주하던 침전입니다. 창덕궁 전각 중 유일하게 용마루가 없는 건물입니다.",
              },
              {
                title: "낙선재",
                text: "검소하고 질박한 궁궐 건축의 특징을 보여주는 곳으로, 광복 이후 대한제국의 마지막 황실 가족이 생활했던 역사적 의미가 있는 곳입니다.",
              },
              {
                title: "후원(비원)",
                text: "자연 지형을 크게 변형시키지 않고 조성된 왕실 정원으로, 부용지, 주합루, 애련지, 존덕정, 옥류천 등 다양한 정자와 연못이 있습니다.",
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
                icon: "nature",
                title: "자연과의 조화",
                text: "자연 지형을 거스르지 않고 건물을 배치한 독특한 건축 미학은 한국 전통 건축의 정수를 보여줍니다. 특히 후원은 자연 경관을 그대로 반영하여 자연의 아름다움과 인공의 정교함이 조화롭게 결합된 공간으로 평가받습니다.",
              },
              {
                icon: "history_edu",
                title: "역사적 중요성",
                text: "임진왜란 이후 조선의 정궁 역할을 하며 조선왕조의 주요 왕들이 거주하고 중요한 정치적 결정을 내렸던 장소입니다.",
              },
              {
                icon: "architecture",
                title: "건축적 특성",
                text: "경복궁과 달리 정문인 돈화문이 정남향이 아니고, 건물 배치가 여러 개의 축으로 이루어져 자연스러운 산세에 따라 자유롭게 배치된 것이 특징입니다.",
              },
              {
                icon: "gavel",
                title: "유교적 세계관",
                text: "유교 이념에 따라 상징적, 기능적으로 배치된 건물들은 조선 시대의 독특한 유교적 세계관을 보여줍니다.",
              },
              {
                icon: "preserved_landscape",
                title: "보존 가치",
                text: "경복궁의 전각들이 대부분 복원된 것과 달리, 창덕궁의 돈화문, 인정전, 선정전 등 많은 건물들이 원형 그대로 남아있어 사적으로서의 가치가 높습니다.",
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
