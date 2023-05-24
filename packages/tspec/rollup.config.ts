import sucrase from '@rollup/plugin-sucrase';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      cli: 'src/cli/index.ts',
    },
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        format: 'es',
      },
      {
        dir: 'dist',
        entryFileNames: '[name].cjs',
        chunkFileNames: 'chunks/[name].cjs',
        format: 'cjs',
      },
    ],
    external: [
      /node_modules/
    ],
    plugins: [
      sucrase({
        transforms: ['typescript']
      }),
      nodeResolve(),
    ],
  },
]);
