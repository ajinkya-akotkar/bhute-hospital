# Code Style Rules

## General

- Write code that is easy to read first, then optimize only when there is a clear reason.
- Prefer straightforward control flow, clear names, and small functions over clever abstractions.
- When proposing or editing code, choose a simple implementation that still handles the real edge cases.
- Avoid over-engineering, excessive indirection, and dense one-liners unless they clearly improve clarity.
- If a decision has meaningful trade-offs, call them out simply and ask before choosing a path.

## Java

The user knows JavaScript and Python well but is not a Java expert.
Write all Java code as if the reader understands logic but not Java idioms.

- No method chaining beyond 2 levels
- Every non-obvious step gets a plain-English inline comment
- Explicit variable names — `agentId` not `aid`, `responseBody` not `rb`
- Break multi-step actions into named variables — never nest method calls deeply
- Use helper methods with descriptive names (e.g. `createValidCase()`, `waitUntilCheckPasses()`)
- Plain for-loops instead of lambdas/streams unless the stream is trivial (one operation)
- One-line comment above each `@Test` method explaining what it validates in plain English
- No overloading or inheritance tricks that require Java knowledge to follow
- When Java syntax differs from JS/Python in a non-obvious way, add a comment explaining it
  - Example: `// static means we don't need to create an object to call this`
  - Example: `// throws means this method can fail — the caller must handle the error`
