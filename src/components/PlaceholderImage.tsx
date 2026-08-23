export default function PlaceholderImage({
  aspect,
  caption,
  className = "",
}: {
  aspect: string;
  caption: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${caption.replace(/^\[\s*|\s*\]$/g, "")}`}
      style={{
        aspectRatio: aspect,
        background: "repeating-linear-gradient(45deg,#F2F3F5 0 10px,#EDEFF3 10px 20px)",
      }}
      className={`flex items-center justify-center rounded-[10px] border border-card-border ${className}`}
    >
      <span className="px-4 text-center font-mono text-[13px] text-ink-muted">{caption}</span>
    </div>
  );
}
