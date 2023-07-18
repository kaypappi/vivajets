"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface PropType {
  slides: {
    title: string;
    desc: string;
  }[];
  className?: string;
}

const TextCarousel: React.FC<PropType> = ({ slides, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [slides.length, index]);

  return (
    <div className=" min-h-[16rem]  md:min-h-[20rem] mb-8 relative flex items-center flex-col text-start justify-start">
      <AnimatePresence >
        {slides.map((slide, i) => (
          <motion.div
            className=" absolute  w-full"
            key={slide.title}
            animate={{
              opacity: index === i ? 1 : 0,
              zIndex: index === i ? 1 : -1,
              y: index === i ? 0 : -20,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <h1 className="h1 max-w-4xl font-bold leading-normal  text-start">
              {slide.title}
            </h1>
            <p className="p max-w-3xl mt-6 leading-loose text-white/70">
              {slide.desc}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TextCarousel;
