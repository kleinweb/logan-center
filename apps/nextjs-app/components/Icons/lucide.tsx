// SPDX-FileCopyrightText: 2013-2022 Cole Bemis
// SPDX-FileCopyrightText: 2022 Lucide Contributors
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: ISC AND MIT

import { SvgIcon } from './SvgIcon'

export const ChevronDown = () => (
  <SvgIcon>
    <path d="m6 9 6 6 6-6" />
  </SvgIcon>
)

export const ChevronLeft = () => (
  <SvgIcon>
    <path d="m15 18-6-6 6-6" />
  </SvgIcon>
)

export const ChevronRight = () => (
  <SvgIcon>
    <path d="m9 18 6-6-6-6" />
  </SvgIcon>
)

export const ChevronUp = () => (
  <SvgIcon>
    <path d="m18 15-6-6-6 6" />
  </SvgIcon>
)

export const Facebook = () => (
  <SvgIcon>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </SvgIcon>
)

export const Instagram = () => (
  <SvgIcon>
    {/* prettier-ignore */}
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </SvgIcon>
)

export const Mail = () => (
  <SvgIcon>
    {/* prettier-ignore */}
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </SvgIcon>
)

export const Twitter = () => (
  <SvgIcon>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </SvgIcon>
)
