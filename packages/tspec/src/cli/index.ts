import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Tspec } from 'types/tspec';

import { generateTspec } from '../generator';

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
    'outputPath'
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
  specPathGlobs: ['src/**/*.ts'],
  tsconfigPath: 'tsconfig.json',
  outputPath: undefined,
  specVersion: SupportedSpecVersion.THREE,
  openapi: {
    title: 'Tspec API',
    version: '0.0.1',
    securityDefinitions: undefined,
    servers: undefined,
  },
};

export const runCli = async () => {
  const args = await yargs(hideBin(process.argv))
    .options({
      specPathGlobs: { type: 'array', default: defaultArgs.specPathGlobs },
      tsconfigPath: { type: 'string', default: defaultArgs.tsconfigPath },
      outputPath: { type: 'string', default: defaultArgs.outputPath },
      specVersion: { type: 'number' },
      openapiTitle: { type: 'string', default: defaultArgs.openapi.title },
      openapiVersion: { type: 'string', default: defaultArgs.openapi.version },
    })
    .argv;

  if (args.specVersion && !Object.values(SupportedSpecVersion).includes(args.specVersion)) {
    throw new Error(`Tspec currently supports only OpenAPI Spec with version ${Object.values(SupportedSpecVersion).join(', ')}.`); // eslint-disable-line max-len
  }

  const generateTspecParams: Tspec.GenerateParams = {
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
  };

  await generateTspec(generateTspecParams);
};
