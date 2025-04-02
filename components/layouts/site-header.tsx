"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ElementRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { MainNav } from "@/components/layouts/main-nav";
import { MobileNav } from "@/components/layouts/mobile-nav";
import { vi } from "date-fns/locale";
import { useBreakpoint } from "@/hooks/tailwind";

let scrollThreshold = [0, 50];

export function SiteHeader() {
  const [showBlur,setShowBlur]=useState(false)
  const isDesktop = useBreakpoint("lg");

  let { scrollY } = useScroll();
  let scrollYOnDirectionChange = useRef(scrollY.get());
  let lastPixelsScrolled = useRef(0);
  let lastScrollDirection = useRef('down');
  let pixelsScrolled = useMotionValue(0);
  let top = useTransform(pixelsScrolled, scrollThreshold, [isDesktop? 32: 8, -100]);

  let backgroundOpacity = useTransform(
    pixelsScrolled,
    scrollThreshold,
    [0.3, isDesktop?0.3:0]
  );
  let backgroundColorTemplate = useMotionTemplate`rgba(250 250 249 / ${backgroundOpacity})`;

  useMotionValueEvent(scrollY,"change",(latest) => {
    setShowBlur(latest>0)
    if (latest < 0) return;

    let isScrollingDown = scrollY.getPrevious() - latest < 0;
    let scrollDirection = isScrollingDown ? "down" : "up";
    let currentPixelsScrolled = pixelsScrolled.get();
    let newPixelsScrolled;

    if (lastScrollDirection.current !== scrollDirection) {
      lastPixelsScrolled.current = currentPixelsScrolled;
      scrollYOnDirectionChange.current = latest;
    }

    if (isScrollingDown) {
      newPixelsScrolled = Math.min(
        lastPixelsScrolled.current +
          (latest - scrollYOnDirectionChange.current),
        scrollThreshold[1]
      );
    } else {
      newPixelsScrolled = Math.max(
        lastPixelsScrolled.current -
          (scrollYOnDirectionChange.current - latest),
        scrollThreshold[0]
      );
    }
    pixelsScrolled.set(newPixelsScrolled);
    lastScrollDirection.current = scrollDirection;
  })

  return (
    <motion.header style={{top:isDesktop ? '2.5rem':top }} className="fixed inset-x-0 top-8 lg:top-8 z-40 w-full px-2 ">
      <motion.div 
        animate={{
          backgroundColor: `rgba(13,15,43,${showBlur?backgroundOpacity.get():isDesktop?0.3:0})`,
          backdropFilter: `blur(${showBlur || isDesktop?35:0}px)`,
        }}
        transition={{
          duration:0.5,
          ease:"easeInOut"
        }}
        className="container w-full px-4 lg:pr-2 flex h-16 items-center lg:max-w-4xl lg:ml-auto lg:bg-brand lg:backdrop-blur-[35px] lg:bg-opacity-30 rounded-full py-4"
      >
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={siteConfig.mainNav}
        />
        <div className="lg:flex hidden flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <Link href="/media" className="text-[16px] mr-6 font-medium text-white hover:text-gray-200">
              Media
            </Link>
           
            <Button asChild className="w-max flex items-center gap-2 bg-yellow-700 hover:bg-[#20bd59]" size={"lg"} variant={"clay"}>
              <Link href="https://wa.me/message/K25UVJD5PN54D1" target="_blank">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  +234 811 111 3660
                </div>
              </Link>
            </Button>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}