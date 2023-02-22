// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import Image from 'next/image'
import motifBackground from '@/public/assets/decorations/motif--bg.svg'

export default function CoverImageFallback() {
  return (
    <div className="h-28">
      <Image src={motifBackground} alt="" fill />
    </div>
  )
}
