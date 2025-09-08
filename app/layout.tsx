import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layouts/header";
import I18nProvider from "@/components/providers/I18nProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import Footer from "@/components/layouts/footer";
import Script from "next/script";

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
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "6046777";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight-loader" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){
                window.lintrk = function(a,b){
                  window.lintrk.q.push([a,b])
                };
                window.lintrk.q=[]
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} alt="" src="https://px.ads.linkedin.com/collect/?pid=6046777&fmt=gif" />
        </noscript>
      </body>
    </html>
  );
}
