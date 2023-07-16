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

const variants = {
  enter: {
    y: -20,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

const TextCarousel: React.FC<PropType> = ({ slides, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let next = index + 1;
      if (next === slides.length) {
        next = 0;
      }
      setIndex(next);
    }, 5 * 1000);
    return () => clearTimeout(timeout);
  }, [index, setIndex]);

  return (
    <div className=" min-h-[20rem] mb-8 relative flex items-center flex-col text-start justify-start">
      <AnimatePresence>
        <motion.div
          className=" absolute  w-full"
          variants={variants}
          key={index}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
          }}
        >
          <h1 className="h1 max-w-4xl font-bold leading-normal  text-start">
            {slides[index].title}
          </h1>
          <p className="p max-w-3xl mt-6 leading-loose text-white/70">
            {slides[index].desc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextCarousel;
