import { getIdeas, formatDate } from "@/lib/content";

export const metadata = { title: "Ideas — General Stuff" };

const cardColors = ["#d4f04c", "#ff6b5b", "#5bc8f5", "#f9f5ef"];

export default function IdeasPage() {
  const ideas = getIdeas();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-3">Ideas</h1>
      <p className="text-black/50 text-lg mb-12">
        Thoughts, observations, half-baked theories.
      </p>

      <div className="flex flex-col gap-6">
        {ideas.map((idea, i) => (
          <article
            key={idea.id}
            className="border-2 border-black rounded-2xl p-8 hover:-translate-y-0.5 transition-transform"
            style={{ backgroundColor: cardColors[i % cardColors.length] }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <h2 className="text-2xl font-bold leading-snug">{idea.title}</h2>
              <time className="text-xs font-mono text-black/50 shrink-0 mt-1">
                {formatDate(idea.date)}
              </time>
            </div>
            <p className="text-base leading-relaxed text-black/80">{idea.body}</p>
            {idea.tags.length > 0 && (
              <div className="flex gap-2 mt-5 flex-wrap">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-black/10 rounded-full px-2.5 py-1 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
