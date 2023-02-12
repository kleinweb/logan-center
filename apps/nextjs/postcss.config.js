// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

const config = require('@kleinweb/logan-center__tailwind-config/tailwind.config.js')

module.exports = {
  plugins: {
    tailwindcss: { config },
    autoprefixer: {},
  },
}
