"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import CarouselDots from "./carousel-dots";
import Autoplay from "embla-carousel-autoplay";
import ServicesMobileCard from "./services-mobile-card";
import { TabsProps } from "./stacked-tabs";
import { sl } from "date-fns/locale";
import TestimonialMobileCard from "./testimonial-mobile-card";




export interface TestimonialCarouselProps {
  slides: {
    name: string;
    testimony: string;
    image: string;
  }[];
  options?: EmblaOptionsType;
  className?: string;
}

const SLIDE_SPACING = "0.5rem";
let SLIDE_SIZE = "80%";
const SLIDE_HEIGHT = "30rem";

const autoplayOptions = {
  delay: 7000,
  stopOnMouseEnter: false,
};

const TestimonialMobileCarousel: React.FC<TestimonialCarouselProps> = ({
  slides,
  options,
  className,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "center", ...options },
    [Autoplay(autoplayOptions)]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(SLIDE_SIZE);

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on("select", selectHandler);
    // cleanup
    return () => {
      emblaApi?.off("select", selectHandler);
    };
  }, [emblaApi]);

  return (
    <>
      <div className={`overflow-hidden container w-full ${className}`} ref={emblaRef}>
        <div
          style={{
            backfaceVisibility: "hidden",
            display: "flex",
            touchAction: "pan-y",
            marginLeft: "calc(SLIDE_SPACING * -1)",
          }}
          className="embla__container"
        >
          {slides.map((slide, index) => {
            const selected = index === selectedIndex;

            return (
              <div
                style={{
                  /* flex: `0 0 ${slideSize}`, */
                  minWidth: 0,
                  paddingLeft: SLIDE_SPACING,
                  position: "relative",
                }}
                className="embla__slide w-full"
                key={slide.name}
              >
                <TestimonialMobileCard slide={slide} className="min-h-[390px] w-full"/>
              </div>
            );
          })}
        </div>
      </div>
      {/* <CarouselDots
        className="mt-14 hidden md:flex"
        itemsLength={services.length}
        selectedIndex={selectedIndex}
      /> */}
    </>
  );
};

export default TestimonialMobileCarousel;
