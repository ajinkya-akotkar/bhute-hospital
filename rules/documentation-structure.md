# Claude Project Instructions — Documentation Structure

Apply these rules whenever you create, edit, extend, or rewrite any
documentation: test plans, PRDs, runbooks, design docs, API specs, ADRs,
or context/reference docs meant to be consumed by an AI agent later.

Primary goal: every doc should be **scannable by an AI agent cold** —
no prior session context, no prose wading. Front-loaded facts, tables
over prose, every claim traceable to a source file.

## Document Shape

Every document is a strict tree. Pick the hierarchy that matches the
doc type, keep parent-child nesting, never place content outside the tree.

Hierarchy by doc type:

  Test Plan:   Plan → Feature → Scenario → Test Case → Steps
  PRD:         Product → Epic → User Story → Acceptance Criteria
  Runbook:     Service → Procedure → Step → Substep
  Design Doc:  System → Component → Decision → Rationale
  API Spec:    API → Resource → Endpoint → Parameters
  Context Doc: Domain → Component → Fact → Source reference

Map to heading levels: H1 (root) → H2 → H3 → H4. Never skip a level.
Never go deeper than H4 — use numbered lists below H4.

## Frontmatter

Start every document with YAML frontmatter:

```
---
doc_id: <PREFIX>-NNN
type: test-plan | prd | runbook | design-doc | api-spec | adr | context-doc
product: "<name>"
version: "<semver>"
author: "<owner>"
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
status: draft | review | approved | deprecated
source_repo: "<repo path if doc describes another codebase>"   # optional
source_language: "<Go | Java | Python | ...>"                  # optional
companion_doc: "./other-doc.md"                                # optional
tags: [<master tag list>]
---
```

After the fields, add a single HTML comment block covering:
- Reading order (what section to read first)
- Conventions (abbreviations, path-ref format)
- Link to companion doc(s) if any
- ID legend

Keep it short — ~15 lines max. Example:

```markdown
<!--
AI-AGENT-READABLE DESIGN DOC

READING ORDER
  1. Read CMP-00 (TL;DR) first — answers 90% of agent queries.
  2. Jump Table below maps any question to its CMP section.
  3. Every fact has a (path:line) reference rooted at <repo>/.

CONVENTIONS
  - (file:NN) → line number in <repo>/<file>
  - Full / Partial / None → domain-specific enum values

COMPANION DOC
  - ./other-doc.md — covers the paired topic.
-->
```

## Jump Table (when a doc has > 6 H3 sections)

Immediately after the purpose blockquote (and before any content),
add a "Jump Table" section:

```markdown
## Jump Table

| Need to know… | Go to |
|---------------|-------|
| What triggers X? | [CMP-01](#cmp-01--trigger-list) |
| End-to-end flow | [CMP-02](#cmp-02--end-to-end-flow) |
| Terms / acronyms | [Glossary](#glossary) |
```

Every H3 with substantive content should appear in the Jump Table.
Use markdown anchor links (lowercase, hyphenated, drop punctuation).

## TL;DR Table

Every doc over ~300 lines starts with a TL;DR section (CMP-00 or
equivalent) as a table — not prose — with columns:

| Question | Answer | Section |

The "Section" column points readers to the full treatment. This lets an
agent get the one-line answer and know exactly where to drill.

## IDs

Fully qualified, dot-separated:

  Level 1:  X-NNN              (F-001, E-001, SVC-001, CMP-01)
  Level 2:  X-NNN.Y-NN         (F-001.S-01, E-001.US-01)
  Level 3:  X-NNN.Y-NN.Z-NN    (F-001.S-01.TC-01)

Child IDs contain parent ID as prefix. No duplicates across the document.

## Node Metadata

Every H2, H3, H4 node gets a fenced YAML block immediately after the
heading with required fields for that node type. Only structured fields
— no prose inside YAML blocks. Prefer 3-6 fields; anything more belongs
in the body.

## Code & File References

Every claim that refers to source code must be traceable to a file +
line. Formats:

- **Inline:** `path/to/file.ext:NN` or `path/to/file.ext:NN-MM`
- **Table cell:** split into "File" and "Line" columns if many rows share files
- **Markdown link (preferred in user-facing rendering):**
  `[payments_service.go:84](ethos/partners/mi6/app/payments_service.go:84)`

Rules:
- One canonical root per doc (declared in frontmatter `source_repo`).
  Use paths relative to that root; absolute-from-repo only when crossing roots.
- No bare `grep for X` — always give the concrete path.
- If a fact comes from a range, use `:start-end`, not `:start+`.
- When referencing line numbers in tables, don't repeat the filename in
  every row — put it in a column header or the section's YAML block.

## Conventions Block

When a doc repeats the same abbreviation more than 3 times (e.g. a
status enum value, a sentinel constant), declare it once in the
conventions comment at the top and don't re-explain inline. The
Glossary at the end is the canonical definition.

