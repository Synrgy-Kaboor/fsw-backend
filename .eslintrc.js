module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
    },
    plugins: ["prettier"],
    extends: ["standard-with-typescript", "prettier"],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "semi": "off",
      "@typescript-eslint/strict-boolean-expressions": 0,
      "@typescript-eslint/no-misused-promises": 0
    },
};