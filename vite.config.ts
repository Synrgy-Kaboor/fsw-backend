import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        'src/index.ts',
        'src/database',
        '**/*.js',
      ],
    },
  },
});
