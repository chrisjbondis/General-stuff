import ideasData from "@/content/ideas.json";
import quotesData from "@/content/quotes.json";
import photosData from "@/content/photos.json";
import albumsData from "@/content/albums.json";

export type Verdict = {
  label: "VERIFIED" | "BUSTED" | "COMPLICATED" | "UNVERIFIABLE";
  color: "green" | "red" | "orange" | "gray";
  confidence: number;
  summary: string;
};

export type Quote = {
  id: string;
  quote: string;
  attribution: string;
  date: string;
  verdict: Verdict;
};

export type Idea = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  date: string;
  link?: string;
  locked?: boolean;
};

export type Album = {
  id: string;
  title: string;
  description: string;
};

export type Photo = {
  id: string;
  album: string;
  filename?: string;
  url?: string;
  caption: string;
  location: string;
  date: string;
  tags: string[];
};

export function getIdeas(): Idea[] {
  return [...ideasData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getQuotes(): Quote[] {
  return [...(quotesData as Quote[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPhotos(): Photo[] {
  return [...(photosData as Photo[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAlbums(): Album[] {
  return albumsData as Album[];
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
