// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {addons} from '@storybook/manager-api'

import LoganCenterTheme from './LoganCenterTheme'

addons.setConfig({
  theme: LoganCenterTheme,
})
