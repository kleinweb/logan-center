// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

///: <https://beta.nextjs.org/docs/api-reference/file-conventions/head>

export default function Head(_) {
  return (
    <>
      <link
        key="typekit-css"
        rel="stylesheet"
        href="https://use.typekit.net/cwz8dss.css"
        // @ts-expect-error Required React-specific tag: <https://beta.nextjs.org/docs/api-reference/file-conventions/head#supported-head-tags>
        precedence="default"
      />
    </>
  )
}
