# Repo Resolution Rule

When the user names a repo (e.g. "checkout in dev_track_tests", "open ethos repo"), **always resolve it to a path inside the current working directory first** — do not jump to other locations on disk.

## Resolution Order

1. **Current working directory** — check `./<repo_name>/` (and any `additional working directories` listed in the environment block).
2. If multiple matches exist across working dirs, list them in a table and ask the user which one.
3. Only fall back to `find ~ -maxdepth 4 -type d -name "<repo>"` if step 1 returns nothing.
4. Never silently operate on a repo outside the working dir set, even if it's the first one `find` returns.

## Verification Before Acting

Before running any git command (`checkout`, `pull`, `merge`, `reset`, etc.) on a resolved repo:

- Print the absolute path you resolved to.
- Run `git status --short` and `git branch --show-current`.
- If the working tree is dirty, surface the dirty files and ask before proceeding — never auto-stash or auto-discard.

## Why

The user keeps multiple checkouts of the same repo (e.g. `~/Desktop/dev_track_tests` vs `~/Desktop/A codebase/dev_track_tests`). Operating on the wrong one wastes time and can mask real local state. The working dir is the source of truth for the active session.
