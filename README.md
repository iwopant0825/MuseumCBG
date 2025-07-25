# React Three Fiber 박물관 프로젝트

React Three Fiber(R3F)를 사용한 3D 박물관 탐험 애플리케이션입니다. 물리 엔진과 1인칭 컨트롤을 통해 박물관 안을 자유롭게 걸어다닐 수 있습니다.

## 🏛️ 주요 기능

- **3D 박물관 모델**: GLB 형식의 박물관 3D 모델 로드
- **1인칭 컨트롤**: WASD 이동, 스페이스바 점프, 마우스 시점 조작
- **물리 엔진**: Rapier 물리 엔진을 통한 실제같은 충돌 감지
- **실시간 렌더링**: React Three Fiber 기반 고성능 3D 렌더링
- **성능 최적화**: 적응형 픽셀 비율, FPS 모니터링

## 🎮 조작법

- **WASD**: 앞/뒤/좌/우 이동
- **스페이스바**: 점프
- **마우스**: 시점 조작 (상하좌우)
- **마우스 클릭**: 포인터 락 활성화

## 🚀 특징

- **React Three Fiber**: React에서 Three.js를 선언적으로 사용
- **@react-three/drei**: 유용한 헬퍼 컴포넌트들
- **@react-three/rapier**: 물리 엔진 통합
- **@react-three/postprocessing**: 고급 시각 효과
- **Leva**: 실시간 디버깅 및 컨트롤
- **성능 최적화**: 적응형 픽셀 비율, FPS 모니터링

## 📦 설치된 패키지

### 핵심 패키지

- `@react-three/fiber` - React Three Fiber 렌더러
- `@react-three/drei` - 유용한 헬퍼 및 추상화
- `@react-three/postprocessing` - 포스트 프로세싱 효과
- `three` - Three.js 라이브러리

### 추가 기능

- `@react-three/rapier` - 물리 엔진
- `leva` - 디버깅 컨트롤 패널
- `@types/three` - TypeScript 타입 정의

## 🛠️ 개발 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Museum.jsx             # 박물관 3D 모델 컴포넌트
│   ├── Player.jsx             # 1인칭 플레이어 컨트롤러
│   ├── FirstPersonControls.jsx # 기본 1인칭 컨트롤
│   ├── Scene.jsx              # 기본 3D 씬 (데모용)
│   ├── DebugControls.jsx      # 디버깅 컨트롤
│   └── PostProcessing.jsx     # 포스트 프로세싱
├── App.jsx                    # 메인 애플리케이션
├── App.css                    # 애플리케이션 스타일
└── index.css                  # 전역 스타일
```

## 🏛️ 박물관 모델 설정

1. `museuml.glb` 파일을 `public/models/` 폴더에 넣어주세요
2. 모델이 없어도 대체 박물관 구조가 자동 생성됩니다

자세한 설정은 [MUSEUM_SETUP.md](./MUSEUM_SETUP.md)를 참조하세요.

## 🎮 기능

### 물리 기반 이동

- Rapier 물리 엔진을 사용한 실제같은 이동
- 충돌 감지 및 중력 시뮬레이션
- 박물관 구조물과의 정확한 충돌

### 1인칭 시점

- 마우스를 통한 자유로운 시점 조작
- 포인터 락을 통한 몰입감 증대
- 눈높이 카메라 위치 (1.6m)

### 성능 최적화

- 적응형 픽셀 비율
- FPS 카운터
- GPU 메모리 모니터링
- 효율적인 렌더링 설정

### 디버깅 도구

- Leva 컨트롤 패널
- 실시간 파라미터 조정
- 물리 디버그 모드 (선택사항)
  │ ├── DebugControls.jsx # 디버깅 컨트롤
  │ └── PostProcessing.jsx # 포스트 프로세싱
  ├── App.jsx # 메인 애플리케이션
  ├── App.css # 애플리케이션 스타일
  └── index.css # 전역 스타일

```

## 🎮 기능

### 기본 3D 씬

- 회전하는 박스
- 떠다니는 구
- 환경 조명 및 그림자
- 카메라 컨트롤 (OrbitControls)

### 성능 최적화

- 적응형 픽셀 비율
- FPS 카운터
- GPU 메모리 모니터링
- 효율적인 렌더링 설정

### 디버깅 도구

- Leva 컨트롤 패널
- 실시간 파라미터 조정
- 성능 모니터링

## 🔧 설정

### 카메라

- 초기 위치: `[0, 0, 10]`
- FOV: `42`
- 줌 범위: `3 ~ 20`

### 조명

- 주변광 강도: `0.3`
- 방향광 강도: `1.0`
- 그림자 매핑 해상도: `1024x1024`

### 렌더링

- 안티앨리어싱 활성화
- 고성능 GPU 선호
- 적응형 픽셀 비율 (최대 2배)

## 📚 추가 학습 자료

- [React Three Fiber 공식 문서](https://docs.pmnd.rs/react-three-fiber)
- [Drei 컴포넌트 가이드](https://github.com/pmndrs/drei)
- [Three.js 공식 문서](https://threejs.org/docs/)
- [React Three Fiber 예제](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

## 🤝 기여

프로젝트 개선을 위한 기여를 환영합니다!

## 📄 라이선스

MIT License+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
