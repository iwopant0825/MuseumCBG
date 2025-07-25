import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function JejuPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "제주화산섬과용암동굴이 유네스코 세계유산으로 등재된 해는?",
      options: ["2005년", "2007년", "2009년", "2011년"],
      correct: 1,
    },
    {
      question: "제주도의 최고봉은?",
      options: ["한라산", "성산일출봉", "만장굴", "거문오름"],
      correct: 0,
    },
    {
      question: "제주 용암동굴 중 가장 긴 동굴은?",
      options: ["만장굴", "김녕굴", "벵뒤굴", "협재굴"],
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
      markQuizAsSolved("jeju");
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

      <header className="heritage-header jeju-header">
        <div className="header-content">
          <div className="header-text">
            <h1>제주화산섬과용암동굴</h1>
            <p className="heritage-subtitle">
              Jeju Volcanic Island and Lava Tubes
            </p>
            <div className="heritage-info">
              <span className="info-item">📅 등재년도: 2007년</span>
              <span className="info-item">🌿 유형: 자연유산</span>
              <span className="info-item">📍 위치: 제주특별자치도</span>
            </div>
          </div>
          <div className="header-image">
            <img
              src="/card/제주화산섬과용암동굴.png"
              alt="제주화산섬과용암동굴"
            />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            제주화산섬과용암동굴은 한라산천연보호구역, 성산일출봉, 거문오름
            용암동굴계로 구성된 세계자연유산입니다. 화산 활동으로 형성된 독특한
            지질학적 특성과 생물 다양성을 인정받아 2007년 유네스코
            세계자연유산으로 등재되었습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 구성</h2>
          <div className="features-grid">
            {[
              { title: "한라산 천연보호구역", text: "한국에서 가장 높은 산으로, 정상부의 백록담 분화구와 다양한 형태의 암석, 폭포를 포함하고 있습니다. 고도에 따라 기후대가 달라져 난대, 온대, 한대 식물 1,800여 종과 동물 4,000여 종이 서식하는 생태계의 보고입니다." },
              { title: "성산일출봉 응회구", text: "오래전 바다 속 화산 활동으로 솟아올라 극적인 장관을 연출하는 곳입니다. 얕은 바다에서 수중 폭발한 화산 폭발 과정을 알 수 있게 해주는 세계적으로 중요한 곳으로 평가받습니다." },
              { title: "거문오름 용암동굴계", text: "형형색색의 탄산염 생성물이 동굴의 천장과 바닥을 화려하게 장식하여 세계에서 가장 아름다운 동굴계로 꼽힙니다. 만장굴, 김녕굴, 벵뒤굴, 용천동굴, 당처물동굴 등이 포함됩니다." },
              { title: "독특한 생태계", text: "화산섬 특유의 고유종과 아열대-온대 식생 분포를 보이며, 한국산 관속식물의 약 절반이 제주도에 자생하고 멸종위기종 및 보호야생종의 약 절반이 제주도에 분포합니다." },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="significance-section">
          <h2>자연적 가치</h2>
          <div className="significance-content">
            {[
              { icon: "volcano", title: "지질학적 가치", text: "세계적으로 보기 드물게 움직이지 않는 대륙 지각판 위 열점(hot spot)에 생성된 대규모 순상 화산으로 특별한 가치를 지닙니다. 화산섬 특유의 지질학적 특성과 발전 과정 등 지구의 역사를 잘 보여줍니다." },
              { icon: "cave", title: "용암동굴의 아름다움과 중요성", text: "세계에서 가장 긴 용암동굴 중 하나인 만장굴을 포함하며, 다른 용암 동굴에서는 흔히 볼 수 없는 종유석 같은 탄산염 동굴 생성물이 다양하게 나타나 그 가치가 매우 높습니다." },
              { icon: "forest", title: "생태학적 가치", text: "다양한 생물의 서식지가 분포하고 있어 화산의 생성 과정 연구와 생태계 연구에 있어서 중요한 학술적 가치를 지닙니다. 한국산 관속식물의 약 절반이 제주도에 자생하며, 멸종위기종 및 보호야생종의 약 절반이 제주도에 분포합니다." },
              { icon: "landscape", title: "뛰어난 자연미와 경관적 가치", text: "화산섬의 아름다운 자연경관과 독특한 지질 구조를 간직하고 있으며, 유네스코 세계유산 등재 기준인 '최상의 자연 현상이나 뛰어난 자연미와 미학적 중요성을 지닌 지역'에 부합합니다." },
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
            <h2>🧠 제주화산섬과용암동굴 퀴즈</h2>
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
