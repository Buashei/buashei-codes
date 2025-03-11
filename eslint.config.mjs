// @ts-check

import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  // Globalne ignorowane pliki
  {
    ignores: [
      'node_modules/',
      'bower_components/',
      'dist/',
      'build/',
      'out/',
      'coverage/',
      '.cache/',
      '.npm/',
      '.eslintcache',
      '.env',
      '.env.*',
      '.idea/',
      '.vscode/',
      '*.swp',
      '*.swo',
      '.DS_Store',
      '*.log',
      'temp/',
      'tmp/',
      '__snapshots__/',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
    ],
  },
  // Konfiguracja dla plików TypeScript (.ts, .tsx)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        projectService: true,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Konfiguracja dla plików JavaScript (.js, .mjs, .cjs)
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended, eslintPluginPrettierRecommended],
    languageOptions: {
      globals: globals.browser,
    },
  },
);
