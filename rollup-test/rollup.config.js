// import babel from 'rollup-plugin-babel'
;// import { rollup } from 'rollup';
const babel = require('@rollup/plugin-babel')

module.exports = {
  input: 'index.js', // Entry point for your application
  output: {
    file: 'bundle.js', // Output file name for the bundled code
    format: 'cjs', // CommonJS module format for Node.js
  },
  plugins: [
    babel({
      include: 'node_modules/**',
      babelHelpers: 'inline'
    })
  ]
}
