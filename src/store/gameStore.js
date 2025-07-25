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
      // 게임 상태 - 첫 번째만 해금된 상태로 초기화
      heritages: heritageData.map((h, index) => ({
        ...h,
        unlocked: index === 0,
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

          // 모든 카드가 해금되었는지 확인
          const allUnlocked = updatedHeritages.every((h) => h.unlocked);

          return {
            heritages: updatedHeritages,
            gameCompleted: allUnlocked,
          };
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
            unlocked: index === 0, // 첫 번째 카드만 해금
          })),
          currentInteractionCard: null,
          showInteractionPrompt: false,
          gameCompleted: false,
        });
      },

      // 헬퍼 함수들
      getUnlockedCount: () => {
        return get().heritages.filter((h) => h.unlocked).length;
      },

      getNextHeritageToUnlock: () => {
        return get().heritages.find((h) => !h.unlocked);
      },

      isHeritageUnlocked: (heritageId) => {
        const heritage = get().heritages.find((h) => h.id === heritageId);
        return heritage ? heritage.unlocked : false;
      },
    }),
    {
      name: "heritage-game-storage",
      version: 2, // 버전 증가로 기존 저장 데이터 초기화
    }
  )
);
