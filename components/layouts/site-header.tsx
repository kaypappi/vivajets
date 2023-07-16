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

import { MainNav } from "@/components/layouts/main-nav";
import { MobileNav } from "@/components/layouts/mobile-nav";

export function SiteHeader() {
  return (
    <header className="fixed top-12 z-40 w-full  ">
      <div className="container flex h-16 items-center max-w-4xl ml-auto bg-brand backdrop-blur-[35px] bg-opacity-30 rounded-full py-4">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={siteConfig.mainNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild className=" w-max" size={"lg"} variant={"clay"}>
              <Link href="/signup">
                <div>
                  +234-818-7222-227
                  <span className="sr-only">+234-818-7222-227</span>
                </div>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
