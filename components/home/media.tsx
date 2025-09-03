'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useInView } from "../../lib/utils";
import { createClient } from 'contentful';
import { useTranslations } from "@/lib/useTranslations";

const client = createClient({
  space: "qlpjwgocwz50",
  accessToken: "c_JyKWxONFLuVIILAfKEqzurdpMJ1tIYwc0epHcIYUw",
  environment: "master"
});

export default function Media() {
  const { t } = useTranslations();
  const [ref, inView] = useInView();
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const getAllNewsEntries = async () => {
      try {
        const entries: any = await client.getEntries({
          content_type: 'media',
          order: ['-fields.date'],
          limit: 10
        });
        setMediaItems(entries.items);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching news entries: ${error}`);
        setIsLoading(false);
      }
    };
    getAllNewsEntries();
  }, []);

  const handleSlide = (direction: 'prev' | 'next') => {
    if (transitioning || mediaItems.length === 0) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => {
        if (direction === 'prev') {
          return prev === 0 ? mediaItems.length - 1 : prev - 1;
        } else {
          return prev === mediaItems.length - 1 ? 0 : prev + 1;
        }
      });
      setTransitioning(false);
    }, 350); // match CSS duration
  };

  const prevSlide = () => handleSlide('prev');
  const nextSlide = () => handleSlide('next');

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const date: Date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const slide = mediaItems[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/cloudbg.svg')" }}>
      <div
        ref={ref}
        className={`relative z-10 container mx-auto py-14 sm:py-36 px-4 transition-all duration-1000 ${inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}`}
      >
        {/* Desktop Heading */}
        <h2 className="hidden sm:block text-4xl md:text-5xl font-bold special-header text-black mb-4">
          {t('media.title')}
        </h2>
        {/* Mobile Heading */}
        <h2 className="block sm:hidden text-3xl font-bold special-header text-black mb-4">
          {t('media.title')}
        </h2>
        <p className="text-gray-700 mb-10 max-w-2xl">
          {t('media.subtitle')}
        </p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          mediaItems.length > 0 && slide && (
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch transition-opacity duration-350 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={
                      slide.fields.image.fields.file.url.startsWith('http')
                        ? slide.fields.image.fields.file.url
                        : `https:${slide.fields.image.fields.file.url}`
                    }
                    alt={slide.fields.title || 'Media'}
                    fill
                    className="object-cover transition-all duration-350"
                    sizes="100vw"
                    style={{
                      objectPosition: 'center top',
                    }}
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between sm:pt-20">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-700 text-white text-xs px-2 py-1 rounded font-semibold tracking-wide">{slide.fields.publisher}</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-1">{formatDate(slide.fields.date)}</div>
                  <h3 className="text-xl md:text-4xl py-3 font-semibold special-header max-w-3xl text-black mb-3 leading-tight" style={{ lineHeight: '1.4' }}>
                    {slide.fields.url ? (
                      <a
                        href={slide.fields.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline cursor-pointer transition-colors duration-200  hover:text-blue-900"
                      >
                        {slide.fields.tittle || slide.fields.title}
                      </a>
                    ) : (
                      slide.fields.tittle || slide.fields.title
                    )}
                  </h3>
                  <p className="text-gray-700 text-sm max-w-3xl">{slide.fields.description}</p>
                  <div className="flex gap-3 mt-6">
                    <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/80 hover:bg-gray-200 flex items-center justify-center  text-xl transition" disabled={transitioning}>
                      <FiArrowLeft />
                    </button>
                    <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/80 hover:bg-gray-200 flex items-center justify-center  text-xl transition" disabled={transitioning}>
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <style jsx>{`
        .transition-opacity {
          transition-property: opacity;
        }
        .duration-350 {
          transition-duration: 350ms;
        }
      `}</style>
    </section>
  );
}
