#!/usr/bin/env node
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line import/no-extraneous-dependencies
import yargs from 'yargs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hideBin } from 'yargs/helpers';

import { Tspec } from 'types/tspec';

import { defaultGenerateParams as defaultArgs, generateTspec } from '../generator';
import { initTspecServer } from '../server';

enum SupportedSpecVersion {
  THREE = 3,
}

interface GeneratorOptions {
  specPathGlobs: (string | number)[],
  tsconfigPath: string,
  configPath?: string,
  outputPath?: string,
  specVersion?: SupportedSpecVersion,
  openapiTitle?: string,
  openapiVersion?: string,
  debug?: boolean,
  ignoreErrors?: boolean,
}

interface RunServerOptions extends GeneratorOptions {
  port?: number,
  proxyHost?: string,
}

const baseOptions = {
  specPathGlobs: { type: 'array', default: defaultArgs.specPathGlobs },
  tsconfigPath: { type: 'string', default: defaultArgs.tsconfigPath },
  configPath: { type: 'string', default: defaultArgs.configPath },
  outputPath: { type: 'string' },
  specVersion: { type: 'number' },
  openapiTitle: { type: 'string', default: defaultArgs.openapi.title },
  openapiVersion: { type: 'string', default: defaultArgs.openapi.version },
  debug: { type: 'boolean', default: defaultArgs.debug },
  ignoreErrors: { type: 'boolean', default: defaultArgs.ignoreErrors },
} as const;

const generatorOptions = {
  ...baseOptions,
  outputPath: { type: 'string', default: 'openapi.json' },
} as const;

const runServerOptions = {
  ...baseOptions,
  port: { type: 'number', default: 7000 },
  proxyHost: { type: 'string' },
} as const;

const validateGeneratorOptions = (args: GeneratorOptions): Tspec.GenerateParams => {
  if (args.specVersion && !Object.values(SupportedSpecVersion).includes(args.specVersion)) {
    // eslint-disable-next-line max-len
    throw new Error(`Tspec currently supports only OpenAPI Spec with version ${Object.values(SupportedSpecVersion).join(', ')}.`);
  }

  return {
    specPathGlobs: args.specPathGlobs !== defaultArgs.specPathGlobs
      ? args.specPathGlobs.map((glob) => glob.toString())
      : undefined,
    tsconfigPath: args.tsconfigPath !== defaultArgs.tsconfigPath ? args.tsconfigPath : undefined,
    configPath: args.configPath !== defaultArgs.configPath ? args.configPath : undefined,
    outputPath: args.outputPath,
    specVersion: args.specVersion !== defaultArgs.specVersion ? args.specVersion : undefined,
    openapi: {
      title: args.openapiTitle !== defaultArgs.openapi.title ? args.openapiTitle : undefined,
      version: args.openapiVersion !== defaultArgs.openapi.version ? args.openapiVersion : undefined,
    },
    debug: args.debug !== defaultArgs.debug ? args.debug : undefined,
    ignoreErrors: args.ignoreErrors !== defaultArgs.ignoreErrors ? args.ignoreErrors : undefined,
  };
};

const specGenerator = async (args: RunServerOptions) => {
  const generateTspecParams = await validateGeneratorOptions(args);
  await generateTspec(generateTspecParams);
};

const startTspecServer = async (args: RunServerOptions) => {
  const generateTspecParams = await validateGeneratorOptions(args);
  initTspecServer({ ...generateTspecParams, port: args.port, proxyHost: args.proxyHost });
};

export const runCli = async () => yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command(
    'generate',
    'Generate OpenAPI Spec from Tspec',
    generatorOptions,
    (yargs) => specGenerator(yargs),
  )
  .command(
    'server',
    'Start Tspec server',
    runServerOptions,
    (yargs) => startTspecServer(yargs),
  )
  .help('help')
  .alias('help', 'h')
  .parse();

if (import.meta.url.startsWith('file:')) {
  const modulePath = realpathSync(fileURLToPath(import.meta.url));
  if (realpathSync(process.argv[1]) === modulePath) {
    runCli();
  }
}
