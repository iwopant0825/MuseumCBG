import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function HahoePage() {
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
      question: "하회와 양동마을이 세계유산에 등재된 해는?",
      options: ["2008년", "2010년", "2012년", "2014년"],
      correct: 1,
    },
    {
      question: "하회마을이 위치한 곳은?",
      options: ["경주", "안동", "영주", "문경"],
      correct: 1,
    },
    {
      question: "하회마을의 대표 무형문화는?",
      options: ["농악", "탈춤", "사물놀이", "판소리"],
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
      markQuizAsSolved("hahoe");
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
      <header className="heritage-header hahoe-header">
        <div className="header-content">
          <div className="header-text">
            <h1>하회와양동</h1>
            <p className="heritage-subtitle">
              Historic Villages of Korea: Hahoe and Yangdong
            </p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2010년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 안동, 경주
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/하회와양동.png" alt="하회와양동" />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            하회마을과 양동마을은 조선시대 전통 마을의 원형을 가장 잘 보존하고
            있는 역사마을로, 양반문화와 전통 건축양식을 보여줍니다. 두 마을 모두
            자연환경과 조화를 이루며 수백 년간 지속되어온 한국의 전통적인 마을
            공동체 문화를 완벽하게 보존하고 있습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>하회마을 (안동)</h3>
              <p>
                낙동강이 'S'자 모양으로 마을을 감싸 안고 흐르는 지형에 위치하며,
                풍산 류씨가 600여 년간 대대로 살아온 동성 마을입니다. 큰
                기와집을 중심으로 초가집들이 원형을 이루며 배치되어 있으며,
                하회별신굿탈놀이와 선유줄불놀이 등 전통 민속놀이가 전승되고
                있습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>양동마을 (경주)</h3>
              <p>
                월성 손씨와 여강 이씨 두 명문가가 600여 년간 학문적 전통과 선비
                정신을 이어온 동족 마을입니다. 산과 계곡을 따라 조성된 전형적인
                양반 마을의 형태로, 종가나 큰 기와집은 높은 곳에, 초가집은
                평지에 모여 있어 주어진 지형을 계급과 가문에 맞게 재구성한
                모습을 보여줍니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>전통 건축</h3>
              <p>
                기와집과 초가집이 어우러진 조선시대 건축양식과 마을 배치의
                원형이 그대로 보존되어 있으며, 특히 양동마을은 한국의 씨족 마을
                중 가장 오랜 역사를 지니고 있습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>무형문화</h3>
              <p>
                하회별신굿탈놀이를 비롯하여 조선시대 유학자들의 고문헌, 예술
                작품, 공동체 놀이, 세시풍속 등 주민들의 생활과 신앙에 관계된
                무형유산이 세대를 이어 전승되고 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            {[
              {
                icon: "home",
                title: "전통 마을 구조와 보존",
                text: "조선시대 양반 마을의 전형적인 구조와 배치를 완벽하게 보존하고 있으며, 한국의 씨족 마을 중 가장 오랜 역사를 지니고 있습니다.",
              },
              {
                icon: "groups",
                title: "살아있는 공동체 문화",
                text: "수백 년간 지속되어온 전통적인 마을 공동체 문화와 사회 구조를 보여주며, 주민들의 생활과 신앙에 관계된 무형유산이 세대를 이어 전승되고 있습니다.",
              },
              {
                icon: "landscape",
                title: "자연과의 조화로운 배치",
                text: "강과 산을 배경으로 한 자연환경과 조화로운 마을 배치가 돋보이며, 자연에 순응하며 조화를 이루는 한국인의 자연관을 보여줍니다.",
              },
              {
                icon: "theater_comedy",
                title: "유교적 양반 문화의 상징",
                text: "조선시대 전통적인 유교 문화가 살아 숨 쉬는 상징 공간이자 가장 한국적이고 독창적인 문화를 간직한 씨족 마을입니다.",
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
            <h2>하회와양동 퀴즈</h2>
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
