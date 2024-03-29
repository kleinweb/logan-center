// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import {FormEvent, useRef} from 'react'
import {useRouter} from 'next/router'
import styles from './SearchForm.module.css'

type Props = {
  path: string
  search: string
}

export default function SearchForm(props: Props) {
  const ref = useRef<HTMLInputElement>()
  const router = useRouter()

  function onSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    router.push(`${props.path}?s=${encodeURIComponent(ref.current.value)}`)
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        className={styles.input}
        defaultValue={props.search}
        id="search"
        placeholder="Search..."
        ref={ref}
        type="search"
      />
      <button type="submit">Search</button>
    </form>
  )
}
