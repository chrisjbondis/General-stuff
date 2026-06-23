import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "General Stuff",
  description: "Ideas, photos, and things people say — checked by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-sans)] bg-[#f9f5ef] text-[#111111]">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 py-8 px-6 text-center text-sm text-black/40">
          generalstuff.com.au
        </footer>
      </body>
    </html>
  );
}
