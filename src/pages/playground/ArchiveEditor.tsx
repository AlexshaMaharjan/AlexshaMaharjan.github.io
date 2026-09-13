import { useMemo, useState } from "react";
import collageCards from "@/lib/playground/collage";
import type { PieceContent } from "@/lib/playground/collage";
import type { Locale } from "@/lib/i18n";

/**
 * The archive's own editing form (`MILESTONE-022` task 11).
 *
 * ## Why this exists, and why it is not a CMS
 *
 * The owner's request is *"a practical editing form/interface where I can edit
 * the relevant image information myself rather than having to modify the code
 * manually"*, and the honest reading of "practical" here is the smallest thing
 * that removes the code from the loop. This site is a static build published to
 * GitHub Pages by `npm run deploy`; there is no server to write to and no
 * database to write into, and adding either would be a second system to keep
 * alive for forty-eight captions.
 *
 * So the form edits the **file**. `src/lib/playground/pieces.json` is the
 * archive's words (`PieceContent`), this is a form over it, and saving posts
 * the whole record back to a middleware that writes the file
 * (`vite.config.ts`). Three things follow, and all three are the point:
 *
 * - **it runs on `npm run dev` only.** `apply: "serve"` on the plugin and
 *   `import.meta.env.DEV` on the route, so the editor is not in the published
 *   bundle and the endpoint does not exist in production. A form that could
 *   write content on a live static site would be a form anybody could write
 *   content with.
 * - **every edit is a diff.** The file is in the repository, so a change is
 *   reviewable, revertable with `git checkout`, and deployed by the same
 *   command as everything else. Nothing is stored anywhere this project cannot
 *   see.
 * - **the existing gates still apply.** `content-audit.mjs` reads the merged
 *   collage, so a caption emptied here fails the build exactly as it would have
 *   done when it lived in the TypeScript.
 *
 * ## The German
 *
 * The owner writes English (*"I will provide/write the English content only…
 * your job should be to refine the English wording where necessary, create the
 * corresponding natural German version"*). A form cannot write the German, and
 * filling it with a machine translation would be worse than leaving it: the
 * rule for this site is that the German reads as German rather than as an
 * English sentence with German words in it.
 *
 * What the form does instead is **mark it**. Editing an English field sets
 * `deStale` on that piece, the piece shows as needing a German pass, and the
 * count is at the top of the list — so the next session opens twelve pieces
 * rather than re-reading forty-eight. The German fields stay editable, and the
 * flag clears itself the moment somebody edits the German or clears it by hand.
 */

type Draft = Record<string, PieceContent>;

const FIELDS = ["caption", "description", "alt"] as const;
const LISTS = ["tools", "tags"] as const;

/** The label and the hint for each field, in the order the form shows them. */
const LABELS: Record<string, { label: string; hint: string }> = {
  caption: { label: "Caption", hint: "The piece's title. Shown as the viewer's heading." },
  description: { label: "Description", hint: "A sentence or two about the work itself." },
  alt: { label: "Alt text", hint: "What the picture shows, for somebody who cannot see it." },
  made: { label: "Made", hint: "The year. `[ year ]` marks one nobody has filled in yet." },
  tools: { label: "Tools", hint: "Comma separated: apps, materials, cameras." },
  tags: { label: "Type", hint: "Comma separated: painting, graphic design, 3D…" },
};

const blank = (): PieceContent => ({ caption: { en: "", de: "" }, alt: { en: "", de: "" } });

function Field({
  id,
  label,
  hint,
  value,
  rows,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  rows: number;
  onChange: (next: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-ink-muted">{label}</span>
      {rows > 1 ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1.5 w-full rounded-[8px] border border-card-border bg-white px-3 py-2 text-[14px] leading-[1.5] text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-focus"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1.5 w-full rounded-[8px] border border-card-border bg-white px-3 py-2 text-[14px] text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-focus"
        />
      )}
      {hint ? <span className="mt-1 block text-[12px] text-ink-muted">{hint}</span> : null}
    </label>
  );
}

