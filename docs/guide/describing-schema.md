# Defining Schema

On this page, we will learn how to define schemas with JSDoc comments.

## Description

You can describe the schema with JSDoc comments.

```ts{1,3,5}
/** Book schema Info */
interface Book {
  /** Book ID */
  id: number;
  /** Title of the book */
  title: string;
}
```

The schemas in the generated OpenAPI Spec are described as follows:

```yaml{4,9,12}
components:
  schemas:
    Book:
      description: Book schema Info
      type: object
      properties:
        id:
          type: number
          description: Book ID
        title:
          type: string
          description: Title of the book
      required:
        - id
        - title
```

## Example

If you want to add an example to the schema, you can use the `@example` tag.

```ts{4,9}
interface Book {
  /**
   * Book ID
   * @example 123456789
   * */
  id: number;
  /**
   * Title of the book
   * @example The Great Gatsby
   */
  title: string;
}
```

The schemas in the generated OpenAPI Spec are described as follows:

```yaml{9,13}
components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: number
          description: Book ID
          example: 123456789
        title:
          type: string
          description: Title of the book
          example: The Great Gatsby
      required:
        - id
        - title
```

## Format

If you want to specify the format of the schema, you can use the utility types provided by Tspec.

```ts{4,5,6}
import { Tspec } from 'tspec';

interface Book {
  id: Tspec.Integer;
  coverImage: Tspec.ImageUriString;
  publishedAt: Tspec.DateTimeString;
}
``` 

The schemas in the generated OpenAPI Spec are described as follows:

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

The following utility types are provided by Tspec.

| Type | Description |
| --- | --- |
| `Tspec.Integer` | Integer |
| `Tspec.DateString` | Date string (e.g. `2021-01-01`) |
| `Tspec.DateTimeString` | Date and time string (e.g. `2021-01-01T00:00:00Z`) |
| `Tspec.PasswordString` | Password string (e.g. `password`) |
| `Tspec.ByteString` | Byte string (e.g. `dGVzdA==`) |
| `Tspec.BinaryString` | Binary string (e.g. `0x1234`) |
| `Tspec.EmailString` | Email string (e.g. `test@test.com`) |
| `Tspec.UuidString` | UUID string (e.g. `123e4567-e89b-12d3-a456-426614174000`) |
| `Tspec.UrlString` | URL string (e.g. `http://localhost`) |
| `Tspec.ImageUriString` | Image URI string (e.g. `https://picsum.photos/200/300`) |
| `Tspec.HostnameString` | Hostname string (e.g. `localhost`) |
| `Tspec.Ipv4String` | IPv4 string (e.g. `127.0.0.1`) |
| `Tspec.Ipv6String` | IPv6 string (e.g. `::1`) |
| `Tspec.JsonPointerString` | JSON Pointer string (e.g. `/`) |

