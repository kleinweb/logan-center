# SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later

###: https://just.systems/man/en/

###: Workspace Tasks

!include .just/common.justfile
!include .just/reuse.justfile

###: DEVELOPMENT ===================================================================================

# [dev]: 		Install all workspace dependencies
install:
  yarn install
  for dir in {{ composer-pkg-dirs }}; do \
    @printf "=== %s ===\n\n" quote( $dir )  \
    cd $dir && composer update --lock && composer install \
  done

# [dev]: 		Run command in app scope
focus app +ARGS:
  cd {{ join( "apps", app ) }} && {{ ARGS }}


###: LINTING/FORMATTING ============================================================================

# [fmt]:		Format files with treefmt
fmt *FILES=prj-root:
  treefmt --no-cache {{FILES}}


###: MEDIA =========================================================================================

##: References:
# - <https://ffmpeg.org/ffmpeg-utils.html#Time-duration>

optim-jpeg +FILES:
  jpegoptim --strip-all {{ FILES }}

optim-png +FILES:
  oxipng --opt=3 --strip=safe {{ FILES }}

optim-svg +FILES:
  svgo {{ FILES }}

# [media]: Capture a frame from a video file at the given `mm:ss` timestamp
vcap-thumb input time='00:00' ext='jpeg':
  ffmpeg -ss '{{time}}' -i {{ absolute_path(input) }} -frames 1 -f image2 \
    '{{ without_extension(input) }}-thumb.{{ext}}'

# [media]:		Capture the last frame from a video file
vcap-thumb-last input ext='jpeg':
  ffmpeg -sseof -1 -i {{ absolute_path(input) }} -update 1 -q:v 1 -f image2 \
    '{{ without_extension(input) }}-last-thumb.{{ext}}'
