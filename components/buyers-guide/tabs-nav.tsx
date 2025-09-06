"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface TabItem {
  slug: string;
  label: string;
}

const tabs: TabItem[] = [
  { slug: "global-7500", label: "Bombardier Global 7500" },
  { slug: "challenger-604", label: "Challenger 604" },
  { slug: "hawker-900xp", label: "Hawker 900XP" },
  { slug: "hawker-850xp", label: "Hawker 850XP" },
  { slug: "legacy-600", label: "Legacy 600" },
];

export default function TabsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Buyer's Guide Navigation" className="w-full">
      {/* Mobile: 2 by 2 grid pill group container */}
      <div className="relative block md:hidden">
        <div className="bg-white border rounded-2xl px-2 py-2 mx-1 border-neutral-100">
          <div
            className="
              grid grid-cols-2 gap-2
              py-1
            "
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
                      text-xs font-medium
                      -2
                      transition
                      whitespace-nowrap
                      w-full justify-center
                      ` +
                    (isActive
                      ? " bg-[#4472FF] text-white -[#4472FF]"
                      : " bg-white text-black -neutral-200 hover:-[#4472FF]/40 hover:text-[#4472FF]")
                  }
                  tabIndex={0}
                  style={{
                    minWidth: 0,
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Desktop: horizontal nav in a pill group container */}
      <div className="hidden md:block">
        <div className="bg-white rounded-full px-3 py-3 w-full  -neutral-100">
          <ul
            className="
              flex flex-nowrap gap-3 items-center
              m-0 p-0
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
                        px-5 py-2
                        text-sm font-medium
                        -2
                        transition
                        whitespace-nowrap
                        ` +
                      (isActive
                        ? " bg-[#4472FF] text-white -[#4472FF]"
                        : " bg-white text-black -neutral-200 hover:-[#4472FF]/40 hover:text-[#4472FF]")
                    }
                    tabIndex={0}
                    style={{
                      minWidth: 140,
                      justifyContent: "center",
                    }}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