## Tags

- Always YAML arrays: `tags: [smoke, regression]`
- Never backtick-wrapped inline tags in prose
- Every tag used anywhere must exist in the frontmatter master list
- Lowercase, hyphenated, no spaces

## Token Efficiency

Keep documents compact without losing facts.

- **Tables beat prose** for any structured data (enums, flags, mappings,
  cases, columns). If you catch yourself writing "first, … second, …",
  convert to a table.
- **No redundant wrappers** — if a section has one child, flatten it.
- **No preamble prose** — skip "This section describes…" filler.
- **Bullet lists** for preconditions, constraints, non-table steps.
- **One blank line** between sections, never more.
- **No HTML** — native Markdown only.
- **Abbreviate in metadata, define in glossary:**
    DO:   `priority: P0` + glossary entry for P0
    DON'T: `priority: P0 — Critical, must pass before release`
- **Front-load** — most important content first in every section so
  truncated context windows still capture key information.
- **Don't restate YAML metadata** in the prose body.
- **Don't narrate what a table shows** — let the table speak.

Good vs bad:

```markdown
<!-- BAD: prose -->
The system triggers a clawback when the post activation internal status
is one of 14 specific values, which are: CANCELED, LAPSED, SURRENDERED…

<!-- GOOD: table -->
| # | Status | Constant | Line |
|---|--------|----------|------|
| 1 | CANCELED | `StatusCanceled` | 105 |
| 2 | LAPSED  | `StatusLapsed`   | 112 |
```

## Prose Sections

Use blockquotes for purpose/scope at the document top:

> **Purpose:** One sentence.
> **Scope:** What is covered.
> **Out of scope:** What is not.

Keep lines under 80 characters (aids diff review, doesn't matter to the agent).

## Cross-Linking Multi-Doc Sets

When two or more docs cover related topics:

- Declare the pair in frontmatter: `companion_doc: ./other.md`
- Link by **relative path** from the doc, not absolute filesystem paths.
- In the companion doc's Jump Table, include a row pointing to the
  other doc for its specialty ("For rules & math → see companion doc").
- Don't duplicate content across docs — one doc owns each fact, the
  other references it.
- If more than 3 docs share a folder, prefer a small `README.md` index,
  **only** if the user asks for one. Don't auto-create indexes.

## Closing Sections

End with whichever apply (skip silently if not):

1. **Summary Table** — counts/status per top-level node (for test plans, PRDs).
2. **Entry & Exit Criteria** — start and done conditions (only for
   test plans, runbooks, or release checklists).
3. **Risks & Mitigations** — table: Risk | Likelihood | Impact | Mitigation
   (only for design docs and PRDs that have real risk surface).
4. **Glossary** — *mandatory*. Every abbreviation, prefix, priority label,
   tag, and domain term used anywhere in the document. Alphabetize.
   Deduplicate — one row per term, even if referenced many places.

Don't invent sections the doc type doesn't warrant.

## Consistency

- Every node of the same type has identical fields.
- If one test case has preconditions, all test cases have preconditions.
- If one user story has acceptance criteria, all user stories do.
- No mixing formats within the same tree level.

## NFR Separation

Never embed non-functional requirements (timing, load, performance)
inside functional nodes. Use dedicated nodes with `type: non-functional`
or `type: performance`.

## When the User Asks for a New Document

1. Identify the doc type from the request.
2. Pick the matching hierarchy.
3. Generate the full document following every rule.
4. Verify before output:
   - Frontmatter complete
   - Conventions comment present
   - Jump Table present (if > 6 H3 sections)
   - TL;DR table present (if > 300 lines)
   - Every H2/H3/H4 has a YAML metadata block
   - Every source reference uses `path:line` format
   - IDs fully qualified, no duplicates
   - Glossary covers every abbreviation and acronym used
   - Tags consistent with frontmatter master list
5. Output only the finished document — no process explanation unless asked.

## When the User Asks to Rewrite or Tighten an Existing Doc

Goal: same facts, better readability.

1. **Preserve every fact** — every line number, every enum value,
   every code reference, every example. Do not drop claims even if
   they seem minor.
2. Add a Jump Table if the doc has > 6 H3 sections.
3. Convert prose steps to tables where possible.
4. Normalize code refs to `path:line` format consistently.
5. Alphabetize and deduplicate the glossary.
6. Bump `version` (semver minor for restructures, major for content rewrites).
7. Update `last_updated`.
8. If moving a doc into a folder, update `companion_doc` relative paths
   in both the moved doc and any doc that references it.

## When the User Asks to Move Docs

Default: move files as-is, then tighten for AI readability in-place.
Do NOT create a folder README unless explicitly asked. Do NOT
consolidate multiple docs into one — keep separate docs separate.
