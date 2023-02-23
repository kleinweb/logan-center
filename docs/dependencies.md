# Managing Dependencies

## PHP: Composer

### Forks

If you need to add a dependency from a forked repo, follow the guidance in the relevant section in the Composer manual:

Source: <https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository>

> If you are using a certain library for your project, and you decide to change
> something in the library, you will want your project to use the patched
> version. If the library is on GitHub (this is the case most of the time), you
> can fork it there and push your changes to your fork. After that you update
> the project's `composer.json`. All you have to do is add your fork as a
> repository and update the version constraint to point to your custom branch.
> In `composer.json` only, you should prefix your custom branch name with
> `"dev-"` (without making it part of the actual branch name). For version
> constraint naming conventions see
> [Libraries](https://getcomposer.org/doc/02-libraries.md) for more information.
>
> Example assuming you patched monolog to fix a bug in the `bugfix` branch:
>
>     {
>         "repositories": [
>             {
>                 "type": "vcs",
>                 "url": "https://github.com/igorw/monolog"
>             }
>         ],
>         "require": {
>             "monolog/monolog": "dev-bugfix"
>         }
>     }
>
> When you run `php composer.phar update`, you should get your modified version
> of `monolog/monolog` instead of the one from packagist.

Also, importantly (emphasis mine):

> Note that **you should not rename the package** unless you really intend to
> fork it in the long term, and completely move away from the original package.
> Composer will correctly pick your package over the original one since the
> custom repository has priority over packagist. If you want to rename the
> package, you should do so in the default (often master) branch and not in a
> feature branch, since the package name is taken from the default branch.

## Git Submodules

**TL;DR Never use git submodules unless you absolutely need to.**

If for some unfortunate reason you _need_ to use a git submodule, one day you'll
probably want to remove it. Like most interactions with submodules, this process
is painful and complicated. So here's what you need to do:

Source: <https://gist.github.com/myusuf3/7f645819ded92bda6677>

> To remove a submodule you need to:
>
> - Delete the relevant section from the `.gitmodules` file.
> - Stage the `.gitmodules` changes: `git add .gitmodules`
> - Delete the relevant section from `.git/config`.
> - Run `git rm --cached <path/to/submodule>` (no trailing slash).
> - Run `rm -rf .git/modules/<path/to/submodule>` (no trailing slash).
> - `git commit -m "chore(deps): removed submodule <submodule-name>"`
> - Delete the now untracked submodule files `rm -rf <path/to/submodule>`
