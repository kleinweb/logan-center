import pkg from './package.json' assert { type: 'json' }
import svgr from '@svgr/rollup'
import typescript from '@rollup/plugin-typescript'

/** @type {import('rollup').RollupOptions} */
const rollupConfig = {
  input: 'src/index.ts',
  external: ['react'],
  plugins: [typescript(), svgr()],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
}

export default rollupConfig
