# SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later

###: https://just.systems/man/en/

default:
  @just --list --unsorted --color=always | rg -v "    default"

##: feedback
icon-ok := '✔'
msg-ok := icon-ok + " OK"
msg-done := icon-ok + " Done"

##: legal/reuse
copyright := 'Temple University <kleinweb@temple.edu>'
default-license := 'GPL-3.0-or-later'
docs-license := 'CC-BY-SA-4.0'
public-domain-license := 'CC0-1.0'

##: binary cache
cachix-cache-name := env_var('CACHIX_CACHE_NAME')
cachix-exec := "cachix watch-exec --jobs 2 " + cachix-cache-name

##: directories/paths
prj-root := env_var('PRJ_ROOT')

# make node/yarn `package.json` runnables available to tasks
export PATH := "./node_modules/.bin:" + env_var('PATH')


###: LINTING/FORMATTING ========================================================

# <- Lint and format files
fmt *FILES=prj-root:
  treefmt --no-cache {{FILES}}

# <- Check Nix files for issues
check *FILES=prj-root: (_deadnix "check" FILES) (_statix "check" FILES)

# <- Write automatic linter fixes to files
fix *FILES=prj-root: (_deadnix "fix" FILES) (_statix "fix" FILES)

# <- Run `statix`
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

# <- Add the project default license header to the specified files
alias license := license-gpl

# <- Validate the project's licensing and copyright info
license-check:
  reuse lint

# <- Add a GPL-3.0-or-later license header to the specified files
license-gpl +FILES:
  reuse addheader -l {{default-license}} -c '{{copyright}}' {{FILES}}

# <- Add a CC-BY-SA-4.0 license header to the specified files
license-cc +FILES:
  reuse addheader -l {{docs-license}} -c '{{copyright}}' {{FILES}}

# <- Add a public domain CC0-1.0 license header to the specified files
license-public-domain +FILES:
  reuse addheader -l {{public-domain-license}} -c '{{copyright}}' {{FILES}}


###: MISC ======================================================================

##: References:
# - <https://ffmpeg.org/ffmpeg-utils.html#Time-duration>

# <- Capture a frame from a video file at the given `mm:ss` timestamp
vcap-thumb input time='00:00' ext='jpeg':
  ffmpeg -ss '{{time}}' -i {{ absolute_path(input) }} -frames 1 -f image2 \
    '{{ without_extension(input) }}-thumb.{{ext}}'

# Source: <https://superuser.com/a/1448673>
# <- Capture the last frame from a video file
vcap-thumb-last input ext='jpeg':
  ffmpeg -sseof -1 -i {{ absolute_path(input) }} -update 1 -q:v 1 -f image2 \
    '{{ without_extension(input) }}-last-thumb.{{ext}}'
