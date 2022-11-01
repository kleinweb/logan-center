// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later

const path = require('path')

module.exports = {
  stories: ['../@(components|pages|stories)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
    'storybook-addon-headless',
    'storybook-addon-designs',
  ],
  webpackFinal: async (config) => {
    // Enable @ symbol aliases.
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
    }

    // Enable sourcemaps in Storybook.
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    })

    return config
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
}
