"use client";

import { useState } from "react";
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

/**
 * Renders a tour image the same way the gallery/projects page does:
 * next/image with `fill` inside a relative, aspect-ratio box.
 *
 * Uploaded files (/api/uploads/…) and Blob URLs are optimizable by next/image.
 * Any other external host is rendered with a plain <img> instead, because
 * next/image throws for hosts that are not in `remotePatterns`.
 *
 * If the image fails to load, the whole frame is removed so a bad or missing
 * URL never shows a broken-image icon.
 */
export function TourImage({ src, alt, sizes = "100vw", className = "object-cover" }: {
  src: string; alt: string; sizes?: string; className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const safe = src.startsWith("/api/uploads/") || src.includes("blob.vercel-storage.com");
  if (safe) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes} quality={90} className={className}
        onError={() => setFailed(true)} />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={`h-full w-full ${className}`}
    onError={() => setFailed(true)} />;
}
