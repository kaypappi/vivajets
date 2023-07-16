import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerItems = [
  {
    header: "Legal",
    links: [
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Privacy Policy",
        link: "",
      },
    ],
  },
  {
    header: "Services",
    links: [
      {
        name: "Private Jet Charter",
        link: "",
      },
      {
        name: "Aircraft Management",
        link: "",
      },
      {
        name: "Aircraft Fractional Ownership",
        link: "",
      },
      {
        name: "Business Jet Charter",
        link: "",
      },
    ],
  },
  {
    header: "Get in Touch",
    links: [
      {
        name: "Contact",
        link: "",
      },
    ],
  },
  {
    header: "Social",
    links: [
      {
        name: "Facebook",
        link: "",
      },
      {
        name: "Instagram",
        link: "",
      },
      {
        name: "Twitter",
        link: "",
      },
    ],
  },
  {
    header: "Resources",
    links: [
      {
        name: "Blog",
        link: "",
      },
      {
        name: "Privacy Policy",
        link: "",
      },
    ],
  },
];

const footer = () => {
  return (
    <footer className="w-full bg-[#0E1040]     text-white ">
      <div className="w-full h-full bg-[url('/images/heromesh.png')]">
        <div className=" w-full h-full bg-[#0E1040]/70 pt-12">
          <Image
            width={500}
            height={500}
            className=" w-56 h-9 mx-auto"
            src="/images/logo.png"
            alt="logo"
          />
          <div className=" container flex justify-between my-11">
            {footerItems.map((item, index) => (
              <div key={item.header} className=" flex flex-col gap-y-4">
                <h6 className="h6 text-white text-opacity-60">{item.header}</h6>
                {item.links.map((link, index) => (
                  <Link
                    className="  text-xs md:text-sm font-extralight max-w-[150px]"
                    key={link.name}
                    href={link.link}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Separator className=" container bg-dodger-blue opacity-20 w-full" />
          <div className="container text-center flex items-center justify-center py-8">
            <p className=" text-white text-opacity-30 font-extralight ">
              © 2023 Vivajets. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
