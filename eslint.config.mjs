import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs,
  ...tseslint.configs,

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores: ['/*.config.*', '**/*.test.*'],
    ...reactRecommended,
    plugins: {
      react,
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
];
