import { swc } from 'rollup-plugin-swc3';

/** @type import('rollup').RollupOptions */
export default {
  input: 'src/index.ts',
  plugins: [swc()],
  output: [
    {
      file: 'index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
};
