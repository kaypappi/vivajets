"use client"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  Autoplay,
} from "@/components/ui/carousel";
import React from "react";
import { useTranslations } from "@/lib/useTranslations";

const WhatYouGet = () => {
  const { t } = useTranslations();
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
      title: t("whatYouGet.cards.rightJetDuplicate.title"),
      description: t("whatYouGet.cards.rightJetDuplicate.description"),
    },
    {
      image: "/assets/images/get_image_5.png",
      title: t("whatYouGet.cards.realPeopleDuplicate.title"),
      description: t("whatYouGet.cards.realPeopleDuplicate.description"),
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
          {/* Add carousel controls here if needed */}
        </div>
      </div>

      <Carousel
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
