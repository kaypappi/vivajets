import SiteFooter from "@/components/layouts/footer";
import { SiteHeader } from "@/components/layouts/site-header";
import type { Metadata } from "next";

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Own a Private Jet | Aircraft Fractional Ownership",
  description: `Own a slice of luxury with our Fractional Jet Ownership Model. Jetsetter dreams start at just $500,000. Own your Jet —seize the skies in style`,
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
