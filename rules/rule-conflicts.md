# Rule Conflict Priority

If rules conflict, follow this priority:

1. Safety, data protection, secrets, and destructive-action rules
2. Explicit user request in the current message
3. Repository-specific rules (project CLAUDE.md)
4. Tool-specific rules
5. Style preferences

If the conflict affects correctness, data safety, secrets, git history, or
production systems, stop and ask before acting.
