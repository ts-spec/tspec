---
outline: deep
---
# Command Line Interface

## Generation

### **`generate`**

Generate OpenAPI schema from TypeScript types.

#### Usage

```sh
generate [options]
```

#### Options

|Option|Type|Description|Example|
|-|-|-|-|
|`--specPathGlobs [path]`|string[]|Path of TypeScript files which you want to generate OpenAPI schema|`src/**/*.ts`|
|`--tsconfigPath [path]`|string|Path of tsconfig|`./tsconfig.json`|
|`--outputPath [path]`|string|Path of output OpenAPI schema|`./generate/openapi.yaml`|
|`--specVersion [version]`|number|Version to use for OpenAPI schema (Currently supports only 3)|`3`|
|`--openapiTitle [title]`|string|`title` property of OpenAPI schema|`Tspec`|
|`--openapiVersion [version]`|string|`version` property of OpenAPI schema|`1.0.0`|
|`--debug [true / false]`|boolean|Print debug information for Tspec|`false`|
|`--ignoreErrors [true / false]`|boolean|Whether ignore errors in Tspec or not|`false`|

## Server

### **`server`**

Start Tspec server for display OpenAPI schema with Swagger.

#### Usage

```sh
server [options]
```

#### Options

**You can also use the CLI options for [`generate`](#generate) command.**

|Option|Type|Description|Example|
|-|-|-|-|
|`--port [port]`|number|Specify port number for Tspec server|`7080`|
|`--proxyHost [host]`|string|Specify proxy host for Tspec server|`https://tspec.org`|
