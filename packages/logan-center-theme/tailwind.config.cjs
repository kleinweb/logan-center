// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2022-2023 underscoretw.com
// SPDX-License-Identifier: GPL-3.0-or-later

const config = require('@kleinweb/logan-center__tailwind-config/tailwind.config.js')

module.exports = {
  ...config,
  content: [
    './index.php',
    './app/**/*.php',
    './resources/**/*.{php,jsx,tsx}',
    './theme.json',
  ],
  corePlugins: {
    // Disable Preflight base styles in CSS targeting the editor.
    preflight: true,
  },
  plugins: [
    require('@tailwindcss/typography')({
      // <https://github.com/WordPress/gutenberg/blob/ab7883cf7518232200bfdc94ce9736bb50ea9ebc/packages/block-editor/src/components/inner-blocks/index.js#L229>
      className: 'editor-styles-wrapper',
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
}
