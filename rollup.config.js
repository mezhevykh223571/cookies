import nodeResolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
import typeScript from 'rollup-plugin-typescript2'
import html from 'rollup-plugin-html'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
import globals from 'rollup-plugin-node-globals'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  plugins: [
    nodeResolve({
      browser: false,
      main: true,
    }),
    commonJs(),
    scss(),
    postcss({
      extract: true,
      plugins: [autoprefixer()],
      writeDefinitions: false,
    }),
    html(),
    typeScript({
      // tsconfig: 'tsconfig.json',
    }),
    sizeSnapshot(),
    terser(),
    globals(),
  ],
}
