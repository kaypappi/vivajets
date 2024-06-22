import SiteFooter from "@/components/layouts/footer";
import { SiteHeader } from "@/components/layouts/site-header";
import type { Metadata } from "next";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Own a Private Jet | Aircraft Fractional Ownership",
  description: `Charter A Private Jet To Anywhere You Want To Go and Anytime. Own Your Private Jet With Vivajets
  `,
};

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  return (
    <div className="relative  flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
