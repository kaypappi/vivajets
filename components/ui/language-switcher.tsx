"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslations } from "@/lib/useTranslations";
import { useLocale } from "@/components/providers/LocaleProvider";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
  isSticky?: boolean;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher({ variant = "light", isSticky = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const { changeLanguage } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // Determine styling based on variant and sticky state
  const isDarkVariant = variant === "dark";
  const btnBgClass = isSticky 
    ? "bg-white/20 hover:bg-white/30 backdrop-blur-sm" 
    : isDarkVariant 
      ? "bg-black/10 hover:bg-black/20" 
      : "bg-white/30 hover:bg-white/50";
  
  const textColorClass = isSticky || !isDarkVariant ? "text-white" : "text-black";
  const iconColor = isSticky || !isDarkVariant ? "white" : "black";

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    setLocale(newLocale);
    changeLanguage(newLocale);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`${btnBgClass} transition-all duration-200 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className={`${textColorClass} font-medium text-xs sm:text-sm transition-colors duration-200`}>
          {currentLanguage.flag} <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
        </span>
        <ChevronDown 
          size={12} 
          color={iconColor} 
          className={`transition-transform duration-200 sm:w-3.5 sm:h-3.5 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2 sm:gap-3 ${
                locale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="text-base sm:text-lg">{language.flag}</span>
              <span className="font-medium text-sm sm:text-base">{language.name}</span>
              <span className="text-xs sm:text-sm text-gray-500">({language.code.toUpperCase()})</span>
              {locale === language.code && (
                <div className="ml-auto w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
