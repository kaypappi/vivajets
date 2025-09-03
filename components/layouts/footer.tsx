'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "@/lib/useTranslations";

export default function Footer() {
  const { t } = useTranslations();
  return (
    <footer className="bg-black text-white w-full pt-20 pb-36 px-4 md:px-20">
      {/* Top Row: Locations & Socials */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div className="flex gap-2 md:gap-4">
          {['Lagos', 'United Kingdom', 'Canada'].map((loc) => (
            <button
              key={loc}
              className="px-3 py-1 md:px-6 md:py-2 rounded-full border border-white/20 bg-white/5 text-white text-xs md:text-base hover:bg-white/10 transition"
            >
              {loc}
            </button>
          ))}
        </div>
        {/* Social buttons - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://web.facebook.com/profile.php?id=61550687853556"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white text-base hover:bg-white/10 transition"
            aria-label="VivaJets on Facebook"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/viva.jets/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white text-base hover:bg-white/10 transition"
            aria-label="VivaJets on Instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/vivajets/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white text-base hover:bg-white/10 transition"
            aria-label="VivaJets on LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8 py-20">
        <Image
          src="/assets/images/full-logo.svg"
          alt="Vivajets Logo"
          width={1400}
          height={500}
          priority
          className="object-contain"
        />
      </div>

      {/* Tagline */}
     
      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm md:text-sm">
        {/* First Column: Tagline + Copyright */}
        <div className="flex flex-col items-start justify-end md:items-start md:justify-start">
          <p className="text-white/70 mb-8 max-w-xs">
            {t('footer.tagline')}
          </p>
          <span className="text-white/50 mt-auto">{t('footer.copyright')}</span>
        </div>
        {/* Services */}
        <div>
          <h4 className="font-semibold mb-2">{t('footer.services')}</h4>
          <ul className="space-y-7 mt-5 text-white/70">
            <li>
              <Link href="/aircraft-charter" className="hover:text-white transition">{t('footer.aircraftCharter')}</Link>
            </li>
            <li>
              <Link href="/aircraft-management" className="hover:text-white transition">{t('footer.aircraftManagement')}</Link>
            </li>
            <li>
              <Link href="/fractional-ownership" className="hover:text-white transition">{t('footer.fractionalOwnership')}</Link>
            </li>
            <li>
              <Link href="/aircraft-sales" className="hover:text-white transition">{t('footer.aircraftSales')}</Link>
            </li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-2">{t('footer.resources')}</h4>
          <ul className="space-y-7 mt-5 text-white/70">
            {/* <li>Terms and Conditions</li>
            <li>Privacy Policy</li> */}
            <li>
              <Link href="/blog" className="hover:text-white transition">{t('footer.blog')}</Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-white transition">{t('footer.media')}</Link>
            </li>
          </ul>
        </div>
        {/* Fleet */}
        <div>
          <h4 className="font-semibold mb-2">{t('footer.fleet')}</h4>
          <ul className="space-y-7 mt-5 text-white/70">
            <li>
              <Link href="/buyers-guide/global-7500" className="hover:text-white transition">
                Bombardier Global 7500
              </Link>
            </li>
            <li>
              <Link href="/buyers-guide/challenger-604" className="hover:text-white transition">
                Challenger 605 
              </Link>
            </li>
            <li>
              <Link href="/buyers-guide/g650" className="hover:text-white transition">
                Gulfstream G550 
              </Link>
            </li>
            <li>
              <Link href="/buyers-guide/falcon-7x" className="hover:text-white transition">
                Dassault Falcon 7X 
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h4 className="font-semibold mb-2">{t('footer.contactUs')}</h4>
          <ul className="space-y-7 mt-5 text-white/70">
            <li>
              <a href="tel:08104446209" className="hover:text-white transition">0810 444 6209</a>
            </li>
            <li>
              <a href="mailto:sales@viva-jets.com" className="hover:text-white transition">sales@viva-jets.com</a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=22%20Herbert%20Macauly%20Cres%2C%20Ikeja%20GRA%2C%20Ikeja%20100271%2C%20Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                22 Herbert Macauly Cres, Ikeja GRA, Ikeja 100271, Lagos
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social buttons - shown on mobile only, positioned at bottom */}
      <div className="flex md:hidden justify-center gap-4 mt-8 pt-8 border-t border-white/20">
        <a
          href="https://web.facebook.com/profile.php?id=61550687853556"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition"
          aria-label="VivaJets on Facebook"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/viva.jets/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition"
          aria-label="VivaJets on Instagram"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/company/vivajets/?viewAsMember=true"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white text-sm hover:bg-white/10 transition"
          aria-label="VivaJets on LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
