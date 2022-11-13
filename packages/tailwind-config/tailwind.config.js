// SPDX-FileCopyrightText: 2022 Temple University
// SPDX-FileCopyrightText: 2022 Vercel
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

const primaryPalette = {
  light: 'hsl(38, 35%, 94%)', //    => #F5F1EA
  accent: 'hsl(178, 38%, 43%)', //  => #449795
  dark: 'hsl(208, 27%, 20%)', //    => #253441
}

const secondaryPalette = {
  light: 'hsla(180, 33%, 92%, 1)', // => #E5F2F2
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./**/*.{js,ts,jsx,tsx,mdx}`],
  theme: {
    colors: {
      primary: primaryPalette,
      slate: {
        100: secondaryPalette.light,
        300: '#d1d4db',
        700: primaryPalette.dark,
      },
      teal: {
        500: primaryPalette.accent, // "primary highlight"
      },
      neutral: {
        500: '#616161',
      },
      red: {
        300: '#e2b28e',
        600: '#e92c2b',
      },
      stone: {
        100: primaryPalette.light,
      },
      amber: {
        600: '#c48f57',
      },
      Temple: {
        Cherry: 'var(--tu--color--cherry)',
      },
      Klein: {
        Eggshell: '#f3f2ea',
        Taupe: '#b9a681',
      },
      white: '#ffffff',
      black: '#000000',
    },
    fontSize: {
      '2xs': '0.75rem',
      xs: '0.875rem',
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2.0625rem',
      '3xl': '2.875rem',
      '4xl': '3.25rem',
    },
    fontFamily: {
      sans: 'urw-din, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    // Font weights are listed explicitly because they will need to be added to
    // the font stack (e.g. Adobe Fonts) before being usable in CSS.
    fontWeight: {
      normal: 400,
      bold: 700,
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
  corePlugins: {
    // https://github.com/tailwindlabs/tailwindcss-aspect-ratio#compatibility-with-default-aspect-ratio-utilities
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
