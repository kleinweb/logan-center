// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2022-2023 underscoretw.com
// SPDX-License-Identifier: GPL-3.0-or-later

const config = require('@kleinweb/logan-center__tailwind-config/tailwind.config.js')

module.exports = {
  ...config,
  content: [
    './index.php',
    './app/**/*.php',
    './resources/**/*.{php,jsx,tsx}',
    './theme.json',
  ],
  corePlugins: {
    // Disable Preflight base styles in CSS targeting the editor.
    preflight: true,
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'block-editor-block-list__layout',
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
  // theme: {
  // 	extend: {
  // 		typography: (theme) => ({
  // 			/**
  // 			 * Tailwind Typography’s default styles are opinionated, and
  // 			 * you may need to override them if you have mockups to
  // 			 * replicate. You can view the default modifiers here:
  // 			 *
  // 			 * https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
  // 			 */

  // 			DEFAULT: {
  // 				css: [
  // 					{
  // 						/**
  // 						 * By default, max-width is set to 65 characters.
  // 						 * This is a good default for readability, but
  // 						 * often in conflict with client-supplied designs.
  // 						 * A value of false removes the max-width property.
  // 						 */
  // 						// maxWidth: false,

  // 						/**
  // 						 * You can customize your color theme below. The
  // 						 * initial values are based upon the neutral gray
  // 						 * scale theme, using the `primary` color from
  // 						 * your `theme.json` file for links.
  // 						 */
  // 						'--tw-prose-body': theme.colors.neutral[700],
  // 						'--tw-prose-headings': theme.colors.neutral[900],
  // 						'--tw-prose-lead': theme.colors.neutral[600],
  // 						'--tw-prose-links': theme('colors.primary'),
  // 						'--tw-prose-bold': theme.colors.neutral[900],
  // 						'--tw-prose-counters': theme.colors.neutral[500],
  // 						'--tw-prose-bullets': theme.colors.neutral[300],
  // 						'--tw-prose-hr': theme.colors.neutral[200],
  // 						'--tw-prose-quotes': theme.colors.neutral[900],
  // 						'--tw-prose-quote-borders': theme.colors.neutral[200],
  // 						'--tw-prose-captions': theme.colors.neutral[500],
  // 						'--tw-prose-code': theme.colors.neutral[900],
  // 						'--tw-prose-pre-code': theme.colors.neutral[200],
  // 						'--tw-prose-pre-bg': theme.colors.neutral[800],
  // 						'--tw-prose-th-borders': theme.colors.neutral[300],
  // 						'--tw-prose-td-borders': theme.colors.neutral[200],
  // 						'--tw-prose-invert-body': theme.colors.neutral[300],
  // 						'--tw-prose-invert-headings': theme.colors.white,
  // 						'--tw-prose-invert-lead': theme.colors.neutral[400],
  // 						'--tw-prose-invert-links': theme.colors.white,
  // 						'--tw-prose-invert-bold': theme.colors.white,
  // 						'--tw-prose-invert-counters': theme.colors.neutral[400],
  // 						'--tw-prose-invert-bullets': theme.colors.neutral[600],
  // 						'--tw-prose-invert-hr': theme.colors.neutral[700],
  // 						'--tw-prose-invert-quotes': theme.colors.neutral[100],
  // 						'--tw-prose-invert-quote-borders':
  // 							theme.colors.neutral[700],
  // 						'--tw-prose-invert-captions': theme.colors.neutral[400],
  // 						'--tw-prose-invert-code': theme.colors.white,
  // 						'--tw-prose-invert-pre-code': theme.colors.neutral[300],
  // 						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
  // 						'--tw-prose-invert-th-borders': theme.colors.neutral[600],
  // 						'--tw-prose-invert-td-borders': theme.colors.neutral[700],
  // 					},
  // 				],
  // 			},
  // 		}),
  // 	},
  // }
}
