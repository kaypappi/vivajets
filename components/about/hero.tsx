
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/ui/quote-modal";

export default function AboutHero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/about_cloud_bg.png"
          alt="Clouds background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-1" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-28 items-center sm:mt-[-250px]">
          {/* Left side content */}
          <div className="text-white mt-16 sm:mt-0">
            {/* Desktop Heading */}
            <h1 className="hidden md:block text-5xl md:text-6xl special-header font-bold leading-tight">
              You Call the Shots.
              <br />
              We Handle the
              <br />
              Flight.
            </h1>
            {/* Mobile Heading */}
            <h1 className="block md:hidden text-4xl special-header font-bold leading-tight mb-[-400px]">
              You Call the Shots. We Handle the Flight.
            </h1>
          </div>

          {/* Right side content */}
          <div className="text-white max-w-4xl mt-10 sm:mt-0">
            <p className="mb-8 text-base md:text-lg ">
            Say yes to efficiency, flexibility, and control. VivaJets is built for leaders, innovators, and enterprises driving Africa’s growth, delivering private flights that keep you on schedule and ahead of the curve.

            </p>
            <div className="flex items-center gap-4">
              {/* <Link href="/book">
                <Button variant="secondary" size="lg" className="rounded-full">
                  Book A Flight
                </Button>
              </Link> */}
              <Button 
                variant="default" 
                size="lg" 
                className="rounded-full cursor-pointer"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                Book A Flight
              </Button>
            </div>
          </div>
        </div>
      </div>
       <div className="absolute hidden sm:block bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-full z-[5]">
        <Image
          src="/assets/images/plane.svg"
          alt="VivaJets Plane"
          width={1920}
          height={400}
          className="w-full h-auto"
        />
      </div>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
}
