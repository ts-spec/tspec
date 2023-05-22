import fs from 'fs/promises';
import path from 'path';

import { Tspec } from 'types/tspec';

const TSPEC_CONFIG_FILE_NAME = 'tspec.config.json';

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

const validateTspecConfig = (config: any) => {
  try {
    // TODO: validate whether config JSON is fit with GenerateParams or not.
    return config as Tspec.GenerateParams;
  } catch (err) {
    throw new Error('validateTspecConfig: Unimplemented');
  }
};

const getConfigPath = (inputPath?: string) => {
  const filePath = inputPath || TSPEC_CONFIG_FILE_NAME;
  return path.join(process.cwd(), filePath);
};

export const isTspecFileConfigAvailable = async (
  inputPath?: string,
) => {
  const configPath = getConfigPath(inputPath);
  return (await fs.stat(configPath)).isFile();
};

export const getTspecConfigFromConfigFile = async (
  inputPath?: string,
): Promise<Tspec.GenerateParams> => {
  const configPath = getConfigPath(inputPath);
  const fileResult = await readTspecConfig(configPath);

  const unreliableConfig = parseTspecConfig(fileResult);
  const config = validateTspecConfig(unreliableConfig);

  return config;
};
