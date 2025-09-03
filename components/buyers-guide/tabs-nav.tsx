"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

interface TabItem {
  slug: string;
  label: string;
}

const tabs: TabItem[] = [
  { slug: "global-7500", label: "Bombardier Global 7500" },
  { slug: "challenger-604", label: "Challenger 605" },
  { slug: "g650", label: "Gulfstream G650" },
  { slug: "falcon-7x", label: "Dassault Falcon 7X" },
];

export default function TabsNav() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <nav aria-label="Buyer's Guide Navigation" className="w-full">
      {/* Mobile: horizontal slider without scroll buttons */}
      <div className="relative block md:hidden">
        <div
          ref={scrollRef}
          className="
            flex gap-2 items-center
            overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            py-2 px-2
            -mx-2
            scroll-smooth
          "
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tabs.map((tab) => {
            const href = `/buyers-guide/${tab.slug}`;
            const isActive = pathname?.startsWith(href);
            return (
              <Link
                key={tab.slug}
                href={href}
                className={
                  `
                    inline-flex items-center rounded-full
                    px-4 py-2
                    text-xs
                    border
                    transition
                    whitespace-nowrap
                    ` +
                  (isActive
                    ? " bg-[#4472FF] text-white border-[#4472FF]"
                    : " bg-white text-black border-neutral-200 hover:border-neutral-300")
                }
                tabIndex={0}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
      {/* Desktop: regular horizontal nav */}
      <ul
        className="
          hidden md:flex md:flex-nowrap gap-3 items-center
          py-0 px-0
        "
      >
        {tabs.map((tab) => {
          const href = `/buyers-guide/${tab.slug}`;
          const isActive = pathname?.startsWith(href);
          return (
            <li key={tab.slug} className="flex-shrink-0">
              <Link
                href={href}
                className={
                  `
                    inline-flex items-center rounded-full
                    px-4 py-2
                    text-sm
                    border
                    transition
                    whitespace-nowrap
                    ` +
                  (isActive
                    ? " bg-[#4472FF] text-white border-[#4472FF]"
                    : " bg-white text-black border-neutral-200 hover:border-neutral-300")
                }
                tabIndex={0}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
