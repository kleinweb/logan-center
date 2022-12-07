import pkg from './package.json' assert { type: 'json' }
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  external: Object.keys(pkg.dependencies),
})
