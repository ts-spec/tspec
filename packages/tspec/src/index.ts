import { runCli } from 'cli';

if (typeof window === 'undefined' && require.main === module) {
  runCli();
}

export * from './generator';
export * from './types';
