import type { MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Viva Jets",
  description:
  `Elevate Your Private Flights 
  to Extraordinary Heights`,
  /* url: "https://skateshop13.vercel.app/",
  ogImage: "https://skateshop13.vercel.app/opengraph-image.png", */
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
