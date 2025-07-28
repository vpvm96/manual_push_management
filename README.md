# 수동 이메일 푸시 및 히스토리 관리 프로젝트

이 프로젝트는 사용자가 직접 이메일 푸시를 보내고, 발송된 이메일의 히스토리를 관리할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- 수동 이메일 발송 기능
- 이메일 발송 히스토리 조회 및 관리

## 기술 스택

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: MUI, Emotion, Pretendard Font
- **Linting**: ESLint (with custom rules)
- **Package Manager**: Yarn

## 폴더 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 하며, 외부 저장소의 일부 모듈을 포함하고 있습니다.

```
/
├── eslint-rules/        # 외부에서 가져온 커스텀 ESLint 규칙
├── public/              # 정적 에셋
└── src/
    ├── app/             # 앱의 전반적인 설정, 라우팅, 공통 레이아웃
    ├── pages/           # 페이지 컴포넌트 (여러 피처와 위젯을 조합)
    ├── widgets/         # 독립적인 UI 블록 (예: 헤더, 사이드바)
    ├── features/        # 구체적인 기능 단위 (예: 이메일 발송 폼)
    ├── entities/        # 핵심 비즈니스 개체 (예: 사용자, 이메일)
    ├── packages/        # Foxmon 회심의 패키지
    └── shared/          # 모든 계층에서 재사용되는 공통 코드
```

## 실행 방법

1.  **의존성 설치**

    ```bash
    yarn install
    ```

2.  **개발 서버 실행**

    ```bash
    yarn dev
    ```

3.  **프로덕션 빌드**

    ```bash
    yarn build
    ```

4.  **코드 린팅**
    ```bash
    yarn lint
    ```
