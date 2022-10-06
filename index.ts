import ts from "typescript";
import { extract } from "./src/extractor";

const FILE_NAME = "./fixtures/test.ts";

const program = ts.createProgram([FILE_NAME], {});

extract(program);
