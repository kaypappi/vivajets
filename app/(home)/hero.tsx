"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import TextCarousel from "@/components/text-carousel";
import { motion } from "framer-motion";
import Link from "next/link";

const heroSlides = [
  {
    title: `Reach New Levels of Comfort 
        and Sophistication`,
    desc: `You can get the best private flight services from VivaJets. If you need a unique solution for work, 
        pleasure, or travel. Make VivaJets your first choice today for your luxurious private plane travel!`,
  },
  {
    title: `Enjoy Maximum Returns on 
        Your Investment`,
    desc: `At every stage, we ensure ultimate satisfaction for your investment with our professional and
        confidential guidance, and our vast network and worldwide sales support services.`,
  },
];

const hero = () => {
  return (
    <section className=" w-screen text-white h-screen relative ">
      <video
        className=" w-full min-w-[100vw] object-cover min-h-screen block h-full absolute top-0 left-0 bottom-0 right-0 -z-10 "
        width={"100%"}
        height={"100%"}
        loop
        autoPlay
        muted
      >
        <source
          className="w-full h-full "
          src="/images/hero.mp4"
          type="video/mp4"
        />
      </video>
      <div className="w-full h-full bg-[url('/images/heromesh.png')] bg-cover ">
        <div className="heromesh w-full h-full flex  items-center justify-start bg-[#0C0C23]/80">
          <div className=" container max-w-6xl ">
            <Badge
              variant={"nohover"}
              className=" mb-8 bg-brand border border-brand/70 bg-opacity-[0.7] text-white font-light px-3 py-2"
            >
              Welcome to VivaJets
            </Badge>
            <motion.div
              initial={{
                y: -100,
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
            <Button
              asChild
              className="py-2 font-light"
              size={"4xl"}
              variant={"clay"}
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
