# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: CC0-1.0

# shellcheck disable=2005
echo "$(head -n1 "$1")" | commitlint --color
