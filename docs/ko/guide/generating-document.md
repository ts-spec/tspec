# 문서 생성

이 페이지에서는 `Tspec`을 사용하여 OpenAPI 스펙을 생성하고 [Swagger UI](https://swagger.io/tools/swagger-ui/)로 제공하는 방법을 알아봅니다.

## CLI 사용법

### **`generate`**

TypeScript 타입으로부터 OpenAPI 스펙을 생성합니다.

**사용법**

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

::: details 옵션

|옵션|타입|설명|예시|
|-|-|-|-|
|`--specPathGlobs [path]`|string[]|OpenAPI 스키마를 생성할 TypeScript 파일 경로|`src/**/*.ts`|
|`--tsconfigPath [path]`|string|tsconfig 경로|`./tsconfig.json`|
|`--configPath [path]`|string|Tspec 설정 파일 경로|`./tspec.config.json`|
|`--outputPath [path]`|string|출력 OpenAPI 스키마 경로|`./generate/openapi.yaml`|
|`--specVersion [version]`|number|OpenAPI 스키마 버전 (현재 3만 지원)|`3`|
|`--openapiTitle [title]`|string|OpenAPI 스키마의 `title` 속성|`Tspec`|
|`--openapiVersion [version]`|string|OpenAPI 스키마의 `version` 속성|`1.0.0`|
|`--openapiDescription [description]`|string|OpenAPI 스키마의 `description` 속성|`This is Tspec API`|
|`--debug [true / false]`|boolean|Tspec 디버그 정보 출력|`false`|
|`--ignoreErrors [true / false]`|boolean|Tspec 오류 무시 여부|`false`|
|`--nestjs [true / false]`|boolean|NestJS 컨트롤러에서 생성 (`specPathGlobs`를 컨트롤러 파일에 사용)|`false`|
:::

### **`server`**

Swagger UI로 OpenAPI 스펙을 표시하는 Tspec 서버를 시작합니다.

**사용법**

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

::: details 옵션

**[`generate`](#generate) 명령어의 CLI 옵션도 사용할 수 있습니다.**

|옵션|타입|설명|예시|
|-|-|-|-|
|`--port [port]`|number|Tspec 서버 포트 번호 지정|`7080`|
|`--proxyHost [host]`|string|Tspec 서버 프록시 호스트 지정|`https://tspec.org`|

:::

### 설정 파일

`generate`와 `server` 명령어에 설정 파일을 사용할 수도 있습니다.

프로젝트 루트 디렉토리에 `tspec.config.json`을 생성합니다.

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

설정 파일의 타입은 `Tspec.GenerateParams`입니다.




## 프로그래매틱 사용법

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
  nestjs: false, // NestJS 모드는 true로 설정 (specPathGlobs를 컨트롤러 파일에 사용)
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

