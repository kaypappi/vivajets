import type { MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  mainNav: [
    {
      title: "Services",
      href: "/#services",
    },
    {
      title: "About Us",
      href: "/#about",
    },
    {
      title: "Our Benefits",
      href: "/#benefits",
    },
  ] satisfies MainNavItem[],
  
}
