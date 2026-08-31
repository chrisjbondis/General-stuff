"use client";
import { useEffect, useState } from "react";

type Photo = {
  id: string;
  album: string;
  filename?: string;
  url?: string;
  caption: string;
  location?: string;
  date: string;
  tags: string[];
};

function withCloudinaryTransform(src: string, transform: string) {
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) {
    return src;
  }
  return src.replace("/upload/", `/upload/${transform}/`);
}

function photoSrc(photo: Photo) {
  return photo.url ?? `/photos/${photo.filename}`;
}

const PLACEHOLDERS = new Set(["placeholder-1.jpg"]);

function isPlaceholder(photo: Photo) {
  return !photo.url && (!photo.filename || PLACEHOLDERS.has(photo.filename));
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const realPhotos = photos.filter((p) => !isPlaceholder(p));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = openIndex !== null;
  const current = open ? realPhotos[openIndex] : null;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? null : (i + 1) % realPhotos.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + realPhotos.length) % realPhotos.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, realPhotos.length]);

  if (realPhotos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: "1rem" }}>
        {realPhotos.map((photo, i) => {
          const src = photoSrc(photo);
          const thumbSrc = withCloudinaryTransform(src, "f_auto,q_auto,w_800");
          return (
            <figure key={photo.id} className="break-inside-avoid mb-4 group">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="block w-full text-left cursor-zoom-in"
                aria-label={`View larger: ${photo.caption}`}
              >
                <div className="relative overflow-hidden rounded-xl border border-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbSrc}
                    alt={photo.caption}
                    className="w-full h-auto block transition-[filter] duration-300 group-hover:brightness-75"
                    loading="lazy"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm font-medium leading-snug">
                      {photo.caption}
                    </p>
                    {photo.location && (
                      <p className="text-white/60 text-xs mt-0.5">{photo.location}</p>
                    )}
                  </figcaption>
                </div>
              </button>
            </figure>
          );
        })}
      </div>

      {open && current && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 md:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>

          {realPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) =>
                    i === null ? null : (i - 1 + realPhotos.length) % realPhotos.length
                  );
                }}
                aria-label="Previous photo"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl w-12 h-12 flex items-center justify-center"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? null : (i + 1) % realPhotos.length));
                }}
                aria-label="Next photo"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl w-12 h-12 flex items-center justify-center"
              >
                &#8250;
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withCloudinaryTransform(photoSrc(current), "f_auto,q_auto,w_2400")}
            alt={current.caption}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-4 text-center max-w-2xl px-4">
            <p className="text-white font-medium">{current.caption}</p>
            <p className="text-white/50 text-sm mt-1">
              {current.location}
              {current.location && " · "}
              {openIndex !== null ? openIndex + 1 : 0} / {realPhotos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
