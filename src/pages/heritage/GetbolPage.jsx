import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function GetbolPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "한국의갯벌이 세계자연유산으로 등재된 해는?",
      options: ["2019년", "2020년", "2021년", "2022년"],
      correct: 2,
    },
    {
      question: "갯벌의 주요 생태적 기능은?",
      options: ["조류 서식지", "수질 정화", "어류 산란지", "모든 기능"],
      correct: 3,
    },
    {
      question: "순천만이 위치한 지역은?",
      options: ["충청남도", "전라북도", "전라남도", "경상남도"],
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
      alert("모든 문제를 맞춰야 합니다. 다시 시도해주세요.");
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
        <h1>한국의 세계자연유산</h1>
        <button onClick={() => navigate("/")} className="back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          박물관으로 돌아가기
        </button>
      </nav>

      {/* 헤더 섹션 */}
      <header className="heritage-header getbol-header">
        <div className="header-content">
          <div className="header-text">
            <h1>한국의갯벌</h1>
            <p className="heritage-subtitle">Getbol, Korean Tidal Flats</p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2021년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">nature</span>
                유형: 자연유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 서천, 고창, 신안, 보성-순천
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/한국의갯벌.png" alt="한국의갯벌" />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            한국의 갯벌은 서해안과 남해안에 발달한 세계적 규모의 연안 습지로,
            철새와 해양생물의 서식지로서 생태학적 가치가 매우 높습니다. 4개
            지역(서천, 고창, 신안, 보성-순천)의 갯벌이 2021년 유네스코
            세계자연유산으로 등재되어 그 가치를 인정받았습니다.
          </p>
        </section>

        <section className="features-section">
          <h2>구성 갯벌</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>서천 갯벌</h3>
              <p>
                충청남도 서천의 생태 보전 가치가 높은 갯벌로, 다양한 저서생물의
                서식지입니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>고창 갯벌</h3>
              <p>
                전라북도 고창의 철새 도래지로 유명한 갯벌로, 국제적 철새 이동
                경로의 중요한 기착지입니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>신안 갯벌</h3>
              <p>
                전라남도 신안의 광활한 갯벌 생태계로, 세계 최대 규모의 단일 갯벌
                지역입니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>보성-순천 갯벌</h3>
              <p>
                전라남도 순천만의 세계적 갯벌 습지로, 생물 다양성이 특히 풍부한
                지역입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>생태적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">flutter_dash</span>
                철새 서식지
              </h3>
              <p>
                동아시아-대양주 철새 이동경로의 핵심 기착지로 수백만 마리의
                철새가 서식합니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">waves</span>
                해양 생태계
              </h3>
              <p>
                갯지렁이, 조개류, 게류 등 다양한 저서생물의 중요한 서식지입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">water_drop</span>
                수질 정화
              </h3>
              <p>
                자연적인 수질 정화 기능을 통해 연안 해역의 환경을 보전합니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">eco</span>
                기후 조절
              </h3>
              <p>
                탄소 저장과 기후 조절 기능을 통해 지구 환경 보전에 기여합니다.
              </p>
            </div>
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
            <h2>한국의갯벌 퀴즈</h2>
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
              <div className="quiz-success">
                <h3>축하합니다!</h3>
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
