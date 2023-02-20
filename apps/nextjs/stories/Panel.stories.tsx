// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {HeadingTwo} from '../components/Headings'
import {Button} from '../components/Buttons'

export default {
  title: 'Components/Panels',
}

export const Hero = () => (
  <div>
    <HeadingTwo>TKTKTK</HeadingTwo>
    <p>lorem lorem lorem</p>
    <div>
      <Button>
        Button 1 <span>caret</span>
      </Button>
      <Button>
        Button 2 <span>caret</span>
      </Button>
    </div>
  </div>
)
