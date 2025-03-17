# 한입에 서울 (Seoul in a Bite)

**MVP 데모:** [https://seoul-in-a-bite.vercel.app/ko](https://seoul-in-a-bite.vercel.app/ko)

대만 여행객을 위한 맛집 지도 앱, "한입에 서울"은 서울의 인기 맛집 정보를 제공하는 MVP입니다.

---

## 프로젝트 개요

이 프로젝트는 [Next.js](https://nextjs.org)를 사용하여 구축되었으며, [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)으로 부트스트랩 되었습니다.

프로젝트는 [FSD (Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 기반으로 설계되어, 모듈화와 확장성을 고려한 구조를 갖추고 있습니다. 이를 통해 각 기능(예: 맛집 정보, 지도 서비스, 사용자 인증 등)이 독립적으로 관리되며, 협업 및 유지보수가 용이합니다.

---

## 시작하기

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   ```

2. **개발 서버 실행**

   ```bash
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   ```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 프로젝트 결과를 확인합니다.

---

## 프로젝트 구조

프로젝트는 FSD 아키텍처를 기반으로 다음과 같이 구성되어 있습니다:

- **app**: Next.js의 기본 페이지 및 라우트 구성
- **features**: 개별 기능 단위(예: 맛집 검색, 지도 서비스 등)
- **entities**: 도메인 객체 및 모델 관리
- **shared**: 공통 컴포넌트, 유틸리티, 스타일 등

이 구조는 기능별로 코드를 분리하여 관리하므로, 확장성과 유지보수가 용이합니다.

---

## 학습 자료

Next.js와 FSD 아키텍처에 대해 더 알아보시려면 아래 자료들을 참고하세요:

- [Next.js Documentation](https://nextjs.org/docs) – Next.js의 기능과 API에 대한 공식 문서입니다.
- [Learn Next.js](https://nextjs.org/learn) – 인터랙티브한 Next.js 튜토리얼입니다.
- [Feature-Sliced Design](https://feature-sliced.design/) – FSD 아키텍처에 대한 자세한 설명과 사례를 확인할 수 있습니다.

---
