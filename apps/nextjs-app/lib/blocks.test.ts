// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
//
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

import { mapAttributesToProps } from './blocks'

test('mapAttributesToProps: returns a props-like object', function () {
  const attributes = [
    {
      name: 'foo',
      value: 'bar',
    },
    {
      name: 'fizz',
      value: 'buzz',
    },
    {
      name: 'far',
      value: 'near',
    },
  ]

  expect(mapAttributesToProps(attributes)).toEqual({
    foo: 'bar',
    fizz: 'buzz',
    far: 'near',
  })
})

test('mapAttributesToProps: drops attributes that have falsy names or values', function () {
  const attributes = [
    {
      value: 'bar',
    },
    {
      name: 'foo',
    },
    {
      name: 'far',
      value: null,
    },
  ]

  expect(mapAttributesToProps(attributes)).toEqual({})
})
