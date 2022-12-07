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
    screens: {
      xs: '568px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      primary: primaryPalette,
      secondary: secondaryPalette,
      slate: {
        100: secondaryPalette.light,
        300: '#d1d4db',
        700: primaryPalette.dark,
      },
      teal: {
        500: primaryPalette.accent, // "primary highlight"
      },
      neutral: {
        100: 'hsl(0, 0%, 90%)',
        200: 'hsl(0, 0%, 80%)',
        300: 'hsl(0, 0%, 70%)',
        400: 'hsl(0, 0%, 60%)',
        500: 'hsl(0, 0%, 50%)',
        600: 'hsl(0, 0%, 40%)',
        700: 'hsl(0, 0%, 30%)',
        800: 'hsl(0, 0%, 20%)',
        900: 'hsl(0, 0%, 10%)',
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
    extend: {},
  },
  corePlugins: {
    // https://github.com/tailwindlabs/tailwindcss-aspect-ratio#compatibility-with-default-aspect-ratio-utilities
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
