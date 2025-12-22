# 스키마 정의

이 페이지에서는 [JSDoc](https://jsdoc.app/about-getting-started.html) 주석으로 스키마를 정의하는 방법을 알아봅니다.

## 설명

JSDoc 주석으로 스키마를 설명할 수 있습니다.

```ts{1,3,5}
/** Book 스키마 정보 */
interface Book {
  /** 책 ID */
  id: number;
  /** 책 제목 */
  title: string;
}
```

:::details 생성된 OpenAPI 스펙
```yaml{4,9,12}
components:
  schemas:
    Book:
      description: Book 스키마 정보
      type: object
      properties:
        id:
          type: number
          description: 책 ID
        title:
          type: string
          description: 책 제목
      required:
        - id
        - title
```
:::

## 예시

스키마에 예시를 추가하려면 `@example` 태그를 사용할 수 있습니다.

```ts{4,9}
interface Book {
  /**
   * 책 ID
   * @example 123456789
   * */
  id: number;
  /**
   * 책 제목
   * @example 위대한 개츠비
   */
  title: string;
}
```

:::details 생성된 OpenAPI 스펙

```yaml{9,13}
components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: number
          description: 책 ID
          example: 123456789
        title:
          type: string
          description: 책 제목
          example: 위대한 개츠비
      required:
        - id
        - title
```
:::

## 포맷

스키마의 포맷을 지정하려면 Tspec에서 제공하는 유틸리티 타입을 사용할 수 있습니다.

```ts{4,5,6}
import { Tspec } from 'tspec';

interface Book {
  id: Tspec.Integer;
  coverImage: Tspec.ImageUriString;
  publishedAt: Tspec.DateTimeString;
}
``` 

:::details 생성된 OpenAPI 스펙
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

Tspec에서 제공하는 유틸리티 타입은 다음과 같습니다.

| 타입 | 설명 |
| --- | --- |
| `Tspec.Integer` | 정수 |
| `Tspec.DateString` | 날짜 문자열 (예: `2021-01-01`) |
| `Tspec.DateTimeString` | 날짜 및 시간 문자열 (예: `2021-01-01T00:00:00Z`) |
| `Tspec.PasswordString` | 비밀번호 문자열 (예: `password`) |
| `Tspec.ByteString` | 바이트 문자열 (예: `dGVzdA==`) |
| `Tspec.BinaryString` | 바이너리 문자열 (예: `0x1234`) |
| `Tspec.BinaryStringArray` | 바이너리 문자열 배열 (예: `[0x1234, 0x5678]`) |
| `Tspec.EmailString` | 이메일 문자열 (예: `test@test.com`) |
| `Tspec.UuidString` | UUID 문자열 (예: `123e4567-e89b-12d3-a456-426614174000`) |
| `Tspec.UrlString` | URL 문자열 (예: `http://localhost`) |
| `Tspec.ImageUriString` | 이미지 URI 문자열 (예: `https://picsum.photos/200/300`) |
| `Tspec.HostnameString` | 호스트명 문자열 (예: `localhost`) |
| `Tspec.Ipv4String` | IPv4 문자열 (예: `127.0.0.1`) |
| `Tspec.Ipv6String` | IPv6 문자열 (예: `::1`) |
| `Tspec.JsonPointerString` | JSON Pointer 문자열 (예: `/`) |

