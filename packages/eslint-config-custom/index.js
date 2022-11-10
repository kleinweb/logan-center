module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'next',
    'turbo',
    'prettier',
  ],
  plugins: ['tailwindcss'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // Disabled due to false positives with TypeScript interfaces. `tsc` will
    // catch undefined variables instead.
    // https://github.com/typescript-eslint/typescript-eslint/issues/131
    'no-undef': 0,
  },
}
