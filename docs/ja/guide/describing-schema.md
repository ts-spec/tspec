# スキーマ定義

このページでは、[JSDoc](https://jsdoc.app/about-getting-started.html)コメントでスキーマを定義する方法を学びます。

## 説明

JSDocコメントでスキーマを説明できます。

```ts{1,3,5}
/** Bookスキーマ情報 */
interface Book {
  /** 本のID */
  id: number;
  /** 本のタイトル */
  title: string;
}
```

:::details 生成されたOpenAPI仕様
```yaml{4,9,12}
components:
  schemas:
    Book:
      description: Bookスキーマ情報
      type: object
      properties:
        id:
          type: number
          description: 本のID
        title:
          type: string
          description: 本のタイトル
      required:
        - id
        - title
```
:::

## 例

スキーマに例を追加するには、`@example`タグを使用できます。

```ts{4,9}
interface Book {
  /**
   * 本のID
   * @example 123456789
   * */
  id: number;
  /**
   * 本のタイトル
   * @example グレート・ギャツビー
   */
  title: string;
}
```

:::details 生成されたOpenAPI仕様

```yaml{9,13}
components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: number
          description: 本のID
          example: 123456789
        title:
          type: string
          description: 本のタイトル
          example: グレート・ギャツビー
      required:
        - id
        - title
```
:::

## フォーマット

スキーマのフォーマットを指定するには、Tspecが提供するユーティリティ型を使用できます。

```ts{4,5,6}
import { Tspec } from 'tspec';

interface Book {
  id: Tspec.Integer;
  coverImage: Tspec.ImageUriString;
  publishedAt: Tspec.DateTimeString;
}
``` 

:::details 生成されたOpenAPI仕様
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

Tspecが提供するユーティリティ型は以下の通りです。

| 型 | 説明 |
| --- | --- |
| `Tspec.Integer` | 整数 |
| `Tspec.DateString` | 日付文字列（例：`2021-01-01`） |
| `Tspec.DateTimeString` | 日付時刻文字列（例：`2021-01-01T00:00:00Z`） |
| `Tspec.PasswordString` | パスワード文字列（例：`password`） |
| `Tspec.ByteString` | バイト文字列（例：`dGVzdA==`） |
| `Tspec.BinaryString` | バイナリ文字列（例：`0x1234`） |
| `Tspec.BinaryStringArray` | バイナリ文字列配列（例：`[0x1234, 0x5678]`） |
| `Tspec.EmailString` | メール文字列（例：`test@test.com`） |
| `Tspec.UuidString` | UUID文字列（例：`123e4567-e89b-12d3-a456-426614174000`） |
| `Tspec.UrlString` | URL文字列（例：`http://localhost`） |
| `Tspec.ImageUriString` | 画像URI文字列（例：`https://picsum.photos/200/300`） |
| `Tspec.HostnameString` | ホスト名文字列（例：`localhost`） |
| `Tspec.Ipv4String` | IPv4文字列（例：`127.0.0.1`） |
| `Tspec.Ipv6String` | IPv6文字列（例：`::1`） |
| `Tspec.JsonPointerString` | JSON Pointer文字列（例：`/`） |

