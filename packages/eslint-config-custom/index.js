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
  },
}
