module.exports = {
  root: true,
  extends: ['@kleinweb/eslint-config-custom'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
}
