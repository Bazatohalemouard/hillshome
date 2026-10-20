import Image from "next/image";

/** Converts a YouTube/Vimeo link to an embeddable URL, or null for other links. */
function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

const isDirectVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url.split("?")[0]);

export function TourVideo({ url }: { url: string }) {
  const embed = embedUrl(url);
  if (embed) {
    return (
      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded border border-navy-900/10">
        <iframe src={embed} title="Tour video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen className="absolute inset-0 h-full w-full" />
      </div>
    );
  }
  if (isDirectVideo(url)) {
    return <video src={url} controls className="mt-6 w-full rounded border border-navy-900/10" />;
  }
  return <p className="mt-6"><a href={url} target="_blank" rel="noopener noreferrer" className="underline">Watch the tour video</a></p>;
}

export function TourImage({ src, alt, priority = false, sizes = "100vw" }: {
  src: string; alt: string; priority?: boolean; sizes?: string;
}) {
  // Uploaded files resolve to /api/uploads/... or a Blob URL; next/image needs the
  // optimizer for remote Blob hosts but can serve local routes directly.
  if (src.startsWith("http")) {
    return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}
