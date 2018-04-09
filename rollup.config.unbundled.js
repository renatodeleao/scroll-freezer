import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { version } from './package.json';
import filesize from 'rollup-plugin-filesize';
import banner from './banner';

export default {
  input: 'index.js',
  cache: false,
  output: [
    {
      file: 'dist/scroll-freezer.js',
      format: 'umd',
      name: 'ScrollFreezer',
      banner: banner('umd', version)
    },
    {
      file: 'dist/scroll-freezer.es.js',
      format: 'es',
      name: 'ScrollFreezer',
      banner: banner('es', version)
    }
  ],
  plugins: [
    json(),
    resolve(),
    babel({
      plugins: ['external-helpers'],
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};