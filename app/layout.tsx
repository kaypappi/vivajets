import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layouts/header";
import I18nProvider from "@/components/providers/I18nProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import Footer from "@/components/layouts/footer";

export const metadata: Metadata = {
  title: "VivaJets",
  description: "VivaJets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LocaleProvider initialLocale="en">
          <I18nProvider>
            {/* <Header /> */}
            {children}
            <Footer />
          </I18nProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
