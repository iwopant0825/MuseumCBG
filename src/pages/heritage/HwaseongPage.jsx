import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function HwaseongPage() {
  const navigate = useNavigate();
  const { unlockHeritage, getNextHeritageToUnlock } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "수원화성이 세계유산에 등재된 해는?",
      options: ["1995년", "1997년", "1999년", "2001년"],
      correct: 1,
    },
    {
      question: "수원화성을 건설한 왕은?",
      options: ["영조", "정조", "순조", "헌종"],
      correct: 1,
    },
    {
      question: "수원화성의 총 길이는?",
      options: ["4.7km", "5.7km", "6.7km", "7.7km"],
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
      <nav className="heritage-nav">
        <h1>한국의 세계문화유산</h1>
        <button onClick={() => navigate("/")} className="back-button">
          <span className="material-symbols-outlined">arrow_back</span>
          박물관으로 돌아가기
        </button>
      </nav>

      <header className="heritage-header hwaseong-header">
        <div className="header-content">
          <div className="header-text">
            <h1>화성</h1>
            <p className="heritage-subtitle">Hwaseong Fortress</p>
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
                위치: 경기도 수원시
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/화성.png" alt="화성" />
          </div>
        </div>
      </header>

      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            화성은 조선 정조가 아버지 사도세자를 위해 건설한 계획도시 수원의
            성곽으로, 동서양 축성술이 조화된 18세기 성곽 건축의 걸작입니다.
            정조의 효심과 조선 후기의 발달된 건축 기술이 결합되어 만들어진
            과학적이고 실용적인 성곽입니다.
          </p>
        </section>

        <section className="features-section">
          <h2>주요 시설</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>성곽 구조</h3>
              <p>
                총 길이 5.7km의 과학적으로 설계된 성곽으로 지형을 최대한
                활용했습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>4대 문</h3>
              <p>
                장안문, 팔달문, 창룡문, 화서문의 웅장한 성문이 각각의 특색을
                가지고 있습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>군사 시설</h3>
              <p>
                포루, 각루, 봉돈 등 첨단 방어 시설이 체계적으로 배치되어
                있습니다.
              </p>
            </div>
            <div className="feature-card">
              <h3>화성성역의궤</h3>
              <p>
                건설 과정을 상세히 기록한 조선의 기록문화로 복원의 근거가
                되었습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">engineering</span>
                과학적 설계
              </h3>
              <p>
                동서양 축성술의 장점을 결합한 과학적이고 체계적인 설계입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">favorite</span>
                효(孝)의 정신
              </h3>
              <p>
                정조의 아버지에 대한 효심이 담긴 조선 왕조의 정신적 유산입니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">description</span>
                기록 문화
              </h3>
              <p>
                화성성역의궤를 통한 완벽한 기록 보존으로 조선의 기록 문화를
                보여줍니다.
              </p>
            </div>
            <div className="significance-item">
              <h3>
                <span className="material-symbols-outlined">castle</span>
                건축 기술
              </h3>
              <p>
                조선 후기 건축 기술의 정점을 보여주는 성곽 건축의 걸작입니다.
              </p>
            </div>
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
            <h2>화성 퀴즈</h2>
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

      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 박물관. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}
