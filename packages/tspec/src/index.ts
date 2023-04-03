import { runCli } from 'cli';

if (typeof window === 'undefined' && require.main === module) {
  runCli();
}

export * from './generator';
export * from './server';
export * from './types';
