// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import '../src/styles/globals.css'

export const parameters = {
  backgrounds: {
    // We need a white background for some stories (e.g. `PageTitle`) but it'd
    // be more straightforward to make it default to avoid confusion / invisible
    // regressions otherwise.
    default: 'white',
    values: [{name: 'white', value: '#ffffff'}],
  },
  layout: 'centered',
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
