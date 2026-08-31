import { getPhotos, getAlbums } from "@/lib/content";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata = { title: "Photos — General Stuff" };

const PLACEHOLDERS = new Set(["placeholder-1.jpg"]);

function isPlaceholder(photo: { filename?: string; url?: string }) {
  return !photo.url && (!photo.filename || PLACEHOLDERS.has(photo.filename));
}

export default function PhotosPage() {
  const photos = getPhotos();
  const albums = getAlbums();

  const albumSections = albums.map((album) => ({
    ...album,
    photos: photos.filter((p) => p.album === album.id),
  }));

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-3">Photos</h1>
        <p className="text-black/50 text-lg">Stuff worth remembering.</p>

        {/* Album jump links */}
        <div className="flex flex-wrap gap-2 mt-8">
          {albumSections.map((album) => (
            <a
              key={album.id}
              href={`#${album.id}`}
              className="text-sm font-medium px-4 py-1.5 rounded-full border border-black/20 text-black/60 hover:border-black/60 hover:text-black transition-colors"
            >
              {album.title}
              <span className="ml-2 text-xs text-black/30 font-mono">
                {album.photos.filter((p) => !isPlaceholder(p)).length}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Album sections */}
      <div className="space-y-20">
        {albumSections.map((album) => {
          const realPhotos = album.photos.filter((p) => !isPlaceholder(p));
          const empty = realPhotos.length === 0;

          return (
            <section key={album.id} id={album.id}>
              {/* Album header */}
              <div className="flex items-end justify-between mb-6 pb-4 border-b-2 border-black">
                <div>
                  <h2 className="text-3xl font-bold">{album.title}</h2>
                  {album.description && (
                    <p className="text-black/50 mt-1">{album.description}</p>
                  )}
                </div>
                {!empty && (
                  <span className="font-mono text-sm text-black/40 mb-1">
                    {realPhotos.length} photo{realPhotos.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Grid or empty state */}
              {empty ? (
                <div className="border-2 border-dashed border-black/15 rounded-2xl p-14 text-center">
                  <p className="text-black/30 text-sm">
                    No {album.title.toLowerCase()} photos yet.
                  </p>
                </div>
              ) : (
                <PhotoGallery photos={album.photos} />
              )}
            </section>
          );
        })}
      </div>

      {/* Hire me blurb */}
      <div className="mt-20 pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[#f97316] text-sm font-medium">
          Available for hire — still life, product, landscape, and aerial/drone photography.
        </p>
        <a
          href="mailto:chris@generalstuff.com.au"
          className="text-[#f97316] text-sm font-medium hover:text-[#c2570c] transition-colors underline underline-offset-2"
        >
          chris@generalstuff.com.au
        </a>
      </div>
    </div>
  );
}
