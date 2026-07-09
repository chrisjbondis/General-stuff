import Link from "next/link";
import { getIdeas, getQuotes, formatDate } from "@/lib/content";
import VerdictBadge from "@/components/VerdictBadge";

export default function Home() {
  const ideas = getIdeas().slice(0, 3);
  const quotes = getQuotes().slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#111111] text-white px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#d4f04c] text-sm font-mono uppercase tracking-widest mb-4">
            generalstuff.com.au
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            Ideas, tools,
            <br />
            <span className="text-[#ff6b5b]">and things people say.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Half personal blog, half workshop. Quotes get fact-checked by
            Claude, ideas range from gut takes to properly researched
            deep-dives, and the odd one turns into something real.
          </p>
        </div>
      </section>

      {/* Latest Ideas */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Ideas</h2>
          <Link
            href="/ideas"
            className="text-sm font-medium text-black/50 hover:text-black transition-colors"
          >
            All ideas →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ideas.map((idea, i) => (
            <div
              key={idea.id}
              className="border-2 border-black rounded-2xl p-6 hover:-translate-y-1 transition-transform"
              style={{
                backgroundColor: ["#d4f04c", "#ff6b5b", "#5bc8f5"][i % 3],
              }}
            >
              <p className="text-xs font-mono text-black/50 mb-3">
                {formatDate(idea.date)}
              </p>
              <h3 className="font-bold text-lg mb-3 leading-snug">
                {idea.title}
              </h3>
              <p
                className={`text-sm leading-relaxed text-black/70 line-clamp-3 ${
                  idea.locked ? "blur-[4px] select-none" : ""
                }`}
              >
                {idea.body}
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-black/10 rounded-full px-2 py-0.5 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {idea.locked && idea.link && (
                <a
                  href={idea.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs font-mono bg-black/10 hover:bg-black/20 rounded-full px-3 py-1.5 transition-colors"
                >
                  Unlock with 1:1 Claude training →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Latest Quotes */}
      <section className="bg-[#111111] text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-bold">Fact-Checked Quotes</h2>
            <Link
              href="/quotes"
              className="text-sm font-medium text-white/40 hover:text-white transition-colors"
            >
              All quotes →
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="border border-white/10 rounded-2xl p-6 bg-white/5"
              >
                <blockquote className="text-xl font-medium leading-snug mb-3">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <p className="text-white/40 text-sm mb-4">— {q.attribution}</p>
                <VerdictBadge verdict={q.verdict} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
