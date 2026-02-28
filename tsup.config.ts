import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  sourcemap: false,
  minify: false,
  target: 'es2020',
})
