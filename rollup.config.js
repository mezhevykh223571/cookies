import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
import minify from 'rollup-plugin-babel-minify'

import pkg from './package.json'

export default {
  input: 'src/cookie.js',
  output: [
    {
      name: 'Cookie',
      file: pkg.main,
      format: 'umd',
    },
  ],
  plugins: [
    nodeResolve({
      mainFields: ['jsnext'],
      browser: true
    }),
    commonjs(),
    babel(),
    minify(),
    globals(),
    builtins(),
  ],
}
