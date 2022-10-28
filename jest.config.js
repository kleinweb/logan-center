// SPDX-FileCopyrightText: 2021 Automattic
// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: MIT

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/(components|graphql|lib|pages|styles)/(.*)$': '<rootDir>/$1/$2',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(spec|test).+(ts|tsx|js)',
  ],
}

module.exports = createJestConfig(customJestConfig)
