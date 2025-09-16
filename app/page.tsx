'use client'
import Hero from "../components/home/hero";
import Reach from "../components/home/reach";
import Dna from "../components/home/dna";
import Ready from "../components/home/ready";
import Media from "../components/home/media";
import Header from "../components/layouts/header";
import { useState } from "react";
import HeroOptimized from "../components/home/hero-optimized";
import { useTranslations } from "@/lib/useTranslations";
import ParalaxBg from "../components/about/paralaxbg";



export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const { t } = useTranslations();

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <Header isMuted={isMuted} toggleMute={toggleMute} />
      {/* <Hero isMuted={isMuted} /> */}
      <HeroOptimized isMuted={isMuted} />
      <Reach />
      <Dna />
      {/* <Ready /> */}
      <ParalaxBg />
      <Media />

    </>
  );
}
