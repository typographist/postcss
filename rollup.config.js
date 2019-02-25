import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import flowEntry from 'rollup-plugin-flow-entry';
import pkg from './package.json';

export default [
  {
    input: './src/index.js',
    output: {
      file: 'lib/index.cjs.js',
      format: 'cjs',
      indent: false,
      sourcemap: false,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [babel(), resolve(), uglify(), flowEntry()],
  },
  {
    input: './src/index.js',
    output: {
      file: 'es/index.es.js',
      format: 'es',
      indent: false,
      sourcemap: false,
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [babel(), resolve(), terser(), flowEntry()],
  },
];
