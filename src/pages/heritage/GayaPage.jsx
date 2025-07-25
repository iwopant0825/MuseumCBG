import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import "./HeritagePage.css";

export default function GayaPage() {
  const navigate = useNavigate();
  const { markQuizAsSolved } = useGameStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "가야고분군이 위치한 지역은 어디입니까?",
      options: [
        "경상남도, 경상북도, 전라북도",
        "경기도, 강원도, 충청도",
        "서울, 인천, 경기",
        "전라남도, 충청남도, 경상북도",
      ],
      correct: 0,
    },
    {
      question: "가야고분군의 시대적 배경은?",
      options: ["1세기~6세기", "7세기~10세기", "고려시대", "조선시대"],
      correct: 0,
    },
    {
      question: "가야고분군을 구성하는 고분군의 개수는?",
      options: ["5개", "6개", "7개", "8개"],
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
      markQuizAsSolved("gaya");
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

  useEffect(() => {
    if (quizCompleted) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [quizCompleted]);

  return (
    <div className="heritage-page">
      {/* 상단 네비게이션 */}
      <nav className="heritage-nav">
        <button onClick={() => navigate("/")} className="back-button">
          ← 박물관으로 돌아가기
        </button>
        <h1>한국의 세계문화유산</h1>
      </nav>

      {/* 헤더 섹션 */}
      <header className="heritage-header gaya-header">
        <div className="header-content">
          <div className="header-text">
            <h1>가야고분군</h1>
            <p className="heritage-subtitle">Gaya Tumuli</p>
            <div className="heritage-info">
              <span className="info-item">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                등재년도: 2023년
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
                유형: 문화유산
              </span>
              <span className="info-item">
                <span className="material-symbols-outlined">location_on</span>
                위치: 경상남도, 경상북도, 전라북도
              </span>
            </div>
          </div>
          <div className="header-image">
            <img src="/card/가야고분군.png" alt="가야고분군" />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="heritage-content">
        <section className="description-section">
          <h2>개요</h2>
          <p>
            가야고분군은 1세기부터 6세기 후반까지 한반도 남부에 존재했던 가야
            연맹의 고분군으로, 7곳의 고분군으로 구성되어 있습니다. 2023년
            유네스코 세계문화유산으로 등재되었으며, 고대 동아시아 국가 간의
            활발한 교류를 보여주는 중요한 유산입니다.
          </p>
        </section>

        <section className="history-section">
          <h2>역사적 배경</h2>
          <div className="timeline">
            {[
              {
                marker: "1세기경",
                title: "가야 연맹 형성",
                text: "변한의 여러 소국들이 가야라는 이름으로 연맹체를 형성하기 시작하며 독자적인 문화를 발전시킴.",
              },
              {
                marker: "4세기경",
                title: "전기 가야 연맹 발전",
                text: "금관가야를 중심으로 낙동강 하류 지역에서 활발한 철기 생산과 해상 교역을 통해 성장.",
              },
              {
                marker: "5세기경",
                title: "후기 가야 연맹 재편",
                text: "고구려의 남하로 전기 가야 연맹이 약화되고, 대가야를 중심으로 고령 지역에서 후기 가야 연맹이 재편됨.",
              },
              {
                marker: "6세기 중반",
                title: "가야 연맹 쇠퇴 및 멸망",
                text: "신라와 백제의 압박 속에서 점차 세력을 잃고, 562년 대가야가 신라에 병합되며 가야 연맹은 역사 속으로 사라짐.",
              },
            ].map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">{item.marker}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2>구성 고분군</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>대성동 고분군 (김해)</h3>
              <p>
                가야 연맹의 중심지 중 하나인 금관가야의 왕릉급 대형 고분들이
                위치
              </p>
            </div>
            <div className="feature-card">
              <h3>말이산 고분군 (함안)</h3>
              <p>아라가야의 중심지로 독특한 고분 구조와 부장품으로 유명</p>
            </div>
            <div className="feature-card">
              <h3>옥전 고분군 (합천)</h3>
              <p>대가야 지역의 고분군으로 철기와 토기 등 다양한 유물이 출토</p>
            </div>
            <div className="feature-card">
              <h3>지산동 고분군 (고령)</h3>
              <p>대가야의 왕도로 대형 고분과 소형 고분이 함께 분포</p>
            </div>
            <div className="feature-card">
              <h3>송학동 고분군 (고성)</h3>
              <p>소가야 지역의 고분군으로 해안 지역의 특성을 보여줌</p>
            </div>
            <div className="feature-card">
              <h3>유곡리와 두락리 고분군 (남원)</h3>
              <p>가야 북방 지역의 고분군으로 내륙 문화의 특징을 보여줌</p>
            </div>
            <div className="feature-card">
              <h3>교동과 송현동 고분군 (창녕)</h3>
              <p>비화가야 지역의 고분군으로 다양한 문화 요소가 혼재</p>
            </div>
          </div>
        </section>

        <section className="significance-section">
          <h2>문화적 가치</h2>
          <div className="significance-content">
            {[
              {
                icon: "vase",
                title: "독특한 토기 문화",
                text: "가야 특유의 회청색 경질토기와 장경호 등 독특한 토기 문화를 발전시켰습니다.",
              },
              {
                icon: "construction",
                title: "뛰어난 철기 기술",
                text: "동아시아 최고 수준의 철기 제작 기술을 보유하여 주변국과 활발한 교역을 전개했습니다.",
              },
              {
                icon: "public",
                title: "국제적 교류",
                text: "중국, 일본과의 활발한 교류를 통해 동아시아 문화 발전에 기여했습니다.",
              },
              {
                icon: "architecture",
                title: "독특한 고분 구조",
                text: "수혈식 석곽묘와 횡혈식 석실묘 등 다양한 고분 구조를 발전시켰습니다.",
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
            <h2>가야고분군 퀴즈</h2>
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

      {/* 푸터 */}
      <footer className="heritage-footer">
        <p>&copy; 2024 한국 문화유산 체험관. 문화재청 협력.</p>
      </footer>
    </div>
  );
}
