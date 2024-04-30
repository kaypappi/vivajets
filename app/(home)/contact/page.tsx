"use client";

import { Badge } from "@/components/ui/badge";
import { ReactComponent as Phone } from "@/public/svgs/phone.svg";
import { ReactComponent as Mail } from "@/public/svgs/mail.svg";
import ContactForm from "./contact-form";
import { motion } from "framer-motion";

const contactDetails = [
  {
    title: "PHONE NUMBER",
    icon: () => <Phone className="w-3 h-3" />,
    desc: `Call our customer care representative via the contact number for 
        bookings and enquiries.`,
    value: " +2347057497533",
  },
  {
    title: "EMAIL ADDRESS",
    icon: () => <Mail className="w-3 h-3" />,
    desc: `For inquiries, reviews and comments send a mail to our official email 
        address via`,
    value: "sales@viva-jets.com",
  },
  {
    title: "OFFICE ADDRESS",
    icon: () => <Mail className="w-3 h-3" />,
    desc: `For a visit and physical booking, visit our office`,
    value: `The Adrenalina hub, 369 Borno Way -
        By Spencer, Yaba, Lagos.
        `,
  },
];

const Contact = () => {
  return (
    <main className="min-h-screen text-white  w-full relative pt-24 md:pt-40 pb-32 ">
      <div className="w-full h-full max-h-[50%] absolute top-0 left-0 -z-20 bg-[url('/images/airplaneinclouds.png')] bg-cover bg-center">
        <div className="w-full h-full contact-wrapper"></div>
      </div>
      <div className="w-full h-full max-h-[50%] absolute bottom-0 left-0 right-0 -z-20 bg-[#0E1040]">
        <div className="w-full h-full bg-[url('/images/heromesh.png')]">
          <div className=" w-full h-full bg-[#0E1040]/70 "></div>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 -z-10 "></div>
      <div className=" w-full h-full ">
        <section className=" w-full h-full ">
          <div className="container mx-auto max-w-xl">
            <motion.h4
              animate={{
                y: [-200, 0, -50, 0, -20, 0],
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              }}
              className="h4 mb-8 text-center"
            >
              CONTACT US
            </motion.h4>
            <motion.div
            animate={{
                y:[-200,0],
                opacity:[0,1],
                transition:{
                    duration:0.5,
                    delay:0.8,
                    ease:"easeOut"
                }
            }}
            >
              {contactDetails.map((detail, i) => (
                <div key={detail.title} className="w-full h-full md:mx-4 mb-8 flex flex-col items-start text-start">
                  <Badge
                    variant={"nohover"}
                    className=" mb-2 bg-brand bg-opacity-[0.44] border border-white/30 text-meteor font-light px-[0.625rem] py-[0.4375rem]"
                  >
                    <span className="mr-2">{detail.icon()}</span> {detail.title}
                  </Badge>
                  <p className="p text-white/60 font-extralight">
                    {detail.desc}
                  </p>
                  <h5 className="h5 mt-2">{detail.value}</h5>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id="contact-form" className="w-full h-full pt-10 md:pt-32  ">
          <div className="container mx-auto max-w-xl">
            <h4  className="h4 mb-8 text-center">CONTACT FORM</h4>
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
