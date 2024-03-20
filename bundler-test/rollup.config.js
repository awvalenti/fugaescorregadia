import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/hello.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
};
