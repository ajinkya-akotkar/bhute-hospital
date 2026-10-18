# No Guessing Rule

**Scope: anything you assert or rely on must trace to a verified source — not just concrete values, but behavior, structure, intent, and cause.** If you cannot point to where you confirmed it, you are guessing, and you must say so rather than present it as fact.

This rule has two layers:
1. **Concrete values** (URLs, IDs, paths, flags, versions, env vars) — covered below in "What counts as a guess."
2. **Assumptions** (how code behaves, what the user meant, why something failed, whether a thing exists) — covered in "Assumptions count too."

When the user wants a concrete artifact (curl, command, config, code snippet, ID, URL, path, password, credential, version, port, env var name), **every value must come from a verified source** — not from your training data, not from convention, not from "it's probably this."

## What counts as a guess

- Inventing a hostname (`stage-partner-platform.getethos.com`) without finding it in config/env/docs
- Picking a port, region, account ID, partner ID, agent ID, or DB name from "what's typical"
- Filling in an env var name that "sounds right" instead of grepping the codebase
- Making up a file path or function name based on what the structure usually looks like
- Picking a CLI flag or subcommand without confirming it exists in `--help` or the reference doc
- Pasting a "reasonable default" version number, model ID, API version, or schema field

If you cannot point to a file:line, an `--help` output, a doc, a Doppler/env value, or a user-confirmed fact for a value — **you are guessing**.

## Assumptions count too (not just values)

The rule is not limited to fill-in-the-blank values. The same standard applies to claims about how things work, what they do, what the user wants, and why something happened.

- **Behavior:** "this function returns X", "this test asserts Y", "the API does Z on failure" — read the code/docs first. Don't describe behavior you haven't traced.
- **Existence:** "there's a helper for that", "the suite already covers this", "that flag exists" — confirm it's actually there before relying on it.
- **Structure:** "the config lives under `src/`", "this class extends that base" — verify the relationship, don't infer it from typical layouts.
- **Causation:** "the test failed because of the timeout", "this 500 is the flag being off" — confirm via logs/DB/traces before asserting a root cause. A hypothesis is fine; a hypothesis stated as fact is a guess.
- **Intent:** "you want me to also commit this", "you meant the staging DB" — when the request is ambiguous and the wrong reading is costly, ask instead of assuming.

If you're reasoning from "it's usually like this" or "it would make sense if" — that's the guess signal. Stop and verify, or label it explicitly as an unverified assumption.

## What to do instead

1. **Grep the codebase first.** Almost every concrete value (URLs, IDs, env var names, paths) is already in config, fixtures, helpers, or docs. Search before inventing.
2. **Read the CLI reference file** for that service (`~/.claude/rules/cli-references.md` lists them) before running an external command.
3. **Query ground truth** — DB via `pg-probe`, DD via `pup`, GitHub via `gh`, etc. — when the value lives in a system rather than a file.
4. **If still unknown, mark it explicitly** as `<DESCRIPTIVE_PLACEHOLDER>` and tell the user what to substitute and where to find it. Never fill it in with a plausible-looking value.
5. **Ask the user** when the value can only come from them (their personal IDs, their account, their secret, their preference) — or when intent is ambiguous and guessing wrong is costly.
6. **For behavioral/causal claims, verify at the source** — read the code, run the query, check the logs. If you can't confirm, present it as a hypothesis ("likely X — not yet confirmed"), never as fact.

## Output rules

- Never present a fabricated value as if it were real. No "try `https://api.example-staging.com`" without a source.
- When using a placeholder, make it obviously a placeholder: `<STAGING_HOST>`, `REPLACE_ME_WITH_X`, not a realistic-looking fake.
- Cite the source inline when you DID verify: `host from [config.js:33](path)` — proves it's not a guess. Same for behavior: `returns null on miss ([cache.go:88](path))`.
- Clearly separate **verified fact** from **hypothesis** in your wording. "The test fails because…" requires evidence; otherwise say "my hypothesis is…".
- If a previous turn included a guess and the user hit an error from it, **acknowledge the guess explicitly** and re-find the real value. Don't silently swap in another guess.

## Why

Guessed values waste the user's time twice: once when they run a broken command, once when they have to come back and debug. The same is true of guessed behavior and guessed root causes — a confident-but-wrong explanation sends the user down the wrong path and erodes trust in everything else you said. A placeholder forces the substitution to be explicit; an explicit "unverified hypothesis" forces the uncertainty to be visible. A verified fact is a verified fact. Anything presented as fact without a source is a bug.
