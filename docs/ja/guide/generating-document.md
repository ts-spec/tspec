# ドキュメント生成

このページでは、`Tspec`を使用してOpenAPI仕様を生成し、[Swagger UI](https://swagger.io/tools/swagger-ui/)で提供する方法を学びます。

## CLI使用法

### **`generate`**

TypeScript型からOpenAPI仕様を生成します。

**使用法**

::: code-group
```bash [yarn]
yarn tspec generate [options]
```

```bash [npm]
npx tspec generate [options]
```

```bash [pnpm]
pnpx tspec generate [options]
```
:::

::: details オプション

|オプション|型|説明|例|
|-|-|-|-|
|`--specPathGlobs [path]`|string[]|OpenAPIスキーマを生成するTypeScriptファイルのパス|`src/**/*.ts`|
|`--tsconfigPath [path]`|string|tsconfigのパス|`./tsconfig.json`|
|`--configPath [path]`|string|Tspec設定ファイルのパス|`./tspec.config.json`|
|`--outputPath [path]`|string|出力OpenAPIスキーマのパス|`./generate/openapi.yaml`|
|`--specVersion [version]`|number|OpenAPIスキーマのバージョン（現在3のみサポート）|`3`|
|`--openapiTitle [title]`|string|OpenAPIスキーマの`title`プロパティ|`Tspec`|
|`--openapiVersion [version]`|string|OpenAPIスキーマの`version`プロパティ|`1.0.0`|
|`--openapiDescription [description]`|string|OpenAPIスキーマの`description`プロパティ|`This is Tspec API`|
|`--debug [true / false]`|boolean|Tspecのデバッグ情報を出力|`false`|
|`--ignoreErrors [true / false]`|boolean|Tspecのエラーを無視するかどうか|`false`|
|`--nestjs [true / false]`|boolean|NestJSコントローラーから生成（`specPathGlobs`をコントローラーファイルに使用）|`false`|
:::

### **`server`**

Swagger UIでOpenAPI仕様を表示するTspecサーバーを起動します。

**使用法**

::: code-group
```bash [yarn]
yarn tspec server [options]
```

```bash [npm]
npx tspec server [options]
```

```bash [pnpm]
pnpx tspec server [options]
```
:::

::: details オプション

**[`generate`](#generate)コマンドのCLIオプションも使用できます。**

|オプション|型|説明|例|
|-|-|-|-|
|`--port [port]`|number|Tspecサーバーのポート番号を指定|`7080`|
|`--proxyHost [host]`|string|Tspecサーバーのプロキシホストを指定|`https://tspec.org`|

:::

### 設定ファイル

`generate`と`server`コマンドに設定ファイルを使用することもできます。

プロジェクトルートディレクトリに`tspec.config.json`を作成します。

```json
{
  "specPathGlobs": ["src/**/*.ts"],
  "tsconfigPath": "./tsconfig.json",
  "outputPath": "./generate/openapi.json",
  "specVersion": 3,
  "openapi": {
    "title": "Tspec API",
    "version": "0.0.1",
    "description": "This is Tspec API",
    "securityDefinitions": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "servers": [
      {
        "url": "https://api.example.com",
        "description": "Production server"
      }
    ]
  },
  "debug": false,
  "ignoreErrors": true,
  "nestjs": false
}
```

設定ファイルの型は`Tspec.GenerateParams`です。




## プログラマティック使用法

### **`generate`**


```ts
import { generateTspec, Tspec } from 'tspec';

const options: Tspec.GenerateParams = {
  specPathGlobs: ['src/**/*.ts'],
  tsconfigPath: './tsconfig.json',
  configPath: './tspec.config.json',
  outputPath: './generate/openapi.json',
  specVersion: 3,
  openapi: {
    title: 'Tspec API',
    version: '0.0.1',
    description: 'This is Tspec API',
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    servers: [
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
    ],
  },
  debug: false,
  ignoreErrors: true,
  nestjs: false, // NestJSモードはtrueに設定（specPathGlobsをコントローラーファイルに使用）
};

const openApiSpec = await generateTspec(options);
```


### **`server`**

```ts
import { initTspecServer, Tspec } from 'tspec';

const options: Tspec.InitTspecServerOptions = {
  specPathGlobs: ['src/**/*.ts'],
  tsconfigPath: './tsconfig.json',
  configPath: './tspec.config.json',
  outputPath: './generate/openapi.json',
  specVersion: 3,
  openapi: {
    title: 'Tspec API',
    version: '0.0.1',
    description: 'This is Tspec API',
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    servers: [
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
    ],
  },
  debug: false,
  ignoreErrors: true,
  port: 3000,
  proxyHost: 'https://tspec.org',
};

initTspecServer(options);
```

