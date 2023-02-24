'use client'

export default function DefaultTags() {
  return (
    <link
      rel="stylesheet"
      href="https://use.typekit.net/cwz8dss.css"
      // @ts-expect-error Required React-specific tag: <https://beta.nextjs.org/docs/api-reference/file-conventions/head#supported-head-tags>
      precedence="default"
    />
  )
}
