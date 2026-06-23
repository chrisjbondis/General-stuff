"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/quotes", label: "Quotes" },
  { href: "/photos", label: "Photos" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#111111] text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg tracking-tight">
        General Stuff<span className="text-[#d4f04c]">.</span>
      </Link>
      <ul className="flex gap-6 text-sm font-medium">
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
      </ul>
    </nav>
  );
}
