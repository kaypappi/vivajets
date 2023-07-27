"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MainNavItem, SidebarNavItem } from "@/types";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactComponent as Hamburger } from "@/public/svgs/hamburger.svg";
import { ReactComponent as CloseCircle } from "@/public/svgs/close-circle.svg";

import Image from "next/image";

/* import Logo from "@/public/svgs/logo.svg" */
/* import {Menu} from "lucide-react" */

interface MobileNavProps {
  mainNavItems?: MainNavItem[];
  sidebarNavItems: MainNavItem[];
}

export function MobileNav({ mainNavItems, sidebarNavItems }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className=" px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Hamburger className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="pl-1 pr-0 bg-[#010211] border-0 text-white w-[80%] "
      >
        <div className="px-7 flex justify-between mb-10">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image
              width={500}
              height={500}
              className=" w-40 h-7 lg:mx-auto"
              src="/images/logo.png"
              alt="logo"
            />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <SheetClose>
            <CloseCircle className=" w-5 h-5" />
          </SheetClose>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 relative">
          <div className="pl-1 pr-7 ">
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-y-10"
            >
              {mainNavItems?.map((item, index) =>
                item.items ? (
                  <AccordionItem value={item.title} key={index}>
                    <AccordionTrigger className="text-sm capitalize">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.items?.map((subItem, index) =>
                          subItem.href ? (
                            <MobileLink
                              key={index}
                              href={String(subItem.href)}
                              pathname={pathname}
                              setIsOpen={setIsOpen}
                              disabled={subItem.disabled}
                            >
                              {subItem.title}
                            </MobileLink>
                          ) : (
                            <div
                              key={index}
                              className="text-foreground/70 transition-colors"
                            >
                              {item.title}
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <MobileLink
                    key={index}
                    href={String(item.href)}
                    pathname={pathname}
                    setIsOpen={setIsOpen}
                    disabled={item.disabled}
                  >
                    {item.title}
                  </MobileLink>
                )
              )}
              <Button asChild className=" w-max" size={"lg"} variant={"clay"}>
                <MobileLink
                  href="/contact"
                  pathname="contact"
                  setIsOpen={setIsOpen}
                >
                  Get In Touch
                </MobileLink>
              </Button>
              {/* <AccordionItem value="sidebar">
                <AccordionTrigger className="text-sm">
                  Sidebar Menu
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {sidebarNavItems?.map((item, index) =>
                      item.href ? (
                        <MobileLink
                          key={index}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                          disabled={item.disabled}
                        >
                          {item.title}
                        </MobileLink>
                      ) : (
                        <div
                          key={index}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.title}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </div>
          <div className=" absolute left-0 bottom-10 flex justify-center w-full">
            <p className="p text-white/30">
              © 2023 VivaJets. All rights reserved.
            </p>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  className,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
