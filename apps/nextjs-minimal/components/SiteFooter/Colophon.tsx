const currentYear = new Date().getFullYear()
const copyrightText = `
  Copyright © ${currentYear} Temple University. All rights reserved.
`

export default function Colophon() {
  return (
    <small className="block text-center text-slate-300">{copyrightText}</small>
  )
}
