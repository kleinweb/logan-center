// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

const currentYear = new Date().getFullYear()

export default function FinePrint() {
  return (
    <div className="space-y-1 text-center text-slate-300">
      <nav>
        <ul className="inline-flex list-none">
          <li className="">
            <small>
              <a
                href="https://www.temple.edu/privacy-statement/"
                rel="noreferrer external"
                target="_blank"
                className="text-red-300 after:content-['_↗'] hover:underline"
              >
                Privacy Statement
              </a>
            </small>
          </li>
        </ul>
      </nav>
      <small className="block">
        {`Copyright © ${currentYear} Temple University. All rights reserved.`}
      </small>
    </div>
  )
}
