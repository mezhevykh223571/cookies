import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import { uglify } from 'rollup-plugin-uglify'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    babel({
      babelrc: true,
      exclude: 'node_modules/**'
    }),
    uglify({
      output: {
        comments: 'all'
      }
    }),
    commonjs({
      extensions: ['.js', '.ts']
    }),
    globals(),
    builtins()
  ]
}
