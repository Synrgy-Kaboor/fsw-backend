import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        'src/database/migrations',
        'src/database/seeds',
        'src/index.ts',
        'public',
        '**/*.js',
      ],
    },
  },
});
