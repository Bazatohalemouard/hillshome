"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "/gallery/image1.jpg",
  "/gallery/image2.jpg",
  "/gallery/image3.jpg",
  "/gallery/image4.jpg",
  "/gallery/image5.jpg",
  "/gallery/image6.jpg",
  "/gallery/image7.jpg",
  "/gallery/image8.jpg",
  "/gallery/image9.jpg",
  "/gallery/image10.jpg",
];

const INTERVAL_MS = 5000;

export default function HeroSlideshow({ companyName }: { companyName: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const prev = (index - 1 + IMAGES.length) % IMAGES.length;

  return (
    <section
      className="relative overflow-hidden bg-navy-950 py-20 text-white"
      aria-roledescription="slideshow"
      aria-label="Hillshome highlights"
    >
      {/* Animated backgrounds — horizontal push */}
      <div className="absolute inset-0" aria-hidden="true">
        {IMAGES.map((src, i) => {
          const isActive = i === index;
          const isPrev = i === prev;
          const isIdle = !isActive && !isPrev;

          return (
            <div
              key={src}
              className={`absolute inset-0 will-change-transform ${
                isActive
                  ? "z-20 translate-x-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
                  : isPrev
                    ? "z-10 -translate-x-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
                    : "z-0 translate-x-full transition-none"
              }`}
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  unoptimized
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}

        {/* Readability overlay */}
        <div className="absolute inset-0 z-30 bg-navy-950/15" />
        <div className="absolute inset-0 z-30 bg-gradient-to-r from-navy-950/60 via-navy-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-t from-navy-950/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-x relative z-40">
        <p className="text-sm uppercase tracking-widest text-gold-500">{companyName}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white drop-shadow-lg sm:text-5xl">
          Transport • Construction • IT • Multimedia • Cleaning • Tourism • Mechanics & Drivers
        </h1>
        <p className="mt-4 max-w-2xl text-white/90 drop-shadow">
          One company, many services. Tell us what you need and our team will review your request
          and get back to you with a clear quotation.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services" className="btn-gold">
            Explore Services
          </Link>
          <Link href="/request" className="btn-outline border-white text-white hover:bg-white/10">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
