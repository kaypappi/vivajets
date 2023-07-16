"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import CarouselDots from "./carousel-dots";
import Autoplay from "embla-carousel-autoplay";
import { useBreakpointEffect } from "@/hooks/tailwind";
import { set } from "lodash";

interface PropType {
  slides: {
    name: string;
    testimony: string;
    image: string;
  }[];
  options?: EmblaOptionsType;
  className?: string;
}

const SLIDE_SPACING = "0.5rem";
let SLIDE_SIZE = "55%";
const SLIDE_HEIGHT = "20rem";

const autoplayOptions = {
  delay: 4000,
  stopOnMouseEnter: false,
};

const TestimonialCarousel: React.FC<PropType> = ({
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

  useBreakpointEffect("lg", (match) => {
    if (match) {
      setSlideSize("30rem");
    }
  });
  useBreakpointEffect("md", (match) => {
    if (match) {
        setSlideSize("35rem");
    }
  });
  useBreakpointEffect("sm", (match) => {
    if (match) {
      setSlideSize("90%");
    }
  });

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
      <div className={`overflow-hidden w-full ${className}`} ref={emblaRef}>
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
                <div
                  style={{
                    minHeight: SLIDE_HEIGHT,
                    width: "100%",
                    objectFit: "cover",
                    transform: !selected ? "scale(0.9)" : "scale(1)",
                    opacity: !selected ? 0.5 : 1,
                  }}
                  className=" grid grid-cols-[16rem_1fr]  rounded-xl w-full text-white transition-all "
                >
                  <div className="  bg-meteor p-8 border-r-2 border-dashed rounded-xl roun">
                    <div className=" overflow-hidden rounded-full h-full w-full relative">
                      <Image
                        className=" absolute top-0 left-0 right-0 bottom-0"
                        fill
                        src="/images/airplane-window.png"
                        alt="airplane window"
                      />
                      <Image
                        className=" absolute top-0 left-0 right-0 bottom-0"
                        fill
                        src={slide.image}
                        alt={slide.name}
                      />
                    </div>
                  </div>
                  <div className=" rounded-xl bg-meteor p-8">
                    <h5 className="h5 mb-4  font-semibold">{slide.name}</h5>
                    <p className="p font-extralight">{slide.testimony}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CarouselDots
        className="mt-14"
        itemsLength={slides.length}
        selectedIndex={selectedIndex}
      />
    </>
  );
};

export default TestimonialCarousel;
