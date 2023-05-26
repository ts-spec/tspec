import nodeResolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import { defineConfig } from 'rollup';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      cli: 'src/cli/index.ts',
    },
    output: [
      {
        banner(chunk) {
          if (chunk.isEntry && chunk.name === 'cli') {
            return '#!/usr/bin/env node';
          }

          return '';
        },
        dir: 'dist',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        format: 'es',
      },
      {
        banner(chunk) {
          if (chunk.isEntry && chunk.name === 'cli') {
            return '#!/usr/bin/env node';
          }

          return '';
        },
        dir: 'dist',
        entryFileNames: '[name].cjs',
        chunkFileNames: 'chunks/[name].cjs',
        format: 'cjs',
      },
    ],
    external: [
      /node_modules/,
    ],
    plugins: [
      sucrase({
        transforms: ['typescript'],
      }),
      nodeResolve(),
    ],
  },
]);
