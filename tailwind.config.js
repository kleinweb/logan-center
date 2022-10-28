// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      slate: {
        100: '#e5f2f2',
        300: '#d1d4db',
        700: '#263542',
      },
      teal: {
        500: '#779f9e',
      },
      neutral: {
        500: '#616161',
      },
      red: {
        300: '#e2b28e',
        600: '#e92c2b',
      },
      stone: {
        100: '#f5f1ea',
      },
      amber: {
        600: '#c48f57',
      },
      Klein: {
        Eggshell: '#f3f2ea',
        Taupe: '#b9a681',
      },
      white: '#ffffff',
      black: '#000000',
    },
    fontSize: {
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2.0625rem',
      '3xl': '2.875rem',
      '4xl': '3.25rem',
    },
    fontFamily: {
      'sans-serif': 'URW DIN',
    },
    borderRadius: {
      none: '0',
      xs: '0.3125rem',
      sm: '0.375rem',
      default: '0.5625rem',
      lg: '1.875rem',
    },
    extend: {},
  },
  plugins: [],
}
