import fs from 'fs/promises';
import path from 'path';

import { Tspec } from '../types/tspec';
import { assertIsDefined } from '../utils/types';

const readTspecConfig = (path: string) => {
  try {
    return fs.readFile(path, { encoding: 'utf8' });
  } catch (err) {
    console.error('Cannot read Tspec config');
    throw err;
  }
};

const parseTspecConfig = (config: string) => {
  try {
    return JSON.parse(config);
  } catch (err) {
    console.error('Cannot parse Tspec config');
    throw err;
  }
};

type TspecConfigError = {
  message: string,
  property: string,
}

type TspecConfigValidationFunction = (
  property: string,
  value: any,
  type?: 'string' | 'boolean',
) => void;

function validateTspecConfig(config: Tspec.GenerateParams): asserts config is Tspec.GenerateParams {
  const errors: TspecConfigError[] = [];

  const validatePrimitive: TspecConfigValidationFunction = (property, value, type) => {
    assertIsDefined(type);
    if (typeof value !== type) { // eslint-disable-line valid-typeof
      errors.push({
        message: `property is not a ${type}.`,
        property,
      });
    }
  };

  const validateStringArray: TspecConfigValidationFunction = (property, value) => {
    if (!Array.isArray(value)) {
      errors.push({
        message: 'property is not an array.',
        property,
      });
    } else if (value.some((glob) => typeof glob !== 'string')) {
      errors.push({
        message: 'property contains more than one non-string value.',
        property,
      });
    }
  };

  if (config.specPathGlobs) {
    validateStringArray('specPathGlobs', config.specPathGlobs);
  }
  if (config.tsconfigPath) {
    validatePrimitive('tsconfigPath', config.tsconfigPath, 'string');
  }
  if (config.outputPath) {
    validatePrimitive('outputPath', config.outputPath, 'string');
  }
  if (config.openapi?.title) {
    validatePrimitive('openapiTitle', config.openapi.title, 'string');
  }
  if (config.openapi?.version) {
    validatePrimitive('openapiVersion', config.openapi.version, 'string');
  }
  if (config.debug) {
    validatePrimitive('debug', config.debug, 'boolean');
  }
  if (config.ignoreErrors) {
    validatePrimitive('ignoreErrors', config.ignoreErrors, 'boolean');
  }

  if (errors.length) {
    const message = `Tspec configuration file is not valid.\n${
      errors.map((error) => `${error.property}: ${error.message}`).join('\n')
    }\n`;
    throw new Error(message);
  }
}

const getConfigPath = (inputPath: string) => {
  const filePath = inputPath;
  return path.join(process.cwd(), filePath);
};

export const isTspecFileConfigAvailable = async (inputPath: string) => {
  const configPath = getConfigPath(inputPath);
  return fs.access(configPath)
    .then(() => true)
    .catch(() => false);
};

export const getTspecConfigFromConfigFile = async (
  inputPath: string,
): Promise<Tspec.GenerateParams> => {
  const configPath = getConfigPath(inputPath);
  const fileResult = await readTspecConfig(configPath);

  const config = parseTspecConfig(fileResult);
  validateTspecConfig(config);

  return config;
};
