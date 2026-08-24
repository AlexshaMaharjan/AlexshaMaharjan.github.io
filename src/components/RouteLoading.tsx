/**
 * Shown while a lazy page's chunk is on its way (`ISSUE-020`). Before this,
 * `Suspense` had `fallback={null}` and a first visit to a case study — the
 * largest chunk on the site — showed header, blank, footer with no sign that
 * anything was happening.
 *
 * A 2px bar rather than a spinner: it says "loading" without pretending to
 * know how long. Under `prefers-reduced-motion` the global kill-switch stops
 * it moving, which leaves a static bar and the status text below.
 */
export default function RouteLoading({ label }: { label: string }) {
  return (
    <div role="status" aria-live="polite" className="pt-[var(--page-top)]">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block h-[2px] w-full overflow-hidden bg-surface-2">
        <span className="block h-full w-1/4 bg-accent [animation:route-loading_1.1s_ease-in-out_infinite]" />
      </span>
    </div>
  );
}
