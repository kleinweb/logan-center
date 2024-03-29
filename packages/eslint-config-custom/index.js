// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

module.exports = {
  extends: ['eslint:recommended', 'next', 'turbo', 'prettier'],
  rules: {
    'no-console': ['error', {allow: ['warn', 'error']}],
    // TODO(2022-01-30): reconsider -- the issue is closed, and the one error i ran into seems legit
    // Disabled due to false positives with TypeScript interfaces. `tsc` will
    // catch undefined variables instead.
    // https://github.com/typescript-eslint/typescript-eslint/issues/131
    'no-undef': 0,
    'no-unused-vars': [
      'error',
      {
        // Allow unused vars with underscore prefix.
        argsIgnorePattern: '^_',
      },
    ],
  },
}
