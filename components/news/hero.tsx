'use client'
import { useInView } from "../../lib/utils";
import { useTranslations } from "@/lib/useTranslations";

export default function NewsHero() {
  const [ref, inView] = useInView();
  const { t } = useTranslations();

  return (
    <section
      className="relative min-h-[70vh] w-full bg-black flex flex-col justify-end bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/images/news_bg.png')",
      }}
    >
      <div
        ref={ref}
        className={`relative z-10 w-full flex items-end justify-center min-h-[40vh] pb-16 transition-all duration-1000 ${
          inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col items-center relative">
          {/* Inline Title and Description */}
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-6 md:gap-12  ">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl special-header font-bold leading-tight md:mb-0">
              {t('media.title')}
            </h1>
            <p className="text-white max-w-2xl text-base md:text-lg mb-0">
              {t('media.subtitle')}
            </p>
          </div>
          {/* Scroll Indicator */}
         
        </div>
      </div>
    </section>
  );
}