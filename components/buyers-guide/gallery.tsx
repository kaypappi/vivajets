"use client"
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function select(index: number) {
    if (index < 0 || index >= images.length) return;
    setCurrentIndex(index);
  }

  function next() {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Thumbnails as 2x2 grid */}
      <div className="col-span-12 md:col-span-3 order-2 md:order-1">
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {images.slice(0, 4).map((img, idx) => (
            <button
              key={img.src + idx}
              onClick={() => select(idx)}
              className={`relative w-full overflow-hidden transition ${
                idx === currentIndex ? " ring-[] -[]" : "-neutral-200 hover:-neutral-300"
              }`}
              style={{ aspectRatio: "4/3" }}
              aria-label={`View image ${idx + 1}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 20vw" />
            </button>
          ))}
        </div>
        {/* If more than 4 images, show additional thumbnails below */}
        {images.length > 4 && (
          <div className="grid grid-cols-2 grid-rows-2 gap-3 mt-3">
            {images.slice(4, 8).map((img, idx) => (
              <button
                key={img.src + (idx + 4)}
                onClick={() => select(idx + 4)}
                className={`relative w-full overflow-hidden transition ${
                  idx + 4 === currentIndex ? "ring-2 ring-[] -[]" : "-neutral-200 hover:-neutral-300"
                }`}
                style={{ aspectRatio: "4/3" }}
                aria-label={`View image ${idx + 5}`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 20vw" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-9 relative order-1 md:order-2">
        <div className="relative w-full overflow-hidden -md  -neutral-200">
          <div className="relative aspect-[16/9] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[currentIndex].src}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <button
              aria-label="Previous image"
              onClick={prev}
              className="-full bg-black/50 hover:bg-black/60 p-2 text-white transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next image"
              onClick={next}
              className="-full bg-black/50 hover:bg-black/60 p-2 text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}