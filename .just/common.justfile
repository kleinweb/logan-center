# SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later

###: Common Setup

default:
  @just --unstable --list --unsorted --color=always | rg -v "    default"

site-title := 'Logan Center for Urban Investigative Reporting'
admin-email := 'kleinweb+logancenter@temple.edu'
org-self := 'Temple University <kleinweb@temple.edu>'

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
wp-content-dir := wp-dir / "web/app"

# make node/yarn `package.json` runnables available to tasks
export PATH := join(node-modules, '.bin') + ":" + env_var('PATH')
