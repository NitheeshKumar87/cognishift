<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Mandatory Project Progress Tracking Rule

After completing any meaningful implementation task, feature, refactor, database change, architecture change, or bug fix, the AI must review and update `docs/PROJECT_STATUS.md` before reporting the task as complete.

The update should include only information that actually changed.

`docs/PROJECT_STATUS.md` must track:
1. Current project phase
2. Phase completion status
3. Current subtask
4. Completed features
5. Features currently in progress
6. Remaining work
7. Current working user flow
8. Important architecture decisions
9. Supabase/backend status
10. Known issues or limitations
11. Last verified checks
12. Exact next recommended task

### Rules for Status Tracking:
- Do not claim a feature is complete unless it has been implemented and verified.
- Do not change the project phase unless the phase criteria are actually satisfied.
- Keep `docs/PROJECT_STATUS.md` concise.
- Remove outdated status information when it becomes obsolete.
- Preserve historical architecture decisions only when they remain relevant.
- After every meaningful task, update the "Last Updated" timestamp.
- `docs/PROJECT_STATUS.md` must function as a handoff document for a completely new AI conversation.

