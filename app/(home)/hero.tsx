"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";
import TextCarousel from "@/components/text-carousel";
import { motion } from "framer-motion";

const heroSlides = [
  {
    title: `Charter a jet`,
    desc: `Charter a private jet for business trips, leisure, or travel, and experience the freedom and comfort Viva Jets provides you.`,
    buttonText: "Request a quote.",
    buttonUrl: "/contact"
  },
  {
    title: `Own a jet`,
    desc: `Explore a world of possibilities with the convenience and luxury of owning your own private jet.`,
    buttonText: " Explore ownership options.",
    buttonUrl: "/contact"
  },
  {
    title: `Own a fraction of a jet`,
    desc: `Join thousands of smart investors who experience the luxury of private jet travel through our fractional investment program.`,
    buttonText: "Learn more",
    buttonUrl: "/contact"
  },
];

const hero = () => {
  return (
    <section className="w-screen text-white h-screen relative">
      <video
        className="w-full min-w-[100vw] object-cover block h-full absolute top-0 left-0 bottom-0 right-0 -z-10"
        width={"100%"}
        height={"100%"}
        loop
        autoPlay
        muted
      >
        <source
          className="w-full h-full"
          src="/images/hero.mp4"
          type="video/mp4"
        />
      </video>
      <div className="w-full h-full bg-[url('/images/heromesh.png')] bg-cover">
        <div className="heromesh w-full h-full flex items-center justify-start bg-[#0C0C23]/80">
          <div className="container max-w-6xl">
            <Badge
              variant={"nohover"}
              className="mb-2 bg-[#B5B5C0]/10 lg:bg-brand/70 border border-white/10 lg:border-brand/70 text-white font-light px-3 py-2"
            >
              Welcome to VivaJets
            </Badge>
            <motion.div
              initial={{
                y: 0,
              }}
              animate={{
                y: [0, -100, 0, -20, 0],
                transition: {
                  duration: 1,
                  ease: "easeOut",
                },
              }}
            >
              <TextCarousel slides={heroSlides} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;