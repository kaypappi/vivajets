'use client'
import { useState } from "react";
import Header from "@/components/layouts/header";
import BlogHero from "../../components/blog/hero";
import BlogContent from "../../components/blog/content";

export default function BlogPage() {
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <main className="min-h-screen">
      <Header 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        showMuteButton={false}
        variant="light"
      />
      <BlogHero />
      <BlogContent />
    </main>
  );
}