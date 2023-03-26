import fs from 'fs/promises';
import path from 'path';

import { Tspec } from 'types/tspec';

const TSPEC_CONFIG_FILE_NAME = 'tspec.config.json';

// Try to find tspec config json file where tspec cli has been executed.
const getTspecDefaultPath = () => path.join(process.cwd(), TSPEC_CONFIG_FILE_NAME);

const readTspecConfig = (path: string) => fs.readFile(path, { encoding: 'utf8' });

const parseTspecConfig = (config: string) => JSON.parse(config);

const validateTspecConfig = (config: any) => {
  try {
    // TODO: validate whether config JSON is fit with GenerateParams or not.
    return config as Tspec.GenerateParams;
  } catch (err) {
    throw new Error('validateTspecConfig: Unimplemented');
  }
};

export const getTspecConfigFromConfigFile = async (inputPath?: string) => {
  const path = inputPath ?? getTspecDefaultPath();
  const fileResult = await readTspecConfig(path);
  const unreliableConfig = parseTspecConfig(fileResult);
  const config = validateTspecConfig(unreliableConfig);

  return config;
};
