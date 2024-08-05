import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const input = ['src/index.ts'];



// export default {
//   input: 'src/index.ts',
//   output: {
//     dir: './dist',
//     format: 'cjs',
//     sourcemap: true,
//     exports: 'auto',
//   },
//   plugins: [
//     typescript({
//       compilerOptions: { module: 'esnext' },
//     }),
//     terser(),
//   ],
// };


export default [
  // UMD
  {
    input,
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
      }),
      terser(),

      typescript({
        compilerOptions: {
          outDir: 'dist',
        },
      })
    ],
    output: {
      file: `dist/inserturlparams.min.js`,
      format: 'umd',
      name: 'inserturlparams', // this is the name of the global object
      esModule: false,
      exports: 'named',
      sourcemap: true,
    },
  },

  // ESM
  {
    input,
    plugins: [
      nodeResolve(),
      typescript({
        compilerOptions: {
          outDir: 'dist/esm',
        },
      })
    ],
    output: {
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  },

  // CJS
  {
    input,
    plugins: [
      nodeResolve(),

      typescript({
        compilerOptions: {
          outDir: 'dist/cjs',
        },
      })
    ],
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      entryFileNames: 'index.cjs',
      sourcemap: true,
    },
  },
];
