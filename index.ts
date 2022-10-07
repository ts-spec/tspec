import ts from "typescript";
import fs from 'fs';

import { mockSpec } from "./fixtures/openapiTest";
import { extract } from "./src/extractor";
import { generateOpenApiSpec } from "./src/openapi";

const FILE_NAME = "./fixtures/test.ts";

const program = ts.createProgram([FILE_NAME], {});

extract(program);

const openApiSpec = generateOpenApiSpec([mockSpec]);
fs.writeFileSync("openapi.json", JSON.stringify(openApiSpec, undefined, 2));
