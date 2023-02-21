// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

const nextJest = require('next/jest')
const {pathsToModuleNameMapper} = require('ts-jest')
const {compilerOptions} = require('./tsconfig')

const createJestConfig = nextJest({dir: './'})

/** @type {import('jest').Config} */
const customJestConfig = {
  preset: 'ts-jest/presets/js-with-ts',
  // Make tsconfig.json aliases available.
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(spec|test).+(ts|tsx|js)',
  ],
}

module.exports = createJestConfig(customJestConfig)
