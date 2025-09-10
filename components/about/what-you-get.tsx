"use client"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Autoplay,
} from "@/components/ui/carousel";
import React from "react";
import { useTranslations } from "@/lib/useTranslations";

const WhatYouGet = () => {
  const { t } = useTranslations();
  const [carouselApi, setCarouselApi] = React.useState<any>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const cardData = [
    {
      image: "/assets/images/get_image_1.png",
      title: t("whatYouGet.cards.flightsThatFit.title"),
      description: t("whatYouGet.cards.flightsThatFit.description"),
    },
    {
      image: "/assets/images/get_image_2.png",
      title: t("whatYouGet.cards.rightJet.title"),
      description: t("whatYouGet.cards.rightJet.description"),
    },
    {
      image: "/assets/images/get_image_3.png",
      title: t("whatYouGet.cards.realPeople.title"),
      description: t("whatYouGet.cards.realPeople.description"),
    },
    {
      image: "/assets/images/get_image_4.png",
      title: t("whatYouGet.cards.safety.title"),
      description: t("whatYouGet.cards.safety.description"),
    },
    {
      image: "/assets/images/get_image_5.png",
      title: t("whatYouGet.cards.globalReach.title"),
      description: t("whatYouGet.cards.globalReach.description"),
    },
  ];

  return (
    <section className="bg-[#F7F7F7] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold special-header">
              {t("whatYouGet.title")}
            </h2>
            <p className="max-w-3xl mt-4 text-lg">
              {t("whatYouGet.subtitle")}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => carouselApi?.scrollPrev()}
              aria-label="Previous"
              className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow border border-black/10 flex items-center justify-center transition"
              disabled={carouselApi ? !carouselApi.canScrollPrev() : false}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => carouselApi?.scrollNext()}
              aria-label="Next"
              className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow border border-black/10 flex items-center justify-center transition"
              disabled={carouselApi ? !carouselApi.canScrollNext() : false}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Carousel
        setApi={setCarouselApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
        }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        {/* 
          Responsive CarouselContent:
          - px-0 on mobile (no side padding), px-12 on md+ for spacing
        */}
        <CarouselContent className="px-0 md:px-12">
          {cardData.map((card, index) => (
            <CarouselItem
              key={index}
              // Full width on mobile, 1/2 on md, 1/3 on lg+
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <div className="relative rounded-md overflow-hidden h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={500}
                    className="object-cover w-full h-[400px] md:h-[500px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold special-header">
                      {card.title}
                    </h3>
                    <p className="mt-2">{card.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default WhatYouGet;
