---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tspec"
  text: "型駆動\nAPIドキュメント"
  tagline: TypeScript型に基づいてREST APIドキュメントを自動生成
  actions:
    - theme: brand
      text: はじめる
      link: /ja/guide/getting-started
    - theme: alt
      text: GitHubで見る ⭐️
      link: https://github.com/ts-spec/tspec

features:
  - title: 型駆動OpenAPI
    icon: 📝
    details: TypeScript型を自動的に解析し、最新のOpenAPI仕様を生成します。
    link: /ja/guide/defining-api-spec
    linkText: 詳しく見る
  - title: ゼロ設定
    icon: ⚡️
    details: Tspecは設定なしですぐに使用できるように設計されています。
    link: /ja/guide/getting-started
    linkText: はじめる
  - title: Swagger UI統合
    icon: 💎
    details: Swagger UIを統合し、美しくインタラクティブなAPIドキュメントを提供します。
    link: /ja/guide/generating-document
    linkText: 詳しく見る
  - title: 互換性
    icon: ✅
    details: CommonJSとESMの両方をサポート。ts-node、babel、swc不要。純粋なTypeScriptで動作。
    link: /ja/guide/getting-started
    linkText: はじめる
  - title: Express連携
    icon: 🚂
    details: Tspec型定義を使用してExpress.jsとシームレスに統合。
    link: /ja/guide/express-integration
    linkText: 詳しく見る
  - title: NestJS連携
    icon: 🐱
    details: --nestjsフラグでNestJSコントローラーから直接OpenAPI仕様を生成。
    link: /ja/guide/nestjs-integration
    linkText: 詳しく見る
---

