import { getPhotos, formatDate } from "@/lib/content";
import Image from "next/image";

export const metadata = { title: "Photos — General Stuff" };

export default function PhotosPage() {
  const photos = getPhotos();
  const hasRealPhotos = photos.some((p) => p.filename !== "placeholder-1.jpg");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-3">Photos</h1>
      <p className="text-black/50 text-lg mb-12">Stuff worth remembering.</p>

      {!hasRealPhotos ? (
        <div className="border-2 border-dashed border-black/20 rounded-2xl p-16 text-center">
          <p className="text-4xl mb-4">📷</p>
          <p className="text-black/40 text-lg">Photos coming soon.</p>
          <p className="text-black/30 text-sm mt-2">
            Ask Claude to add one for you.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <figure key={photo.id} className="group">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-black bg-black/5">
                <Image
                  src={`/photos/${photo.filename}`}
                  alt={photo.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <figcaption className="mt-3 px-1">
                <p className="font-medium text-sm">{photo.caption}</p>
                <div className="flex items-center justify-between mt-1 text-xs text-black/40 font-mono">
                  {photo.location && <span>{photo.location}</span>}
                  <span>{formatDate(photo.date)}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
