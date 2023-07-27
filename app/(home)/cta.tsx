import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const cta = () => {
  return (
    <section className=" bg-[#FFF8F2] w-full py-16 flex flex-col text-center items-center">
      <div className="container flex flex-col  items-center text-cente">
        <h2 className="h3 lg:h2 max-w-5xl  font-bold">
          Tell us your requirements and one of our private aviation expert will
          send you a quote.
        </h2>
        <p className="p font-extralight max-w-xl mt-6 mb-14">
          What are your requirements? Be sure to get a quick response from one
          of our experts with the response and a quote.
        </p>
        <Button
          asChild
          size={"lg"}
          variant={"clay"}
          className=" hover:bg-dodger-blue hover:ring-1 hover:ring-brand-500 hover:text-brand-500"
        >
          <Link href="/contact#contact-form">Send Us a Message</Link>
        </Button>
      </div>
    </section>
  );
};

export default cta;
