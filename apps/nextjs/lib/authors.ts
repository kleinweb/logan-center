// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import {AUTHOR_ROUTES_BASE} from './constants'

/** Get the URL for a given author's archive page. */
export const getAuthorUrl = name => `${AUTHOR_ROUTES_BASE}/${name}`
