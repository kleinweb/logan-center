// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { HeadingTwo } from '@/components/Headings'
import Button from '@/components/Buttons'

export const Hero = () => (
  <div>
    <HeadingTwo>TKTKTK</HeadingTwo>
    <p>lorem lorem lorem</p>
    <div>
      <Button href="#">
        Button 1 <span>caret</span>
      </Button>
      <Button href="#">
        Button 2 <span>caret</span>
      </Button>
    </div>
  </div>
)