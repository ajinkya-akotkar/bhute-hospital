# Engineering Decision Workflow

Before changing code:

- Understand the existing implementation and identify the root cause. If the root cause is not clear, say that and verify more instead of guessing.
- Read the directly relevant files and enough surrounding code to understand the behavior being changed.
- For non-trivial bugs, behavior changes, or multi-file work, consider at least two approaches and choose the simplest correct one.
- Do not turn tiny edits into process-heavy writeups; apply this rule in proportion to task risk.

While changing code:

- Make the smallest change that satisfies the request and fits the existing architecture.
- Prefer readability and correctness over clever abstractions or premature optimization.
- Keep unrelated cleanup separate unless it is required for the requested change.

Before finishing:

- Review the changed lines as if reviewing a pull request.
- Check edge cases, naming consistency, error handling, and likely regressions.
- Run the smallest relevant verification, or clearly state why verification could not be run.
