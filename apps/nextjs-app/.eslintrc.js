module.exports = {
  root: true,
  extends: ['custom'],
  rules: {
    'turbo/no-undeclared-env-vars': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
  ],
}
