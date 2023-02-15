import ts from "typescript";
import fs from 'fs';

import { mockSpec } from "./fixtures/openapiTest";
import { extract } from "./extractor";
import { generateOpenApiSpec } from "./openapi";

const FILE_NAME = "./fixtures/testHard.ts";

const program = ts.createProgram([FILE_NAME], {});

extract(program);

const openApiSpec = generateOpenApiSpec([mockSpec], {
  components: {
    securitySchemes: {
      JWT: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
});
fs.writeFileSync("openapi.json", JSON.stringify(openApiSpec, undefined, 2));
