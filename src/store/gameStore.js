import { create } from "zustand";
import { persist } from "zustand/middleware";

// 문화유산 데이터
export const heritageData = [
  {
    id: "gaya",
    name: "가야고분군",
    url: "/card/가야고분군.png",
    position: [-28, 2.6, 6],
    unlocked: true,
  },
  {
    id: "gyeongju",
    name: "경주역사유적지구",
    url: "/card/경주역사유적지구.png",
    position: [-23, 2.6, 6],
    unlocked: false,
  },
  {
    id: "dolmen",
    name: "고인돌유적",
    url: "/card/고인돌유적.png",
    position: [-18, 2.6, 6],
    unlocked: false,
  },
  {
    id: "namhansanseong",
    name: "남한산성",
    url: "/card/남한산성.png",
    position: [-13, 2.6, 6],
    unlocked: false,
  },
  {
    id: "bangudae",
    name: "반구천의암각화",
    url: "/card/반구천의암각화.png",
    position: [-8, 2.6, 6],
    unlocked: false,
  },
  {
    id: "baekje",
    name: "백제역사유적지구",
    url: "/card/백제역사유적지구.png",
    position: [-3, 2.6, 6],
    unlocked: false,
  },
  {
    id: "sansa",
    name: "산사한국의산지승원",
    url: "/card/산사한국의산지승원.png",
    position: [2, 2.6, 6],
    unlocked: false,
  },
  {
    id: "seowon",
    name: "한국의서원",
    url: "/card/한국의서원.png",
    position: [7, 2.6, 6],
    unlocked: false,
  },
  {
    id: "seokguram",
    name: "석굴암과불국사",
    url: "/card/석굴암과불국사.png",
    position: [-28, 2.6, -6],
    unlocked: false,
  },
  {
    id: "jeju",
    name: "제주화산섬과용암동굴",
    url: "/card/제주화산섬과용암동굴.png",
    position: [-23, 2.6, -6],
    unlocked: false,
  },
  {
    id: "joseon",
    name: "조선왕릉",
    url: "/card/조선왕릉.png",
    position: [-18, 2.6, -6],
    unlocked: false,
  },
  {
    id: "jongmyo",
    name: "종묘",
    url: "/card/종묘.png",
    position: [-13, 2.6, -6],
    unlocked: false,
  },
  {
    id: "changdeokgung",
    name: "창덕궁",
    url: "/card/창덕궁​.png",
    position: [-8, 2.6, -6],
    unlocked: false,
  },
  {
    id: "hahoe",
    name: "하회와양동",
    url: "/card/하회와양동.png",
    position: [-3, 2.6, -6],
    unlocked: false,
  },
  {
    id: "getbol",
    name: "한국의갯벌",
    url: "/card/한국의갯벌.png",
    position: [2, 2.6, -6],
    unlocked: false,
  },
  {
    id: "haeinsa",
    name: "해인사장경판전",
    url: "/card/해인사장경판전​.png",
    position: [7, 2.6, -6],
    unlocked: false,
  },
  {
    id: "hwaseong",
    name: "화성",
    url: "/card/화성.png",
    position: [12, 2.6, -6],
    unlocked: false,
  },
];

// 게임 스토어
export const useGameStore = create(
  persist(
    (set, get) => ({
      // 게임 상태 초기화
      heritages: heritageData.map((h, index) => ({
        ...h,
        unlocked: index === 0, // 첫 번째 유산만 초기에 해금
        quizSolved: false, // 퀴즈 해결 상태 추가
      })),
      currentInteractionCard: null,
      showInteractionPrompt: false,
      gameCompleted: false,

      // 게임 액션
      unlockHeritage: (heritageId) => {
        set((state) => {
          const updatedHeritages = state.heritages.map((heritage) =>
            heritage.id === heritageId
              ? { ...heritage, unlocked: true }
              : heritage
          );
          return { heritages: updatedHeritages };
        });
      },

      setCurrentInteractionCard: (cardId) => {
        set({ currentInteractionCard: cardId });
      },

      setShowInteractionPrompt: (show) => {
        set({ showInteractionPrompt: show });
      },

      resetGame: () => {
        set({
          heritages: heritageData.map((h, index) => ({
            ...h,
            unlocked: index === 0,
            quizSolved: false,
          })),
          currentInteractionCard: null,
          showInteractionPrompt: false,
          gameCompleted: false,
        });
      },

      unlockAllHeritages: () => {
        set((state) => ({
          heritages: state.heritages.map((h) => ({
            ...h,
            unlocked: true,
            quizSolved: true, // 모든 퀴즈도 해결된 것으로 처리
          })),
          gameCompleted: true, // 이 버튼을 누르면 게임 완료 상태로 만듦
        }));
        setTimeout(() => {
          window.alert("축하합니다! 모든 문화유산 퀴즈를 클리어했습니다!");
        }, 100);
      },

      // 퀴즈 해결 처리
      markQuizAsSolved: (heritageId) => {
        set((state) => {
          // 이미 푼 문화유산이면 아무 동작도 하지 않음
          const heritage = state.heritages.find((h) => h.id === heritageId);
          if (heritage && heritage.quizSolved) {
            return {};
          }
          // 1. 현재 문화유산의 quizSolved 상태를 업데이트합니다.
          let heritagesAfterQuizSolved = state.heritages.map((h) =>
            h.id === heritageId ? { ...h, quizSolved: true } : h
          );

          // 2. 업데이트된 목록(heritagesAfterQuizSolved)에서 다음 해금할 문화유산을 찾습니다.
          const nextHeritageToUnlock = heritagesAfterQuizSolved.find(
            (h) => !h.unlocked
          );

          let finalHeritages;
          if (nextHeritageToUnlock) {
            // 3. 다음 해금할 문화유산이 있다면, 해당 문화유산을 해금합니다.
            finalHeritages = heritagesAfterQuizSolved.map((h) =>
              h.id === nextHeritageToUnlock.id ? { ...h, unlocked: true } : h
            );
          } else {
            // 4. 더 이상 해금할 문화유산이 없다면, 목록은 이미 최종 상태입니다.
            finalHeritages = heritagesAfterQuizSolved;
          }

          // 5. 최종 상태에서 모든 퀴즈가 해결되었는지 확인합니다.
          const allQuizzesSolved = finalHeritages.every((h) => h.quizSolved);

          return {
            heritages: finalHeritages,
            gameCompleted: allQuizzesSolved,
          };
        });
      },

      // 헬퍼 함수
      getSolvedQuizCount: () => {
        return get().heritages.filter((h) => h.quizSolved).length;
      },

      isHeritageUnlocked: (heritageId) => {
        const heritage = get().heritages.find((h) => h.id === heritageId);
        return heritage ? heritage.unlocked : false;
      },
    }),
    {
      name: "heritage-game-storage",
      version: 4, // 데이터 구조 변경에 따른 버전 업데이트
    }
  )
);
