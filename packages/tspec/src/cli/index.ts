#!/usr/bin/env node
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line import/no-extraneous-dependencies
import yargs from 'yargs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hideBin } from 'yargs/helpers';

import { Tspec } from 'types/tspec';

import { generateTspec } from '../generator';
import { initTspecServer } from '../server';

import { getTspecConfigFromConfigFile, isTspecFileConfigAvailable } from './config';

type RequiredOpenApiParams = Pick<
  NonNullable<Tspec.GenerateParams['openapi']>,
  'title' |
  'version'
>;
type OptionalOpenApiParams = Partial<
  Pick<
    NonNullable<Tspec.GenerateParams['openapi']>,
    'securityDefinitions' |
    'servers'
  >
>;
type RequiredTsParams = Required<
  Pick<
    Tspec.GenerateParams,
    'specPathGlobs' |
    'tsconfigPath' |
    'specVersion'
  >
>;
type OptionalTsParams = Partial<
  Pick<
    Tspec.GenerateParams,
    'outputPath' |
    'debug' |
    'ignoreErrors'
  >
>;
type DefaultGenerateParams =
  RequiredTsParams &
  OptionalTsParams &
  {
    openapi: RequiredOpenApiParams & OptionalOpenApiParams,
  };

enum SupportedSpecVersion {
  THREE = 3,
}

const defaultArgs: DefaultGenerateParams = {
  specPathGlobs: ['**/*.ts'],
  tsconfigPath: 'tsconfig.json',
  outputPath: undefined,
  specVersion: SupportedSpecVersion.THREE,
  openapi: {
    title: 'Tspec API',
    version: '0.0.1',
    securityDefinitions: undefined,
    servers: undefined,
  },
  debug: undefined,
  ignoreErrors: undefined,
};

interface GeneratorOptions {
  specPathGlobs: (string | number)[],
  tsconfigPath: string,
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

const generatorOptions = {
  specPathGlobs: { type: 'array', default: defaultArgs.specPathGlobs },
  tsconfigPath: { type: 'string', default: defaultArgs.tsconfigPath },
  outputPath: { type: 'string', default: defaultArgs.outputPath },
  specVersion: { type: 'number' },
  openapiTitle: { type: 'string', default: defaultArgs.openapi.title },
  openapiVersion: { type: 'string', default: defaultArgs.openapi.version },
  debug: { type: 'boolean', default: defaultArgs.debug },
  ignoreErrors: { type: 'boolean', default: defaultArgs.ignoreErrors },
} as const;

const runServerOptions = {
  ...generatorOptions,
  port: { type: 'number', default: 7000 },
  proxyHost: { type: 'string' },
} as const;

const validateGeneratorOptions = async (args: GeneratorOptions) => {
  if (args.specVersion && !Object.values(SupportedSpecVersion).includes(args.specVersion)) {
    // eslint-disable-next-line max-len
    throw new Error(`Tspec currently supports only OpenAPI Spec with version ${Object.values(SupportedSpecVersion).join(', ')}.`);
  }

  let generateTspecParams: Tspec.GenerateParams = {
    specPathGlobs: args.specPathGlobs.length > 0
      ? args.specPathGlobs.map((glob) => glob.toString())
      : defaultArgs.specPathGlobs,
    tsconfigPath: args.tsconfigPath,
    outputPath: args.outputPath,
    specVersion: (args.specVersion ?? defaultArgs.specVersion) as SupportedSpecVersion,
    openapi: {
      title: args.openapiTitle,
      version: args.openapiVersion,
      securityDefinitions: defaultArgs.openapi.securityDefinitions,
      servers: defaultArgs.openapi.servers,
    },
    debug: args.debug,
    ignoreErrors: args.ignoreErrors,
  };

  if (await isTspecFileConfigAvailable()) {
    const fileConfig = await getTspecConfigFromConfigFile();
    generateTspecParams = {
      ...fileConfig,
      ...generateTspecParams,
    };
  }

  return generateTspecParams;
};

const specGenerator = async (args: RunServerOptions) => {
  const generateTspecParams = await validateGeneratorOptions(args);
  generateTspecParams.outputPath ||= 'openapi.json';
  await generateTspec(generateTspecParams);
};

const startTspecServer = async (args: RunServerOptions) => {
  const generateTspecParams = validateGeneratorOptions(args);
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
