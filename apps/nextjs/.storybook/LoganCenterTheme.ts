// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

// .storybook/YourTheme.js

import {create} from '@storybook/theming/create'

export default create({
  base: 'light',
  brandTitle: 'Logan Center',
  brandUrl: 'https://templelogancenter.org',
  brandImage:
    'https://repository-images.githubusercontent.com/554476185/40488433-7131-4c74-8844-49c4e4f72fe7',
  brandTarget: '_self',

  fontBase: '"urw-din", "Open Sans", sans-serif',
  fontCode: '"Iosevka Nerd Font", "Iosevka", monospace',
})
