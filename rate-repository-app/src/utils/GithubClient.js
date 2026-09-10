import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      'no-unused-vars': 'warn',
    },
  },

  {
    ignores: ['node_modules/**'],
  },
];