# SPDX-FileCopyrightText: 2022-2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later

###: REUSE/Licensing Tasks

org-roots := 'Roots Software Foundation LLC'

# [reuse]:		Apply the default license to files
alias l := l-gpl

[private]
l-with-roots +FILES: (l-dual org-roots FILES)

# [reuse]:		Annotate all plaintext note files with the documentation license
l-docs:
  fd --glob '**/*.{md,mdx,markdown,org}' -X \
    just l-cc {}

_annotate license +FILES:
  reuse annotate -l '{{license}}' -c '{{org-self}}' --template=compact --skip-existing {{FILES}}

# [reuse]:		License the specified files as GPL
l-gpl +FILES: (_annotate 'GPL-3.0-or-later' FILES)

# [reuse]:		License the specified files as GPL/MIT
l-dual colicensor +FILES: (_annotate 'GPL-3.0-or-later OR MIT' ('-c ' + quote(colicensor) + ' ' + FILES))

# [reuse]:		License the specified files as non-commercial docs
l-cc +FILES: (_annotate  'CC-BY-NC-SA-4.0' FILES)

# [reuse]:		Release the specified files to public domain
l-public-domain +FILES: (_annotate  'CC0-1.0' FILES)
