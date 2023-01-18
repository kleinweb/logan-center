// SPDX-FileCopyrightText: 2022-2023 Temple University
// SPDX-License-Identifier: GPL-3.0-or-later

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
        // TODO: confirm color params
        900: 'hsl(208, 27%, 15%)',
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
    // the font stack (e.g. Adobe Fonts fka Typekit) before being usable in CSS.
    // <https://fonts.adobe.com/my_fonts#web_projects-section>
    fontWeight: {
      normal: 400,
      // Note that Adobe refers to this weight simply as "Demi". We use the
      // more-common and more-obvious "Semibold" terminology.
      semibold: 600,
      bold: 700,
    },
    extend: {
      aspectRatio: {
        banner: '3 / 1',
        cinematic: '64 / 27', // a.k.a. "ultrawide" or "21:9" (a marketing term) <https://en.wikipedia.org/wiki/21:9_aspect_ratio>
      },
      // Reference: // <https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale>

      // NOTE: keys *MUST* be strings -- `prettier` should not change this.
      // TODO: this *might* be an upstream bug in `prettier-plugin-tailwind`
      //       but first double-check that it's configured properly
      // prettier-ignore
      spacing: {
        '18': '4.5rem',
      },
    },
  },
}
