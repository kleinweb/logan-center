// SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
} from '../components/Headings'

export const Text = () => (
  <>
    <HeadingOne>Page Title</HeadingOne>
    <HeadingTwo>Heading 2</HeadingTwo>
    <HeadingThree>Heading 3</HeadingThree>
    <HeadingFour>Heading 4</HeadingFour>
    <HeadingFive>Heading 5</HeadingFive>
    <p className="text-lg">Blurb</p>
    <p>Body Text</p>
    <small className="text-sm italic">Byline</small>
  </>
)

export default {
  title: 'Atoms/Text',
}
