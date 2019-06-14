import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import rollupTypescript from 'rollup-plugin-typescript2'
import minify from 'rollup-plugin-babel-minify'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve({
      jsnext: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    rollupTypescript(),
    minify(),
  ],
}
