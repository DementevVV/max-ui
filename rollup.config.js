import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json' with { type: 'json' };

// Runtime-зависимости ставятся у потребителя через dependencies — не встраиваем их в бандл
const dependencies = Object.keys(pkg.dependencies ?? {});
const isDependency = (id) => dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default {
  input: 'src/index.ts',
  external: isDependency,
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    svgr(),
    typescript({ tsconfig: './tsconfig.build.json' }),
    resolve(),
    peerDepsExternal(),
    postcss({
      inject: false,
      extract: 'styles.css',
      minimize: true,
      modules: {
        generateScopedName: '[local]__[hash:base64:3]'
      }
    }),
    terser()
  ]
};
