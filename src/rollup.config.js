import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/js/main.js',
  format: 'iife',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    buble(),
    uglify()
  ],
  dest: 'assets/js/main.js'
}
