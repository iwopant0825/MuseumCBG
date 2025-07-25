import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function SansaPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
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
      markQuizAsSolved("sansa");
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
            산사, 한국의 산지승원은 통도사, 부석사, 봉정사, 법주사, 마곡사,
            선암사, 대흥사 등 7개 사찰로 구성되어 있으며, 자연과 조화를 이루는
            한국 불교 건축의 특징을 보여줍니다. 2018년 유네스코 세계문화유산에
            등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>구성 사찰</h2>
          <div className="features-grid">
            {[
              {
                title: "통도사",
                text: "부처의 진신사리를 모신 불보사찰로 한국 불교의 성지입니다. 계율의 근본 도량으로 불립니다.",
              },
              {
                title: "부석사",
                text: "의상대사가 창건한 화엄종 사찰로, 무량수전의 아름다운 건축과 소조 아미타여래좌상이 유명합니다.",
              },
              {
                title: "봉정사",
                text: "한국에서 가장 오래된 목조건물인 극락전을 보유한 고찰입니다. 자연 지형을 활용한 배치가 돋보입니다.",
              },
              {
                title: "법주사",
                text: "속리산의 대표 사찰로, 미륵불상이 유명한 법상종 사찰입니다. 팔상전은 한국에 남아있는 유일한 5층 목탑입니다.",
              },
              {
                title: "마곡사",
                text: "태화산에 위치한 사찰로, 춘마곡 추갑사(봄 마곡사, 가을 갑사)라는 말이 있을 정도로 아름다운 경치를 자랑합니다.",
              },
              {
                title: "선암사",
                text: "조계산에 위치한 사찰로, 전통적인 승려 교육과 수행의 중심지입니다. 승선교의 아름다움이 유명합니다.",
              },
              {
                title: "대흥사",
                text: "두륜산에 위치한 사찰로, 임진왜란 이후 서산대사의 의발이 전해지며 호국불교의 중심지가 되었습니다.",
              },
              {
                title: "공간 배치 특징",
                text: "산사는 주변 자연을 경계로 삼는 '개방형' 구조를 특징으로 하며, 경사가 완만한 산기슭에 자리 잡아 숲과 시냇물 등 자연환경에 순응하여 지어졌습니다.",
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
                icon: "nature_people",
                title: "자연과의 조화로운 건축",
                text: "산사는 주변 자연을 경계로 삼는 '개방형' 구조를 특징으로 하며, 자연 지형을 훼손하지 않고 순응하여 지어진 한국 불교 건축의 독특한 미학을 보여줍니다.",
              },
              {
                icon: "temple_buddhist",
                title: "살아있는 불교 문화의 중심",
                text: "7세기부터 9세기 사이에 창건되어 오늘날까지도 신앙, 영적 수행, 승려 공동체의 일상생활의 중심지 역할을 지속하고 있습니다. 조선 시대의 숭유억불 정책과 여러 전쟁 속에서도 살아있는 신앙과 수행의 중심지로 보존되어 왔다는 점에서 그 가치가 더욱 높이 평가됩니다.",
              },
              {
                icon: "architecture",
                title: "전통 건축의 우수성",
                text: "사찰의 공간 배치는 한국 고유의 특성을 보여주며, '마당'을 중심으로 불전, 누각, 강당, 승려들의 숙소 등 네 개의 건물이 배치되는 형태를 보입니다.",
              },
              {
                icon: "school",
                title: "수행과 교육의 전통",
                text: "불교 수행과 교육의 전통이 현재까지 이어지는 살아있는 유산으로, 승려들의 자급자족적인 사찰 운영, 승려 교육, 그리고 선(禪) 수행과 교리 학습의 전통을 오늘날까지 이어오고 있습니다.",
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

      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
