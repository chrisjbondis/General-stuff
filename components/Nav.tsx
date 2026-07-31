"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/quotes", label: "Quotes" },
];

const otherLinks = [
  { href: "/claude-training.html", label: "Claude Training" },
  { href: "/ideas/hrv-mechanism.html", label: "HRV" },
];

const projectLinks = [
  { href: "/ideas/optimisedeats.html", label: "OptimisedEats" },
  { href: "/ideas/lighttools.html", label: "LightTools" },
  { href: "/ideas/voltagedrop.html", label: "VoltageDrop" },
  { href: "/ideas/jcvdai.html", label: "JCVD.ai" },
  { href: "/ideas/sharetracker.html", label: "ShareTracker Pro" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#111111] text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight"
          onClick={() => setOpen(false)}
        >
          General Stuff<span className="text-[#d4f04c]">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium overflow-x-auto whitespace-nowrap min-w-0">
          {links.slice(1).map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors ${
                  pathname === href
                    ? "text-[#d4f04c]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          {otherLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="transition-colors text-white/70 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
          <li aria-hidden className="w-px h-4 bg-white/15" />
          <li className="text-xs font-mono uppercase tracking-widest text-white/30 shrink-0">
            Projects I&apos;ve built
          </li>
          {projectLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="transition-colors text-white/70 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 mt-4 pt-4 pb-2 text-sm font-medium border-t border-white/10">
          {links.slice(1).map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`block py-2 transition-colors ${
                  pathname === href
                    ? "text-[#d4f04c]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          {otherLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 transition-colors text-white/70 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="text-xs font-mono uppercase tracking-widest text-white/30 pt-3 mt-2 border-t border-white/10">
            Projects I&apos;ve built
          </li>
          {projectLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 transition-colors text-white/70 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
