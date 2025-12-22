---
outline: deep
---

# 快速开始

在本页中，我们将学习如何使用tspec从TypeScript类型生成[OpenAPI Specification](https://swagger.io/specification/)，并通过[Swagger UI](https://swagger.io/tools/swagger-ui/)提供服务。


## 安装

假设您已安装[Node.js](https://nodejs.org/en/)和[TypeScript](https://www.typescriptlang.org/)，创建一个新的TypeScript项目：

```bash
mkdir my-project
cd my-project
```

然后初始化`tsconfig.json`：

```bash
tsc --init
```

现在初始化`package.json`并安装tspec：

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

## 定义ApiSpec

Tspec支持根据您的框架以多种方式定义API规范。

::: code-group
```ts [基础]
import { Tspec } from "tspec";

/** 通过JSDoc定义的模式描述 */
interface Book {
  /** 通过JSDoc定义的字段描述 */
  id: number;
  title: string;
  description?: string;
}

export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: '通过ID获取书籍',
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

// 使用类型化参数定义Express处理程序
export const getBook = async (
  req: Request<{ id: string }>,
  res: Response<Book>,
) => {
  res.json({ id: Number(req.params.id), title: 'Book Title' });
};

// 使用handler类型自动生成参数和响应
export type BookApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/books/{id}': {
      get: {
        summary: '通过ID获取书籍',
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
 * Books API控制器
 */
@Controller('books')
export class BooksController {
  /**
   * 通过ID获取单本书籍
   * @summary 通过ID获取书籍
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return Promise.resolve({ id: Number(id), title: 'Book Title' });
  }
}

// 无需手动定义ApiSpec！
// 使用`tspec generate --nestjs`生成OpenAPI规范
```
:::

## 生成OpenAPI规范

现在生成OpenAPI规范：

::: code-group
```bash [基础 / Express]
npx tspec generate --outputPath openapi.json
```

```bash [NestJS]
npx tspec generate --nestjs --outputPath openapi.json
```
:::

::: tip
- **基础 / Express**: Tspec自动从匹配`**/*.ts`的所有文件中解析`Tspec.DefineApiSpec`。
- **NestJS**: 使用`--nestjs`标志直接解析控制器。默认glob为`src/**/*.controller.ts`。
- 更多详情请参阅[Express集成](/zh/guide/express-integration)和[NestJS集成](/zh/guide/nestjs-integration)。
:::

:::details 生成的OpenAPI规范
（为了可读性，生成的OpenAPI规范以yaml格式显示）

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
      summary: 通过ID获取书籍
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
      description: 通过JSDoc定义的模式描述
      type: object
      properties:
        id:
          description: 通过JSDoc定义的字段描述
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

## 提供OpenAPI规范

使用[Swagger UI](https://swagger.io/tools/swagger-ui/)提供OpenAPI规范：

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

然后在浏览器中打开`http://localhost:3000/docs`。

您将看到Swagger UI页面：

![Swagger UI API](/assets/images/getting-started-swagger-ui-1.png)

您可以在`Schemas`标签中查看模式定义。

![Swagger UI Schema](/assets/images/getting-started-swagger-ui-2.png)
