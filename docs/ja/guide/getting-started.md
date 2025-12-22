---
outline: deep
---

# はじめる

このページでは、tspecを使用してTypeScript型から[OpenAPI Specification](https://swagger.io/specification/)を生成し、[Swagger UI](https://swagger.io/tools/swagger-ui/)で提供する方法を学びます。


## インストール

[Node.js](https://nodejs.org/en/)と[TypeScript](https://www.typescriptlang.org/)がインストールされていることを前提に、新しいTypeScriptプロジェクトを作成します：

```bash
mkdir my-project
cd my-project
```

次に、`tsconfig.json`を初期化します：

```bash
tsc --init
```

`package.json`を初期化し、tspecをインストールします：

::: code-group
```bash [yarn]
yarn init -y
yarn add tspec
```

```bash [npm]
npm init -y
npm install tspec
```

```bash [pnpm]
pnpm init -y
pnpm add tspec
```
:::

## ApiSpecの定義

Tspecはフレームワークに応じて複数の方法でAPI仕様を定義できます。

::: code-group
```ts [基本]
import { Tspec } from "tspec";

/** JSDocで定義されたスキーマ説明 */
interface Book {
  /** JSDocで定義されたフィールド説明 */
  id: number;
  title: string;
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: 'IDで本を取得',
        path: { id: number },
        responses: { 200: Book },
      },
    },
  }
}>;
```

```ts [Express]
import { Request, Response } from 'express';
import { Tspec } from 'tspec';

interface Book {
  id: number;
  title: string;
}

// 型付きパラメータでExpressハンドラーを定義
export const getBook = async (
  req: Request<{ id: string }>,
  res: Response<Book>,
) => {
  res.json({ id: Number(req.params.id), title: 'Book Title' });
};

// handler型を使用してパラメータとレスポンスを自動生成
export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: 'IDで本を取得',
        handler: typeof getBook,
      },
    },
  },
}>;
```

```ts [NestJS]
import { Controller, Get, Param } from '@nestjs/common';

interface Book {
  id: number;
  title: string;
}

/**
 * Books APIコントローラー
 */
@Controller('books')
export class BooksController {
  /**
   * IDで単一の本を取得
   * @summary IDで本を取得
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return Promise.resolve({ id: Number(id), title: 'Book Title' });
  }
}

// ApiSpecを手動で定義する必要なし！
// `tspec generate --nestjs`でOpenAPI仕様を生成
```
:::

## OpenAPI仕様の生成

OpenAPI仕様を生成します：

::: code-group
```bash [基本 / Express]
npx tspec generate --outputPath openapi.json
```

```bash [NestJS]
npx tspec generate --nestjs --outputPath openapi.json
```
:::

::: tip
- **基本 / Express**: Tspecは`**/*.ts`にマッチするすべてのファイルから`Tspec.DefineApiSpec`を自動的に解析します。
- **NestJS**: `--nestjs`フラグを使用してコントローラーを直接解析します。デフォルトのglobは`src/**/*.controller.ts`です。
- 詳細は[Express連携](/ja/guide/express-integration)と[NestJS連携](/ja/guide/nestjs-integration)を参照してください。
:::

:::details 生成されたOpenAPI仕様
（読みやすさのため、生成されたOpenAPI仕様はyaml形式で表示されます）

```yaml{6,27}
openapi: 3.0.3
info:
  title: Tspec API
  version: 0.0.1
paths:
  /books/{id}:
    get:
      operationId: BookApiSpec_get_/books/{id}
      tags:
        - Book
      summary: IDで本を取得
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: number
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
components:
  schemas:
    Book:
      description: JSDocで定義されたスキーマ説明
      type: object
      properties:
        id:
          description: JSDocで定義されたフィールド説明
          type: number
        title:
          type: string
        description:
          type: string
      required:
        - id
        - title
```
:::

## OpenAPI仕様の提供

[Swagger UI](https://swagger.io/tools/swagger-ui/)でOpenAPI仕様を提供します：

::: code-group
```bash [yarn]
yarn tspec server --port 3000
```

```bash [npm]
npx tspec server --port 3000
```

```bash [pnpm]
pnpm tspec server --port 3000
```
:::

ブラウザで`http://localhost:3000/docs`を開きます。

Swagger UIページが表示されます：

![Swagger UI API](/assets/images/getting-started-swagger-ui-1.png)

`Schemas`タブでスキーマ定義を確認できます。

![Swagger UI Schema](/assets/images/getting-started-swagger-ui-2.png)
