/**
 * One list of tags per project, read by both the case-study data files and the
 * homepage's project grid (`dictionary.projects`).
 *
 * These used to be two independent hard-coded arrays — `CaseStudyContent.tags`
 * here and `ProjectCopy.tags` in `dictionaries/en.ts`/`de.ts` — and had drifted
 * on all six projects: different wording, different counts, some tags present
 * on one side and missing on the other. Tags are locale-invariant on this site
 * (they are already English words in both `en.ts` and `de.ts`), so one map
 * keyed by slug is the whole fix — both consumers read the same array and
 * cannot drift again.
 */
export const PROJECT_TAGS = {
  afono: ["Brand Identity", "Fashion Graphics", "UI/UX Design"],
  surugami: ["Brand Identity", "Print Design", "Web Design"],
  wikimind: ["Brand Identity", "UI/UX Design", "Web Design"],
  "sync-fm": ["UI/UX Design", "Interaction Design", "Audio Experience"],
  "barrier-free-kitchen": ["Inclusive Design", "Design Research", "Spatial Design"],
  "qis-portal": ["UX Research", "Information Architecture", "UI/UX Design"],
} as const satisfies Record<string, readonly string[]>;
