import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    svgr({ include: '**/*.svg' })
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
    css: {
      // компилируем CSS-модули, чтобы в тестах были реальные (стабильные) имена классов
      include: [/\.module\.scss$/],
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  }
});