export default function ArchiveEditor() {
  /*
   * The pieces, in the order the deck shows them, each carrying the card it is
   * on so the list can be grouped by colour the way the viewer's filter is.
   * Read once: `collageCards` is the merged export, so what the form starts
   * from is exactly what the site is rendering.
   */
  const pieces = useMemo(
    () =>
      collageCards.flatMap((card) =>
        card.slots.map((slot) => ({
          src: slot.src,
          card: card.name.en,
          accent: card.accent,
          content: {
            caption: slot.caption,
            alt: slot.alt,
            ...(slot.description ? { description: slot.description } : {}),
            ...(slot.made ? { made: slot.made } : {}),
            ...(slot.tools ? { tools: slot.tools } : {}),
            ...(slot.tags ? { tags: slot.tags } : {}),
            ...(slot.deStale ? { deStale: slot.deStale } : {}),
          } as PieceContent,
        })),
      ),
    [],
  );

  const [draft, setDraft] = useState<Draft>(() =>
    Object.fromEntries(pieces.map((piece) => [piece.src, piece.content])),
  );
  const [selected, setSelected] = useState(pieces[0]?.src ?? "");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const piece = pieces.find((entry) => entry.src === selected);
  const content = draft[selected] ?? blank();
  const pending = pieces.filter((entry) => draft[entry.src]?.deStale).length;

  /**
   * One edit.
   *
   * Touching an English field marks the German stale and touching a German one
   * clears it — which is the whole German workflow, expressed as the only two
   * things that can happen to a pair of strings.
   */
  const edit = (mutate: (current: PieceContent) => PieceContent, locale?: Locale) => {
    setDraft((current) => {
      const next = mutate(current[selected] ?? blank());
      if (locale === "en") next.deStale = true;
      if (locale === "de") delete next.deStale;
      return { ...current, [selected]: next };
    });
    setDirty(true);
    setStatus(null);
  };

  const setPair = (field: (typeof FIELDS)[number], locale: Locale, value: string) =>
    edit((current) => {
      const pair = { ...(current[field] ?? { en: "", de: "" }), [locale]: value };
      return { ...current, [field]: pair };
    }, locale);

  const setList = (field: (typeof LISTS)[number], locale: Locale, value: string) =>
    edit((current) => {
      const items = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const pair = { ...(current[field] ?? { en: [], de: [] }), [locale]: items };
      return { ...current, [field]: pair };
    }, locale);

  const save = async () => {
    setStatus("Saving…");
    try {
      const response = await fetch("/__archive-content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(draft, null, 2),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string; pieces?: number };
      if (!response.ok || !result.ok) throw new Error(result.error ?? String(response.status));
      setDirty(false);
      setStatus(`Saved ${result.pieces} pieces to src/lib/playground/pieces.json`);
    } catch (error) {
      /*
       * The fallback is not decoration. The endpoint only exists under
       * `npm run dev`, so anybody opening this build another way gets a file
       * they can paste over `pieces.json` by hand rather than a dead button.
       */
      setStatus(`Could not write the file (${String(error)}). Use Download instead.`);
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2) + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pieces.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-page pb-24" style={{ paddingTop: "var(--page-top)" }}>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-surface-2 pb-5">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink-muted">
            Archive content — development only
          </p>
          <h1 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
            {pieces.length} pieces
          </h1>
          <p className="mt-1 text-[14px] text-ink-secondary">
            Writes <code className="font-mono text-[13px]">src/lib/playground/pieces.json</code>.
            {pending > 0 ? ` ${pending} waiting for a German pass.` : " German is up to date."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={download}
            className="tap-target rounded-full border border-card-border px-4 py-2 text-[14px] text-ink-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Download
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!dirty}
            className="tap-target rounded-full bg-accent px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#1233c4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dirty ? "Save changes" : "Saved"}
          </button>
        </div>
      </header>

      {status ? (
        <p role="status" className="mt-4 rounded-[8px] bg-surface px-4 py-2.5 text-[14px] text-ink-body">
          {status}
        </p>
      ) : null}

      <div className="mt-6 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* The list, grouped by the card's colour — the same four groupings the
            viewer filters by, so "which card is this on" is never a question. */}
        <nav aria-label="Pieces" className="max-h-[70svh] overflow-y-auto pr-1">
          <ul className="m-0 list-none space-y-0.5 p-0">
            {pieces.map((entry) => {
              const here = entry.src === selected;
              const stale = draft[entry.src]?.deStale;
              return (
                <li key={entry.src}>
                  <button
                    type="button"
                    onClick={() => setSelected(entry.src)}
                    aria-current={here ? "true" : undefined}
                    className={`flex w-full items-center gap-2 rounded-[8px] px-2 py-1.5 text-left text-[13px] transition-colors ${
                      here ? "bg-surface text-ink" : "text-ink-secondary hover:bg-surface/60"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.accent }}
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {draft[entry.src]?.caption.en || entry.src}
                    </span>
                    {stale ? (
                      <span className="shrink-0 rounded-full bg-accent-soft px-1.5 py-0.5 font-mono text-[10px] text-accent">
                        DE
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {piece ? (
          <section className="min-w-0">
            <div className="flex items-start gap-4">
              <img
                src={piece.src}
                alt=""
                className="h-24 w-24 shrink-0 rounded-[8px] border border-card-border object-cover"
              />
              <div className="min-w-0">
                <p className="font-mono text-[12px] text-ink-muted">{piece.src}</p>
                <p className="mt-1 text-[13px] text-ink-secondary">
                  On the <span style={{ color: piece.accent }}>{piece.card}</span> card.
                </p>
                <label className="mt-2 inline-flex items-center gap-2 text-[13px] text-ink-secondary">
                  <input
                    type="checkbox"
                    checked={Boolean(content.deStale)}
                    onChange={(event) =>
                      setDraft((current) => {
                        const next = { ...(current[selected] ?? blank()) };
                        if (event.target.checked) next.deStale = true;
                        else delete next.deStale;
                        setDirty(true);
                        return { ...current, [selected]: next };
                      })
                    }
                  />
                  German needs a pass
                </label>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {FIELDS.map((field) => (
                <div key={field} className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id={`${field}-en`}
                    label={`${LABELS[field]!.label} — English`}
                    hint={LABELS[field]!.hint}
                    rows={field === "caption" ? 1 : 3}
                    value={content[field]?.en ?? ""}
                    onChange={(value) => setPair(field, "en", value)}
                  />
                  <Field
                    id={`${field}-de`}
                    label={`${LABELS[field]!.label} — Deutsch`}
                    rows={field === "caption" ? 1 : 3}
                    value={content[field]?.de ?? ""}
                    onChange={(value) => setPair(field, "de", value)}
                  />
                </div>
              ))}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="made"
                  label={LABELS.made!.label}
                  hint={LABELS.made!.hint}
                  rows={1}
                  value={content.made ?? ""}
                  onChange={(value) =>
                    edit((current) => ({ ...current, made: value }))
                  }
                />
                <div />
              </div>

              {LISTS.map((field) => (
                <div key={field} className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id={`${field}-en`}
                    label={`${LABELS[field]!.label} — English`}
                    hint={LABELS[field]!.hint}
                    rows={1}
                    value={(content[field]?.en ?? []).join(", ")}
                    onChange={(value) => setList(field, "en", value)}
                  />
                  <Field
                    id={`${field}-de`}
                    label={`${LABELS[field]!.label} — Deutsch`}
                    rows={1}
                    value={(content[field]?.de ?? []).join(", ")}
                    onChange={(value) => setList(field, "de", value)}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
