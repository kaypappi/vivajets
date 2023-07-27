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
      <motion.div animate={{
        backgroundColor: `rgba(255,255,249,${showBlur?backgroundOpacity.get():isDesktop?0.3:0})`,
        backdropFilter: `blur(${showBlur || isDesktop?35:0}px)`,
      }}
      transition={{
        duration:0.5,
        ease:"easeInOut"
        
      }}
       className="container  w-full px-4 lg:pr-2 flex h-16 items-center  lg:max-w-4xl lg:ml-auto lg:bg-brand lg:backdrop-blur-[35px] lg:bg-opacity-30 rounded-full py-4">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={siteConfig.mainNav}
        />
        <div className="lg:flex hidden flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild className=" w-max" size={"lg"} variant={"clay"}>
              <Link href="/contact">
                <div>
                  +234-818-7222-227
                  <span className="sr-only">+234-818-7222-227</span>
                </div>
              </Link>
            </Button>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}
