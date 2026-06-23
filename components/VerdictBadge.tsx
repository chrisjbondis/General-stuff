import type { Verdict } from "@/lib/content";

const colorMap = {
  green: {
    bg: "bg-green-500",
    text: "text-white",
    border: "border-green-500",
    ring: "bg-green-500/10 border-green-500/30",
    prose: "text-green-700",
  },
  red: {
    bg: "bg-red-500",
    text: "text-white",
    border: "border-red-500",
    ring: "bg-red-500/10 border-red-500/30",
    prose: "text-red-700",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-500",
    ring: "bg-orange-500/10 border-orange-500/30",
    prose: "text-orange-700",
  },
  gray: {
    bg: "bg-gray-500",
    text: "text-white",
    border: "border-gray-500",
    ring: "bg-gray-500/10 border-gray-500/30",
    prose: "text-gray-700",
  },
};

type Props = {
  verdict: Verdict;
  compact?: boolean;
};

export default function VerdictBadge({ verdict, compact = false }: Props) {
  const colors = colorMap[verdict.color];

  return (
    <div className={`${compact ? "" : `rounded-2xl border p-6 ${colors.ring}`}`}>
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`inline-block font-mono font-bold text-xs px-3 py-1.5 rounded-full tracking-wider ${colors.bg} ${colors.text}`}
        >
          {verdict.label}
        </span>
        <span className="text-xs text-white/40 font-mono">
          {verdict.confidence}% confident
        </span>
      </div>
      {!compact && (
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {verdict.summary}
        </p>
      )}
    </div>
  );
}
