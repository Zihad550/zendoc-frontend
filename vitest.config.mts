import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.next'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        'src/types/**',
        'src/contants/**',
        '.next/**',
        'src/app/**', // Next.js app directory - mostly routing
        'src/assets/**', // Static assets
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        // Critical path coverage requirements
        'src/utils/**': {
          branches: 90,
          functions: 95,
          lines: 95,
          statements: 95,
        },
        'src/redux/**': {
          branches: 85,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/components/Forms/**': {
          branches: 85,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/validations/**': {
          branches: 90,
          functions: 95,
          lines: 95,
          statements: 95,
        },
      },
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      watermarks: {
        statements: [80, 95],
        functions: [80, 95],
        branches: [80, 95],
        lines: [80, 95],
      },
    },
  },
  define: {
    global: 'globalThis',
  },
});
