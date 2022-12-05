import { defineConfig } from 'tsup'
import SVGRPlugin from 'esbuild-plugin-svgr'

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  external: ['react'],
  esbuildPlugins: [SVGRPlugin()],
})
