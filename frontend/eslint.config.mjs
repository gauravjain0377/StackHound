// @ts-check
import nextConfig from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Next.js recommended rules (React, hooks, accessibility, @next/next)
  ...nextConfig,

  // Disable ESLint style rules that conflict with Prettier
  prettierConfig,

  // Project-specific overrides
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
