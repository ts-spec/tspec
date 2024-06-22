# Generating Document

On this page, we will learn how to generate OpenAPI Spec and serve it with [Swagger UI](https://swagger.io/tools/swagger-ui/) using `Tspec`.

## CLI Usage

### **`generate`**

Generate OpenAPI Spec from TypeScript types.

**Usage**

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

::: details options

|Option|Type|Description|Example|
|-|-|-|-|
|`--specPathGlobs [path]`|string[]|Path of TypeScript files which you want to generate OpenAPI schema|`src/**/*.ts`|
|`--tsconfigPath [path]`|string|Path of tsconfig|`./tsconfig.json`|
|`--outputPath [path]`|string|Path of output OpenAPI schema|`./generate/openapi.yaml`|
|`--specVersion [version]`|number|Version to use for OpenAPI schema (Currently supports only 3)|`3`|
|`--openapiTitle [title]`|string|`title` property of OpenAPI schema|`Tspec`|
|`--openapiVersion [version]`|string|`version` property of OpenAPI schema|`1.0.0`|
|`--openapiDescription [description]`|string|`description` property of OpenAPI schema|`This is Tspec API`|
|`--debug [true / false]`|boolean|Print debug information for Tspec|`false`|
|`--ignoreErrors [true / false]`|boolean|Whether ignore errors in Tspec or not|`false`|
:::

### **`server`**

Start Tspec server for display OpenAPI Spec with Swagger UI.

**Usage**

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

::: details options

**You can also use the CLI options for [`generate`](#generate) command.**

|Option|Type|Description|Example|
|-|-|-|-|
|`--port [port]`|number|Specify port number for Tspec server|`7080`|
|`--proxyHost [host]`|string|Specify proxy host for Tspec server|`https://tspec.org`|

:::

### Configuration file

You can also use configuration file for `generate` and `server` command.

Create `tspec.config.json` in your project root directory.

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
  },
  "debug": false,
  "ignoreErrors": true,
}
```

The type of configuration file is `Tspec.GenerateParams`




## Programmatic Usage

### **`generate`**


```ts
import { generateTspec, Tspec } from 'tspec';

const options: Tspec.GenerateParams = {
  specPathGlobs: ['src/**/*.ts'],
  tsconfigPath: './tsconfig.json',
  outputPath: './generate/openapi.json',
  specVersion: 3,
  openapi: {
    title: 'Tspec API',
    version: '0.0.1',
    description: "This is Tspec API",
  },
  debug: false,
  ignoreErrors: true,
};

const openApiSpec = await generateTspec(options);
```


### **`server`**

```ts
import { initTspecServer, Tspec } from 'tspec';

const options: Tspec.InitTspecServerOptions = {
  specPathGlobs: ['src/**/*.ts'],
  tsconfigPath: './tsconfig.json',
  outputPath: './generate/openapi.json',
  specVersion: 3,
  openapi: {
    title: 'Tspec API',
    version: '0.0.1',
    description: "This is Tspec API",
  },
  debug: false,
  ignoreErrors: true,
  port: 3000,
  proxyHost: 'https://tspec.org',
};

initTspecServer(options);
```

