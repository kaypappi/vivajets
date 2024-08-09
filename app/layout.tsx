import "./globals.css";
import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
});
const gothic = localFont({
  src: "../public/fonts/CenturyGothic.ttf",
  display: "swap",
  variable: "--font-gothic",
});

const gothicBold = localFont({
  src: "../public/fonts/GothicBold.ttf",
  display: "swap",
  variable: "--font-gothic-bold",
});

export const metadata: Metadata = {
  title: "Viva Jets",
  description: `Own Your Journey`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="" lang="en">
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1454751448548687');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1454751448548687&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="google-script">
          {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-57L6FWHZ');
`}
        </Script>
        
        {/* New Google Analytics code */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q9YFQYYTJP"></Script>
        <Script id="google-analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Q9YFQYYTJP');
          `}
        </Script>

        <Script id="popup-form">
          {`
!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/775ebfd74ac13f416e56a8db7/922d757f28b40e4143490ba80.js");
`}
        </Script>

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-57L6FWHZ"
        />
      </head>
      <body
        className={`${geologica.variable} ${gothic.variable} ${gothicBold.variable} w-full font-gothic scroll-smooth`}
      >
        {children}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-57L6FWHZ" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}