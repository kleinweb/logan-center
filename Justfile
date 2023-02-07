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

# make node/yarn `package.json` runnables available to tasks
export PATH := "./node_modules/.bin:" + env_var('PATH')


###: LINTING/FORMATTING ========================================================

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

# <- Run `deadnix` with sane options
_deadnix action +FILES=prj-root:
  @deadnix \
    {{ if action == "fix" { "--edit" } else { "--fail" } }} \
    --no-underscore \
    --no-lambda-pattern-names \
    {{FILES}}


###: LICENSING =================================================================

copyright := 'Temple University <kleinweb@temple.edu>'

# Add the project default license header to the specified files
[private]
alias license := license-gpl

# [reuse]:		Validate the project's licensing and copyright metadata
license-check:
  reuse lint

# [reuse]:		Annotate all plaintext note files with the documentation license
license-docs:
  fd --glob '**/*.{md,mdx,markdown,org}' -X \
    just license-cc {}

_annotate license +FILES:
  reuse annotate -l {{license}} -c '{{copyright}}' --template=compact {{FILES}}

# [reuse]:		Annotate the specified files with a GPL-3.0-or-later license header
license-gpl +FILES: (_annotate 'GPL-3.0-or-later' FILES)

# [reuse]:		Annotate the specified files with the standard documentation license header
license-cc +FILES: (_annotate  'CC-BY-NC-SA-4.0' FILES)

# [reuse]:		Annotate the specified files with a public domain license header
license-public-domain +FILES: (_annotate  'CC0-1.0' FILES)


###: MEDIA ======================================================================

##: References:
# - <https://ffmpeg.org/ffmpeg-utils.html#Time-duration>

# [media]:	Capture a frame from a video file at the given `mm:ss` timestamp
vcap-thumb input time='00:00' ext='jpeg':
  ffmpeg -ss '{{time}}' -i {{ absolute_path(input) }} -frames 1 -f image2 \
    '{{ without_extension(input) }}-thumb.{{ext}}'

# [media]:		Capture the last frame from a video file
vcap-thumb-last input ext='jpeg':
  ffmpeg -sseof -1 -i {{ absolute_path(input) }} -update 1 -q:v 1 -f image2 \
    '{{ without_extension(input) }}-last-thumb.{{ext}}'
