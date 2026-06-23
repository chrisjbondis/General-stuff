import { getQuotes, formatDate } from "@/lib/content";
import VerdictBadge from "@/components/VerdictBadge";

export const metadata = { title: "Quotes — General Stuff" };

const verdictColorMap = {
  green: "border-green-500/20 bg-green-500/5",
  red: "border-red-500/20 bg-red-500/5",
  orange: "border-orange-500/20 bg-orange-500/5",
  gray: "border-gray-500/20 bg-gray-500/5",
};

export default function QuotesPage() {
  const quotes = getQuotes();

  return (
    <div className="bg-[#111111] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-3">Quotes</h1>
        <p className="text-white/50 text-lg mb-4">
          Things people say. Claude checks whether they&apos;re true.
        </p>
        <div className="flex items-center gap-2 mb-12 text-xs font-mono text-white/30">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
          VERIFIED
          <span className="inline-block w-2 h-2 rounded-full bg-red-400 ml-3"></span>
          BUSTED
          <span className="inline-block w-2 h-2 rounded-full bg-orange-400 ml-3"></span>
          COMPLICATED
          <span className="inline-block w-2 h-2 rounded-full bg-gray-400 ml-3"></span>
          UNVERIFIABLE
        </div>

        <div className="flex flex-col gap-8">
          {quotes.map((q) => (
            <article
              key={q.id}
              className={`border rounded-2xl p-8 ${verdictColorMap[q.verdict.color]}`}
            >
              <blockquote className="text-2xl font-medium leading-snug mb-3">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <p className="text-white/40 text-sm mb-6">
                — {q.attribution}
                <span className="ml-4 font-mono text-white/25">
                  {formatDate(q.date)}
                </span>
              </p>

              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
                  Claude&apos;s verdict
                </p>
                <VerdictBadge verdict={q.verdict} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
