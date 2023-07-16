import type { MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Skateshop13",
  description:
    "An open source e-commerce skateshop build with everything new in Next.js 13.",
  url: "https://skateshop13.vercel.app/",
  ogImage: "https://skateshop13.vercel.app/opengraph-image.png",
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
  links: {
    twitter: "https://twitter.com/sadmann17",
    github: "https://github.com/sadmann7/skateshop",
  },
}
