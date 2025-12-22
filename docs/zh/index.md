---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tspec"
  text: "类型驱动\nAPI文档"
  tagline: 基于TypeScript类型自动生成REST API文档
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 在GitHub上查看 ⭐️
      link: https://github.com/ts-spec/tspec

features:
  - title: 类型驱动OpenAPI
    icon: 📝
    details: 自动解析TypeScript类型，生成最新的OpenAPI规范。
    link: /zh/guide/defining-api-spec
    linkText: 了解更多
  - title: 零配置
    icon: ⚡️
    details: Tspec设计为零配置，开箱即用。
    link: /zh/guide/getting-started
    linkText: 快速开始
  - title: Swagger UI集成
    icon: 💎
    details: 集成Swagger UI，提供美观且交互式的API文档。
    link: /zh/guide/generating-document
    linkText: 了解更多
  - title: 兼容性
    icon: ✅
    details: 同时支持CommonJS和ESM。无需ts-node、babel、swc。纯TypeScript运行。
    link: /zh/guide/getting-started
    linkText: 快速开始
  - title: Express集成
    icon: 🚂
    details: 使用Tspec类型定义与Express.js无缝集成。
    link: /zh/guide/express-integration
    linkText: 了解更多
  - title: NestJS集成
    icon: 🐱
    details: 使用--nestjs标志直接从NestJS控制器生成OpenAPI规范。
    link: /zh/guide/nestjs-integration
    linkText: 了解更多
---

