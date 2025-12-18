---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tspec"
  text: "Type-driven\nAPI Documentation"
  tagline: Auto-generating REST API document based on TypeScript types
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub ⭐️
      link: https://github.com/ts-spec/tspec

features:
  - title: Type-driven OpenAPI
    icon: 📝
    details: Automatically parses your TypeScript types and generates up-to-date OpenAPI specification.
    link: /guide/defining-api-spec
    linkText: Learn more
  - title: Swagger UI Integration
    icon: 💎
    details: Tspec integrates Swagger UI to provide a beautiful and interactive API documentation.
    link: /guide/generating-document
    linkText: Learn more
  - title: Express Integration
    icon: 🚂
    details: Seamlessly integrate with Express.js using Tspec type definitions.
    link: /guide/express-integration
    linkText: Learn more
  - title: NestJS Integration
    icon: 🐱
    details: Generate OpenAPI spec directly from NestJS controllers with --nestjs flag.
    link: /guide/nestjs-integration
    linkText: Learn more
---

