# Logan Center WordPress Theme

## Theme structure

```sh
.                         # → Theme package root (this directory)
├── app/                  # → Theme PHP
│   ├── Providers/        # → Service providers
│   ├── View/             # → View models
│   ├── filters.php       # → Theme filters
│   └── setup.php         # → Theme setup
├── composer.json         # → Autoloading for `app/` files
├── public/               # → Built theme assets (never edit)
├── functions.php         # → Theme bootloader
├── index.php             # → Theme template wrapper
├── node_modules/         # → Node.js packages (never edit)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Theme assets and templates
│   ├── fonts/            # → Theme fonts
│   ├── images/           # → Theme images
│   ├── scripts/          # → Theme javascript
│   ├── styles/           # → Theme stylesheets
│   └── views/            # → Theme templates
│       ├── components/   # → Component templates
│       ├── forms/        # → Form templates
│       ├── layouts/      # → Base templates
│       ├── partials/     # → Partial templates
|       └── sections/     # → Section templates
├── screenshot.png        # → Theme screenshot for WP admin
├── style.css             # → Theme meta information
├── vendor/               # → Composer packages (never edit)
└── bud.config.js         # → Bud configuration
```

## Theme setup

Edit `app/setup.php` to enable or disable theme features, setup navigation menus, post thumbnail sizes, and sidebars.

## Theme development

- Run `yarn` from the theme directory to install dependencies
- Update `bud.config.js` with your local dev URL

### Build commands

- `yarn dev` — Compile assets when file changes are made, start Browsersync session
- `yarn build` — Compile assets for production

## Styling the Block Editor

Unfortunately, as of WordPress 6.1, it does not appear to be straightforward at all.

- [Is it possible to use a dark theme in the editor conditionally? · WordPress/gutenberg · Discussion #47856](https://github.com/WordPress/gutenberg/discussions/47856#discussioncomment-4909881)
- [Allow themes to dynamically add CSS class names to the editor wrapper · Issue #26494 · WordPress/gutenberg](https://github.com/WordPress/gutenberg/issues/26494)
- [Block editor body classes registration · @wordpress/block-editor/Iframe][gutenberg-block-editor-iframe-component-body-classes]
- [Source of `.block-editor-block-list__layout` · @wordpress/block-editor/InnerBlocks][gutenberg-block-editor-inner-blocks-classes]
- [Gutenberg: body class / elements by template - sage - Roots Discourse](https://discourse.roots.io/t/gutenberg-body-class-elements-by-template/15310)
- [Editor styles for Block Editor customisations · Issue #25 · gregsullivan/\_tw](https://github.com/gregsullivan/_tw/issues/25)

[gutenberg-block-editor-iframe-component-body-classes]: https://github.com/WordPress/gutenberg/blob/6a64cdfee23442ee201ea5039ae5c833d1946428/packages/block-editor/src/components/iframe/index.js#L152-L162
[gutenberg-block-editor-inner-blocks-classes]: https://github.com/WordPress/gutenberg/blob/ab7883cf7518232200bfdc94ce9736bb50ea9ebc/packages/block-editor/src/components/inner-blocks/index.js#L227-L234

## References + Credits

Primary based on the [Sage][sage-starter-theme], licensed `MIT` by the Roots Software Foundation, LLC.

Much of the Tailwind configuration here is based on
[gregsullivan/\_tw][underscore-tw-theme], licensed `GPL-2.0-only`,
migrated into the existing Sage/Bud tailwind configuration.

[sage-starter-theme]: https://github.com/roots/sage/
[underscore-tw-theme]: https://github.com/gregsullivan/_tw
