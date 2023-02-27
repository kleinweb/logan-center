module.exports = {
  root: true,
  extends: ['@roots/eslint-config/sage'],
  rules: {
    'no-console': ['error', {allow: ['warn', 'error']}],
    'no-unused-vars': [
      'error',
      {
        // Allow unused vars with underscore prefix.
        argsIgnorePattern: '^_',
      },
    ],
  },
}
