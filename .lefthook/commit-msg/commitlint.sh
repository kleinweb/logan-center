# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later

# shellcheck disable=2005
echo "$(head -n1 "$1")" | commitlint --color
