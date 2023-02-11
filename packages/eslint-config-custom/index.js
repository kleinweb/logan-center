// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

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
    // TODO(2022-01-30): reconsider -- the issue is closed, and the one error i ran into seems legit
    // Disabled due to false positives with TypeScript interfaces. `tsc` will
    // catch undefined variables instead.
    // https://github.com/typescript-eslint/typescript-eslint/issues/131
    'no-undef': 0,
    // Defer to the official TailwindCSS Prettier plugin --
    // this rule seems to contradict the official classnames order.
    'tailwindcss/classnames-order': 'off',
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
