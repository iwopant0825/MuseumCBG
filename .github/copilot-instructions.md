<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React Three Fiber 프로젝트 가이드라인

이 프로젝트는 React Three Fiber (R3F)를 사용한 3D 웹 애플리케이션입니다.

## 사용 기술 스택

- **React Three Fiber**: React에서 Three.js를 사용하기 위한 렌더러
- **@react-three/drei**: R3F용 유용한 헬퍼 및 추상화 컴포넌트
- **@react-three/rapier**: 물리 엔진 (Rapier) 통합
- **@react-three/postprocessing**: 포스트 프로세싱 효과
- **Leva**: 실시간 디버깅 및 컨트롤 패널
- **Vite**: 빠른 개발 서버 및 빌드 도구

## 코딩 가이드라인

### 성능 최적화

- `useMemo`와 `useCallback`을 적극 활용하여 불필요한 리렌더링 방지
- 복잡한 지오메트리는 `useLoader`로 미리 로드
- 텍스처는 적절한 크기로 최적화
- `frustumCulled` 속성을 사용하여 화면 밖 객체 렌더링 방지
- LOD(Level of Detail) 시스템 구현 고려

### 컴포넌트 구조

- 3D 객체는 별도 컴포넌트로 분리
- `useFrame` 훅을 사용한 애니메이션은 성능을 고려하여 구현
- 전역 상태는 Zustand 또는 Context API 사용 권장

### 디버깅

- Leva 컨트롤러를 사용하여 실시간 파라미터 조정
- React DevTools 및 Three.js Inspector 활용
- FPS 모니터링 구현

### 파일 구조

```
src/
├── components/
│   ├── Scene.jsx          # 메인 3D 씬
│   ├── models/            # 3D 모델 컴포넌트
│   ├── effects/           # 포스트 프로세싱 효과
│   └── ui/                # UI 컴포넌트
├── hooks/                 # 커스텀 훅
├── utils/                 # 유틸리티 함수
└── assets/                # 3D 모델, 텍스처 등
```

### 모범 사례

- 그림자는 필요한 곳에만 적용
- 카메라 컨트롤은 사용자 경험을 고려하여 제한
- 텍스처 및 지오메트리 재사용 최대화
- 적절한 조명 설정으로 시각적 품질 향상
