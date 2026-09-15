export default function PrintButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`flex h-10 items-center rounded-full bg-ink px-6 text-[13.5px] font-medium text-white transition-colors hover:bg-accent print:hidden ${className ?? ""}`}
    >
      {label}
    </button>
  );
}
