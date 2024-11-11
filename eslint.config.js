import prettierConfig from 'eslint-config-prettier';
import htmlPlugin from 'eslint-plugin-html';

export default [
  {
    files: ['src/**/*.{js,html}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      html: htmlPlugin,
    },
    settings: {
      'html/html-extensions': ['.html'],
    },
    rules: {
      'no-unused-vars': 'warn',
      'quotes': ['error', 'single'],
      'max-len': ['warn', { code: 80 }],
      ...prettierConfig.rules
    },
  },
];