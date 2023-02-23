import {AUTHOR_ROUTES_BASE} from './constants'

/** Get the URL for a given author's archive page. */
export const getAuthorUrl = name => `${AUTHOR_ROUTES_BASE}/${name}`
