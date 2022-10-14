import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
// import commonjs from '@rollup/plugin-commonjs';


export default {
  input: 'src/index.ts',
  output: {
    dir: './dist',
    format: 'cjs',
    sourcemap: true,
    exports: 'auto',
  },
  plugins: [
    typescript({
      compilerOptions: { module: 'esnext' },
    }),
    terser(),
  ],
};
