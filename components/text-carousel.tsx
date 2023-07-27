"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface PropType {
  slides: {
    title: string;
    desc: string;
  }[];
  className?: string;
}

const TextCarousel: React.FC<PropType> = ({ slides, className }) => {
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const maxHieght = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [slides.length, index]);

  useEffect(() => {
    // Function to get the positions of the child elements
    const getChildPositions = () => {
      if (wrapperRef.current) {
        const childElements =
          wrapperRef.current.querySelectorAll<HTMLDivElement>(
            "div"
          );
        const positions = Array.from(childElements).map((element) =>
          element.getBoundingClientRect()
        );
        console.log(positions)
        const maxH=positions.reduce((max, item) => {
          return Math.max(max, item.height);
        }, 0);
        maxHieght.current=maxH
        //setChildPositions(positions);
      }
    };

    // Call the function to get the positions after the rendering is completed
    getChildPositions();
  }, [slides]);

  return (
    <div ref={wrapperRef} className=" min-h-[18rem]   sm:min-h-[16rem]  md:min-h-[20rem] mb-8 relative flex items-center flex-col text-start justify-start">
      <AnimatePresence >
        {slides.map((slide, i) => (
          <motion.div
            className=" absolute  w-full"
            key={slide.title}
            initial={{opacity:0}}
            animate={{
              opacity: index === i ? 1 : 0,
              y: index === i ? 0 : -20,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <h1 className="h1 max-w-4xl font-bold leading-tight lg:leading-normal  text-start">
              {slide.title}
            </h1>
            <p className="p max-w-3xl mt-2 leading-loose text-white/70">
              {slide.desc}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TextCarousel;
