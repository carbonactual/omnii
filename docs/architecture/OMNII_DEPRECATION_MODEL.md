# OMNII DEPRECATION MODEL

Deprecation retires a contract without silently destroying its history or active consumers.

## Flow
`announce → assess dependencies → freeze new adoption → migrate → observe → retire`

Deprecation records authority, effective dates, replacement contract, migration path, compatibility window, affected consumers, and final retirement evidence.