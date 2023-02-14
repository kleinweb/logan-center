# SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later

###: https://just.systems/man/en/

default:
  @just --list --unsorted --color=always | rg -v "    default"

##: feedback
icon-ok := '✔'
msg-ok := icon-ok + " OK"
msg-done := icon-ok + " Done"

##: binary cache
cachix-cache-name := env_var('CACHIX_CACHE_NAME')
cachix-exec := "cachix watch-exec --jobs 2 " + cachix-cache-name

##: directories/paths
prj-root := env_var('PRJ_ROOT')
node-modules := join(prj-root, "node_modules/.bin")
nextjs-dir := prj-root / "apps/nextjs"
wp-dir := prj-root / "apps/wordpress"

# make node/yarn `package.json` runnables available to tasks
export PATH := join(node-modules, '.bin') + ":" + env_var('PATH')

###: DEVELOPMENT ===================================================================================

# [dev]: 		Install the project dependencies
install:
  yarn install
  cd {{ wp-dir }} && composer install

# [dev]: 		Run the development watch processes
dev: start-wp && stop-wp
  -yarn dev

# [dev]: 		Start WordPress
start-wp:
  ddev start logancenter-wp

# [dev]: 		Stop WordPress
stop-wp:
  ddev stop logancenter-wp

# [dev]: 		Run command in app scope
focus app +ARGS:
  cd {{ join( "apps", app ) }} && {{ ARGS }}

# [wp]: 		Install WordPress plugin with Composer and commit lock
add-plugin name owner='wpackagist-plugin':
  cd {{ wp-dir }} && \
    composer require {{ owner }}/{{ name }} && \
    git add composer.{json,lock} && \
    git commit --message 'feat(wp:plugins|deps): add `{{ name }}`'

# [wp]: 		Activate WordPress plugin
activate-plugin name:
  cd {{ wp-dir }} && ddev wp plugin activate {{ name }}


###: LINTING/FORMATTING ============================================================================

# FIXME:
# ❯ just fmt
# treefmt --no-cache /Users/cdom/Developer/work/projects/logan-center
# thread 'main' panicked at 'assertion failed: command.is_absolute()', src/formatter.rs:165:9

# [fmt]:		Format files with treefmt
fmt *FILES=prj-root:
  treefmt --no-cache {{FILES}}

# [lint]:		Check Nix files for issues
check *FILES=prj-root: (_deadnix "check" FILES) (_statix "check" FILES)

# [lint]:		Write automatic linter fixes to files
lint-fix *FILES=prj-root: (_deadnix "fix" FILES) (_statix "fix" FILES)

# [nix]:		Run `statix` for static analysis
_statix action +FILES=prj-root:
  @ # Note that stderr is silenced due to an upstream bug
  @ # https://github.com/nerdypepper/statix/issues/59
  @ for f in {{FILES}}; do \
    statix {{action}} -- "$f" 2>/dev/null; \
  done

# [nix]:		Run `deadnix` with sane options
_deadnix action +FILES=prj-root:
  @deadnix \
    {{ if action == "fix" { "--edit" } else { "--fail" } }} \
    --no-lambda-pattern-names \
    {{FILES}}


###: SECRETS =======================================================================================

vault-cmd := join( node-modules, "dotenv-vault" )

# [secrets]: 		Run `dotenv-vault` in the specified app scope
vault app-name *ARGS:
  cd {{ join( 'apps', app-name ) }} && {{ vault-cmd }} {{ ARGS }}

# [secrets]: 		Push all dotenv vault secrets to remote store
vault-push-all: (vault "wordpress" "push") (vault "nextjs" "push")

###: LICENSING =====================================================================================

org-tu-kleinweb := 'Temple University <kleinweb@temple.edu>'
org-roots := 'Roots Software Foundation LLC'

# [reuse]:		Apply the default license to files
alias reuse := reuse-gpl

[private]
reuse-with-roots +FILES: (reuse-dual org-roots FILES)

# [reuse]:		Annotate all plaintext note files with the documentation license
license-docs:
  fd --glob '**/*.{md,mdx,markdown,org}' -X \
    just reuse-cc {}

_annotate license +FILES:
  reuse annotate -l '{{license}}' -c '{{org-tu-kleinweb}}' --template=compact {{FILES}}

# [reuse]:		License the specified files as GPL
reuse-gpl +FILES: (_annotate 'GPL-3.0-or-later' FILES)

# [reuse]:		License the specified files as GPL/MIT
reuse-dual colicensor +FILES: (_annotate 'GPL-3.0-or-later OR MIT' ('-c ' + quote(colicensor) + ' ' + FILES))

# [reuse]:		License the specified files as non-commercial docs
reuse-cc +FILES: (_annotate  'CC-BY-NC-SA-4.0' FILES)

# [reuse]:		Release the specified files to public domain
reuse-public-domain +FILES: (_annotate  'CC0-1.0' FILES)


###: MEDIA =========================================================================================

##: References:
# - <https://ffmpeg.org/ffmpeg-utils.html#Time-duration>

# [media]: Capture a frame from a video file at the given `mm:ss` timestamp
vcap-thumb input time='00:00' ext='jpeg':
  ffmpeg -ss '{{time}}' -i {{ absolute_path(input) }} -frames 1 -f image2 \
    '{{ without_extension(input) }}-thumb.{{ext}}'

# [media]:		Capture the last frame from a video file
vcap-thumb-last input ext='jpeg':
  ffmpeg -sseof -1 -i {{ absolute_path(input) }} -update 1 -q:v 1 -f image2 \
    '{{ without_extension(input) }}-last-thumb.{{ext}}'
