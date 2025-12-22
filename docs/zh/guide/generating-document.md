# 生成文档

在本页中，我们将学习如何使用`Tspec`生成OpenAPI规范并通过[Swagger UI](https://swagger.io/tools/swagger-ui/)提供服务。

## CLI使用方法

### **`generate`**

从TypeScript类型生成OpenAPI规范。

**使用方法**

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

::: details 选项

|选项|类型|描述|示例|
|-|-|-|-|
|`--specPathGlobs [path]`|string[]|要生成OpenAPI模式的TypeScript文件路径|`src/**/*.ts`|
|`--tsconfigPath [path]`|string|tsconfig路径|`./tsconfig.json`|
|`--configPath [path]`|string|Tspec配置文件路径|`./tspec.config.json`|
|`--outputPath [path]`|string|输出OpenAPI模式路径|`./generate/openapi.yaml`|
|`--specVersion [version]`|number|OpenAPI模式版本（目前仅支持3）|`3`|
|`--openapiTitle [title]`|string|OpenAPI模式的`title`属性|`Tspec`|
|`--openapiVersion [version]`|string|OpenAPI模式的`version`属性|`1.0.0`|
|`--openapiDescription [description]`|string|OpenAPI模式的`description`属性|`This is Tspec API`|
|`--debug [true / false]`|boolean|打印Tspec调试信息|`false`|
|`--ignoreErrors [true / false]`|boolean|是否忽略Tspec错误|`false`|
|`--nestjs [true / false]`|boolean|从NestJS控制器生成（使用`specPathGlobs`作为控制器文件）|`false`|
:::

### **`server`**

启动Tspec服务器，使用Swagger UI显示OpenAPI规范。

**使用方法**

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

::: details 选项

**您也可以使用[`generate`](#generate)命令的CLI选项。**

|选项|类型|描述|示例|
|-|-|-|-|
|`--port [port]`|number|指定Tspec服务器端口号|`7080`|
|`--proxyHost [host]`|string|指定Tspec服务器代理主机|`https://tspec.org`|

:::

### 配置文件

您也可以为`generate`和`server`命令使用配置文件。

在项目根目录创建`tspec.config.json`。

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

配置文件的类型是`Tspec.GenerateParams`




## 编程式使用

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
  nestjs: false, // NestJS模式设置为true（使用specPathGlobs作为控制器文件）
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

