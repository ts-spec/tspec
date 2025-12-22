---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tspec"
  text: "타입 기반\nAPI 문서화"
  tagline: TypeScript 타입 기반으로 REST API 문서를 자동 생성합니다
  actions:
    - theme: brand
      text: 시작하기
      link: /ko/guide/getting-started
    - theme: alt
      text: GitHub에서 보기 ⭐️
      link: https://github.com/ts-spec/tspec

features:
  - title: 타입 기반 OpenAPI
    icon: 📝
    details: TypeScript 타입을 자동으로 파싱하여 최신 OpenAPI 스펙을 생성합니다.
    link: /ko/guide/defining-api-spec
    linkText: 자세히 보기
  - title: 제로 설정
    icon: ⚡️
    details: Tspec은 별도의 설정 없이 바로 사용할 수 있도록 설계되었습니다.
    link: /ko/guide/getting-started
    linkText: 시작하기
  - title: Swagger UI 통합
    icon: 💎
    details: Swagger UI를 통합하여 아름답고 인터랙티브한 API 문서를 제공합니다.
    link: /ko/guide/generating-document
    linkText: 자세히 보기
  - title: 호환성
    icon: ✅
    details: CommonJS와 ESM 모두 지원합니다. ts-node, babel, swc 없이 순수 TypeScript로 동작합니다.
    link: /ko/guide/getting-started
    linkText: 시작하기
  - title: Express 연동
    icon: 🚂
    details: Tspec 타입 정의를 사용하여 Express.js와 원활하게 통합됩니다.
    link: /ko/guide/express-integration
    linkText: 자세히 보기
  - title: NestJS 연동
    icon: 🐱
    details: --nestjs 플래그로 NestJS 컨트롤러에서 직접 OpenAPI 스펙을 생성합니다.
    link: /ko/guide/nestjs-integration
    linkText: 자세히 보기
---

