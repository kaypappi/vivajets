'use client'
import { useState } from "react";
import Header from "@/components/layouts/header";
import NewsHero from "../../components/news/hero";
import NewsContent from "../../components/news/content";

export default function NewsPage() {
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        showMuteButton={false}
        variant="light"
      />
      <NewsHero />
      <NewsContent />
    </main>
  );
}