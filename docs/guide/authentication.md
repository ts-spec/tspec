# Authentication

Tspec supports the authentication in the [Swagger UI](https://swagger.io/tools/swagger-ui/).

Swagger UI provides the `Authorize` button to authenticate the user.

On this page, we will learn how to use authentication in Tspec.

## Defining security scheme

To use authentication in Tspec, you need to define `securityDefinitions` in the `Tspec.GenerateParams`.

The `securityDefinitions` is same as the [securityDefinitions](https://swagger.io/docs/specification/authentication/) in the OpenAPI spec.

::: code-group
```ts[index.ts]{3}
const tspecParams: Tspec.GenerateParams = {
  openapi: {
    securityDefinitions: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
```
:::

Then, you can use the `security` property in the `Tspec.DefineApiSpec` to specify the security scheme for the API:

::: code-group
```ts[index.ts]{2}
export type UserApiSpec = Tspec.DefineApiSpec<{
  security: 'jwt',
  paths: {
    '/my': {
      get: {
        summary: 'Get my info',
        handler: typeof getMyInfo
      },
    },
  }
}>;
```
:::

And that's it! Now, you can see the `Authorize` button in the Swagger UI:

![Authorize button](/assets/images/authorize-button.png)

If you click the button, you can see the `Authorization` popup:

![Authorization popup](/assets/images/authorization-popup.png)

You can enter the JWT token in the popup and click the `Authorize` button to authenticate the user.

And if you send the request, you can see the `Authorization` header in the request:

![Authorization request](/assets/images/authorization-request.png)
