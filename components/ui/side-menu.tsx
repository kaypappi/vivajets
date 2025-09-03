import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import QuoteModal from "./quote-modal";
import { useTranslations } from "@/lib/useTranslations";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

// Only include non-Services links, in the desired order
const navLinks = [
  { label: "Home", href: "/" },
  // Services will be handled separately as a dropdown
  { label: "Fleet", href: "/buyers-guide" },
  { label: "Blog", href: "/blog" },
  { label: "Media", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose }) => {
  const { t } = useTranslations();
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  // Helper function to check if any service link is active
  const isAnyServiceActive = () => {
    const serviceLinks = ["/about", "/aircraft-management", "/fractional-ownership", "/aircraft-sales"];
    return serviceLinks.some(link => pathname?.startsWith(link));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[9999] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Side Menu */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full max-w-xl bg-[#020918] z-[9999] shadow-lg flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        style={{ 
          height: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 9999
        }}
      >
        <button
          className="absolute top-8 right-6 text-white hover:bg-white/20 rounded-xl border border-[#1C3774] p-2 focus:outline-none transition-colors duration-200 z-[10000]"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col justify-between">
          <div />
          <nav
            className="
              flex flex-col items-start gap-6
              px-6 pt-20
              sm:px-12 sm:pt-24
              md:px-16 md:pt-28
              "
            style={{ minHeight: '60vh' }}
          >
            {/* Home */}
            <a
              key="Home"
              href="/"
              className={`py-2 text-xl special-header md:text-xl font-light transition-all duration-200 ${
                isActiveLink("/")
                  ? "text-[#4472FF] font-medium relative"
                  : "text-white hover:underline hover:text-white/90"
              }`}
              onClick={onClose}
            >
              {isActiveLink("/") && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4472FF] rounded-r-full"></span>
              )}
              {t('navigation.home')}
            </a>

            {/* Services dropdown */}
            <div className="w-full">
              <button
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between py-2 text-xl special-header md:text-xl font-light transition-all duration-200 group ${
                  isAnyServiceActive()
                    ? "text-[#4472FF] font-medium relative"
                    : "text-white hover:underline hover:text-white/90"
                }`}
              >
                {isAnyServiceActive() && (
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4472FF] rounded-r-full"></span>
                )}
                <span>{t('navigation.services')}</span>
                <svg
                  className={`transition-transform duration-300 ease-in-out ${servicesOpen ? "rotate-180" : "rotate-0"} group-hover:scale-110`}
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke={isAnyServiceActive() ? "#4472FF" : "#fff"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8l5 5 5-5"
                  />
                </svg>
              </button>
              
              {/* Dropdown content with smooth animation */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  servicesOpen 
                    ? "max-h-96 opacity-100 mt-4" 
                    : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <div className="ml-6 border-l-2 border-[#1C3774]/30 pl-6 space-y-4">
                  <a
                    href="/aircraft-charter"
                    className={`block text-lg transition-all duration-200 hover:translate-x-1 group ${
                      isActiveLink("/aircraft-charter")
                        ? "text-[#4472FF] font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <span className="relative">
                      {t('navigation.aircraftCharter')}
                      {!isActiveLink("/about") && (
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 transition-all duration-200 group-hover:w-full"></span>
                      )}
                    </span>
                  </a>
                  <a
                    href="/aircraft-management"
                    className={`block text-lg transition-all duration-200 hover:translate-x-1 group ${
                      isActiveLink("/aircraft-management")
                        ? "text-[#4472FF] font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <span className="relative">
                      {t('navigation.aircraftManagement')}
                      {!isActiveLink("/aircraft-management") && (
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 transition-all duration-200 group-hover:w-full"></span>
                      )}
                    </span>
                  </a>
                  <a
                    href="/fractional-ownership"
                    className={`block text-lg transition-all duration-200 hover:translate-x-1 group ${
                      isActiveLink("/fractional-ownership")
                        ? "text-[#4472FF] font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <span className="relative">
                      {t('navigation.fractionalOwnership')}
                      {!isActiveLink("/fractional-ownership") && (
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 transition-all duration-200 group-hover:w-full"></span>
                      )}
                    </span>
                  </a>
                  <a
                    href="/aircraft-sales"
                    className={`block text-lg transition-all duration-200 hover:translate-x-1 group ${
                      isActiveLink("/aircraft-sales")
                        ? "text-[#4472FF] font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <span className="relative">
                      {t('navigation.aircraftSales')}
                      {!isActiveLink("/aircraft-sales") && (
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 transition-all duration-200 group-hover:w-full"></span>
                      )}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Fleet */}
            <a
              key="Fleet"
              href="/buyers-guide"
              className={`py-2 text-xl special-header md:text-xl font-light transition-all duration-200 ${
                isActiveLink("/buyers-guide")
                  ? "text-[#4472FF] font-medium relative"
                  : "text-white hover:underline hover:text-white/90"
              }`}
              onClick={onClose}
            >
              {isActiveLink("/buyers-guide") && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4472FF] rounded-r-full"></span>
              )}
              {t('navigation.fleet')}
            </a>
            {/* Blog */}
            <a
              key="Blog"
              href="/blog"
              className={`py-2 text-xl special-header md:text-xl font-light transition-all duration-200 ${
                isActiveLink("/blog")
                  ? "text-[#4472FF] font-medium relative"
                  : "text-white hover:underline hover:text-white/90"
              }`}
              onClick={onClose}
            >
              {isActiveLink("/blog") && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4472FF] rounded-r-full"></span>
              )}
              {t('navigation.blog')}
            </a>
            {/* Media */}
            <a
              key="Media"
              href="/news"
              className={`py-2 text-xl special-header md:text-xl font-light transition-all duration-200 ${
                isActiveLink("/news")
                  ? "text-[#4472FF] font-medium relative"
                  : "text-white hover:underline hover:text-white/90"
              }`}
              onClick={onClose}
            >
              {isActiveLink("/news") && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4472FF] rounded-r-full"></span>
              )}
              {t('navigation.media')}
            </a>
            {/* Contact Us */}
            <a
              key="Contact Us"
              href="/contact"
              className={`py-2 text-xl special-header md:text-xl font-light transition-all duration-200 ${
                isActiveLink("/contact")
                  ? "text-[#4472FF] font-medium relative"
                  : "text-white hover:underline hover:text-white/90"
              }`}
              onClick={onClose}
            >
              {isActiveLink("/contact") && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4472FF] rounded-r-full"></span>
              )}
              {t('navigation.contactUs')}
            </a>
          </nav>
          <div />
        </div>
        {/* Request Quote Section */}
        <button
          type="button"
          className="
            border-t border-[#1C3774]
            px-4 py-6
            sm:px-8 sm:py-8
            md:px-10 md:py-8
            flex flex-col sm:flex-row items-center gap-4 sm:gap-6
            bg-[#020918]
            w-full
            cursor-pointer
            transition-colors
            duration-200
            hover:bg-white/5
            focus:outline-none
          "
          onClick={() => setIsQuoteModalOpen(true)}
        >
          <div className="bg-white/10 rounded-full p-3 mb-2 sm:mb-0">
            <Image src="/assets/images/file.svg" alt="Request Quote" width={32} height={32} />
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="text-white font-semibold special-header text-xl sm:text-2xl mb-1">{t('navigation.requestQuote')}</div>
            <div className="text-white/70 text-sm">{t('navigation.requestQuoteSubtitle')}</div>
          </div>
          <span
            className="hover:bg-white/20 rounded-lg p-2 border border-[#1C3774] mt-2 sm:mt-0 transition-colors duration-200 flex items-center justify-center"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 10h10m0 0l-4-4m4 4l-4 4" />
            </svg>
          </span>
        </button>
      </aside>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default SideMenu;