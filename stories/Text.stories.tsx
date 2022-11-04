// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import {
  HeadingFour,
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  PageTitle,
} from '@/components/Headings'

export const Text = () => (
  <>
    <PageTitle>Page Title</PageTitle>
    <HeadingOne>Heading 1</HeadingOne>
    <HeadingTwo>Heading 2</HeadingTwo>
    <HeadingThree>Heading 3</HeadingThree>
    <HeadingFour>Heading 4</HeadingFour>
    <p className="text-lg">Blurb</p>
    <p>Body Text</p>
    <small className="text-sm italic">Byline</small>
  </>
)

export default {
  title: 'Atoms/Text',
}
