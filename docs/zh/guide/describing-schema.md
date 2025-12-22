# 定义模式

在本页中，我们将学习如何使用[JSDoc](https://jsdoc.app/about-getting-started.html)注释定义模式。

## 描述

您可以使用JSDoc注释描述模式。

```ts{1,3,5}
/** Book模式信息 */
interface Book {
  /** 书籍ID */
  id: number;
  /** 书籍标题 */
  title: string;
}
```

:::details 生成的OpenAPI规范
```yaml{4,9,12}
components:
  schemas:
    Book:
      description: Book模式信息
      type: object
      properties:
        id:
          type: number
          description: 书籍ID
        title:
          type: string
          description: 书籍标题
      required:
        - id
        - title
```
:::

## 示例

如果要向模式添加示例，可以使用`@example`标签。

```ts{4,9}
interface Book {
  /**
   * 书籍ID
   * @example 123456789
   * */
  id: number;
  /**
   * 书籍标题
   * @example 了不起的盖茨比
   */
  title: string;
}
```

:::details 生成的OpenAPI规范

```yaml{9,13}
components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: number
          description: 书籍ID
          example: 123456789
        title:
          type: string
          description: 书籍标题
          example: 了不起的盖茨比
      required:
        - id
        - title
```
:::

## 格式

如果要指定模式的格式，可以使用Tspec提供的实用类型。

```ts{4,5,6}
import { Tspec } from 'tspec';

interface Book {
  id: Tspec.Integer;
  coverImage: Tspec.ImageUriString;
  publishedAt: Tspec.DateTimeString;
}
``` 

:::details 生成的OpenAPI规范
```yaml{7-8,10-12,14-16}
components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: integer
          example: 1
        coverImage:
          format: uri
          type: string
          example: https://picsum.photos/200/300
        publishedAt:
          format: date-time
          type: string
          example: '2023-03-30T12:00:00Z'
      additionalProperties: false
      required:
      - coverImage
      - id
      - publishedAt
```
:::

Tspec提供的实用类型如下。

| 类型 | 描述 |
| --- | --- |
| `Tspec.Integer` | 整数 |
| `Tspec.DateString` | 日期字符串（例如：`2021-01-01`） |
| `Tspec.DateTimeString` | 日期时间字符串（例如：`2021-01-01T00:00:00Z`） |
| `Tspec.PasswordString` | 密码字符串（例如：`password`） |
| `Tspec.ByteString` | 字节字符串（例如：`dGVzdA==`） |
| `Tspec.BinaryString` | 二进制字符串（例如：`0x1234`） |
| `Tspec.BinaryStringArray` | 二进制字符串数组（例如：`[0x1234, 0x5678]`） |
| `Tspec.EmailString` | 电子邮件字符串（例如：`test@test.com`） |
| `Tspec.UuidString` | UUID字符串（例如：`123e4567-e89b-12d3-a456-426614174000`） |
| `Tspec.UrlString` | URL字符串（例如：`http://localhost`） |
| `Tspec.ImageUriString` | 图片URI字符串（例如：`https://picsum.photos/200/300`） |
| `Tspec.HostnameString` | 主机名字符串（例如：`localhost`） |
| `Tspec.Ipv4String` | IPv4字符串（例如：`127.0.0.1`） |
| `Tspec.Ipv6String` | IPv6字符串（例如：`::1`） |
| `Tspec.JsonPointerString` | JSON Pointer字符串（例如：`/`） |

