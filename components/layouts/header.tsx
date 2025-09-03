"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import SideMenu from "@/components/ui/side-menu";
import { Volume2, VolumeX } from "lucide-react";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useTranslations } from "@/lib/useTranslations";

interface HeaderProps {
  isMuted: boolean;
  toggleMute: () => void;
  showMuteButton?: boolean;
  /**
   * light – white text/icons for dark backgrounds (default)
   * dark  – black text/icons for light backgrounds
   */
  variant?: "light" | "dark";
}

export default function Header({
  isMuted,
  toggleMute,
  showMuteButton = true,
  variant = "light",
}: HeaderProps) {
  const { t } = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDarkVariant = variant === "dark";

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Trigger sticky header after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine styling based on scroll state and variant
  const isSticky = isScrolled;
  const btnBgClass = isSticky 
    ? "bg-white/20 hover:bg-white/30 backdrop-blur-sm" 
    : isDarkVariant 
      ? "bg-black/10 hover:bg-black/20" 
      : "bg-white/30 hover:bg-white/50";
  
  const textColorClass = isSticky || !isDarkVariant ? "text-white" : "text-black";
  const iconColor = isSticky || !isDarkVariant ? "white" : "black";
  const invertClass = isSticky || !isDarkVariant ? "" : "invert"; // Keep white SVGs white when sticky

  return (
    <header 
      className={`${
        isSticky 
          ? 'fixed top-0 left-0 w-full bg-gradient-to-r from-black/60 via-gray-900/60 to-black/60 backdrop-blur-xl shadow-lg' 
          : 'absolute top-0 left-0 w-full'
      } py-3 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center" aria-label="VivaJets Home">
          <Image
            src="/assets/images/white-logo.svg"
            alt="VivaJets Logo"
            width={180}
            height={80}
            priority
            className={`${invertClass} w-[120px] h-auto sm:w-[180px] sm:h-[80px] transition-all duration-300`}
          />
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          {showMuteButton && (
            <button className={`${btnBgClass} transition-all duration-200 rounded-full p-1.5 sm:p-2`} onClick={toggleMute}>
              <span className="sr-only">{isMuted ? t('header.unmute') : t('header.mute')}</span>
              {isMuted ? (
                <VolumeX size={16} color={iconColor} className="sm:w-5 sm:h-5" />
              ) : (
                <Volume2 size={16} color={iconColor} className="sm:w-5 sm:h-5" />
              )}
            </button>
          )}
          <LanguageSwitcher variant={variant} isSticky={isSticky} />
          <button
            className={`${btnBgClass} transition-all duration-200 cursor-pointer rounded-full p-1.5 sm:px-4 sm:py-2 flex items-center gap-1 sm:gap-2`}
            onClick={() => setMenuOpen(true)}
          >
            <Image
              src="/assets/images/menu.svg"
              alt="Menu"
              width={16}
              height={16}
              className={`${invertClass} sm:w-5 sm:h-5`}
            />
            <span className={`${textColorClass} font-medium text-xs sm:text-sm transition-colors duration-200 hidden sm:inline`}>{t('header.menu')}</span>
          </button>
        </div>
      </div>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

