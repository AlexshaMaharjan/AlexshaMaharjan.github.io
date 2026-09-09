import { useRef, useState } from "react";
import Image from "@/components/ui/Image";

/**
 * A figure that happens to move.
 *
 * The barrier-free kitchen's case study describes an animated Blender walkthrough
 * and, until now, had a hatched slot where it should have been. The file is 12 MB
 * — and there is no encoder on this machine to make it smaller. `ffmpeg` is not
 * installed, and macOS's own `avconvert` targets quality rather than size: asked
 * to re-encode this very file it produced **31 MB** from a 12 MB source.
 *
 * So the size is a given, and the answer is not to make the video smaller but to
 * **not fetch it until someone asks**. `preload="none"` plus a poster means the
 * page carries a 34 KB still; the 12 MB arrives on click, or never. That is the
 * difference between a video being affordable here and not.
 *
 * It also settles the motion question. Nothing plays on its own, so there is no
 * `prefers-reduced-motion` branch to write — a click is an explicit request, and
 * `DECISION-008`'s rule is about *unsolicited* movement. The controls are the
 * browser's, which are keyboard-operable and localised for free.
 */
export default function Video({
  src,
  poster,
  alt,
  label,
  sizes,
}: {
  src: string;
  poster: string;
  alt: string;
  /** Used for the play button's accessible name — "Play: {label}". */
  label: string;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (playing) {
    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        aria-label={label}
        className="absolute inset-0 h-full w-full bg-ink object-contain"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${label}`}
      className="group absolute inset-0 h-full w-full cursor-pointer"
    >
      <Image src={poster} alt={alt} sizes={sizes} className="object-cover" />
      {/* The play affordance. `aria-hidden` because the button already says it. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors duration-[250ms] group-hover:bg-ink/30"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-[250ms] ease-out group-hover:scale-105">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
            <path d="M2 2.5 L18 12 L2 21.5 Z" fill="#111111" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </button>
  );
}
