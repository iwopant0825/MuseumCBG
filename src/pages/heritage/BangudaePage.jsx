import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function BangudaePage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "반구천의 암각화가 만들어진 시대는?",
      options: ["구석기시대", "신석기시대~청동기시대", "철기시대", "삼국시대"],
      correct: 1,
    },
    {
      question: "반구천 암각화의 가장 특징적인 그림은?",
      options: ["호랑이", "고래", "말", "새"],
      correct: 1,
    },
    {
      question: "반구천 암각화의 주된 내용은?",
      options: [
        "모두 추상적",
        "주로 식물 그림",
        "동물과 사냥 장면",
        "글자만 새겨짐",
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
      markQuizAsSolved("bangudae");
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

      <header className="heritage-header bangudae-header">
        <div className="header-content">
          <div className="header-text">
            <h1>반구천의암각화</h1>
            <p className="heritage-subtitle">Bangudae Petroglyphs</p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2024년 (등재 신청)
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 울산광역시
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/반구천의암각화.png" alt="반구천의암각화" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            반구대 암각화는 신석기시대부터 청동기시대에 이르는 선사시대 바위그림으로, 고래, 바다동물, 육지동물 등 353점의 그림이 새겨져 있습니다. 선사시대 인류의 생활과 신앙을 보여주는 귀중한 문화유산으로, 2025년 7월 유네스코 세계유산으로 등재될 예정입니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 특징</h2>
          <div className="features-grid">
            {[
              { title: "고래 그림", text: "세계에서 가장 오래된 고래 사냥 장면을 묘사한 암각화로, 다양한 종류의 고래와 그들의 습성이 생생하게 표현되어 있습니다." },
              { title: "동물 그림", text: "호랑이, 멧돼지, 사슴 등 육지 동물과 거북, 바다사자 등 바다 동물들이 생동감 있게 묘사되어 당시의 생태 환경을 엿볼 수 있습니다." },
              { title: "사냥 장면", text: "선사시대 사람들의 사냥 방식과 어로 활동을 보여주는 장면들로, 당시의 생활상과 기술 수준을 짐작하게 합니다." },
              { title: "의식 장면", text: "종교적 의식이나 샤머니즘과 관련된 신비로운 그림들이 포함되어 있어 선사시대 인류의 정신세계를 엿볼 수 있습니다." },
              { title: "예술성 및 기법", text: "단순한 형태를 넘어 동물의 활동적인 모습과 생태적 특징을 사실적으로 묘사하며, 선과 점을 이용한 표현 기법이 뛰어납니다." },
              { title: "보존 환경", text: "암각화가 새겨진 바위면의 윗부분이 처마처럼 튀어나와 자연적인 바위그늘을 형성하여 비바람으로부터 그림을 보호하고 있습니다." },
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
              { icon: "history_edu", title: "선사시대 생활상 연구", text: "사냥과 어로 활동, 당시 사람들의 생활 모습과 정신세계를 엿볼 수 있는 중요한 자료입니다." },
              { icon: "whale", title: "세계 최고(最古)의 포경 유적", text: "약 7,000년 전 신석기 시대에 제작된 것으로 추정되며, 지구상에 현존하는 고래 사냥 그림 중 가장 오래된 것으로 평가됩니다." },
              { icon: "palette", title: "신앙과 예술의 결합", text: "사냥을 생업으로 삼던 사람들이 바위에 신비한 힘이 있다고 믿고 사냥 대상 동물을 새기며 풍요를 기원했던 신앙적 의미와 예술적 감각이 결합된 작품입니다." },
              { icon: "public", title: "탁월한 보편적 가치", text: "선사인들의 예술성과 고래잡이라는 희소한 주제를 창의적으로 풀어낸 걸작이자 한반도 동남부 연안 지역 사람들의 문화 발전을 집약적으로 보여주는 탁월한 가치를 지닙니다." },
            ].map((item, index) => (
              <div key={index} className="significance-item">
                <h3><span className="material-symbols-outlined">{item.icon}</span> {item.title}</h3>
                <p>{item.text}</p>
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
            <h2>🧠 반구천의암각화 퀴즈</h2>
            <p className="quiz-description">
              위 내용을 잘 읽어보셨나요? 3문제를 모두 맞추면 다음 문화유산을
              해금할 수 있습니다!
            </p>

            {questions.map((question, questionIndex) => (
              <div key={questionIndex + 1} className="quiz-question">
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
