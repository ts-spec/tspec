---
outline: deep
---

# はじめに

## 概要

Tspecは[TypeScript](https://www.typescriptlang.org/)型からAPIドキュメントを生成するライブラリです。

TypeScript型を自動的に解析し、最新の[OpenAPI Specification](https://swagger.io/specification/)を生成し、美しい[Swagger UI](https://swagger.io/tools/swagger-ui/)で提供します。


## なぜTspecなのか？

- **Code First**: TypeScript型とJSDocに基づいてOpenAPI Specificationを生成します。
- **学習が簡単**: 新しいOpenAPI仕様の構文を学ぶ必要はありません。TypeScript型を使用するだけです。
- **使いやすい**: 数行のコードでOpenAPI Specificationを生成できます。
- **柔軟性**: 好きなフレームワークを使用できます。フレームワーク固有の制約はありません。
- **すぐに動作**: CommonJSとESMをすぐにサポート。トランスパイラ（ts-node、babel、swc）は不要です。
