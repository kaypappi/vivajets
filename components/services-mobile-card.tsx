import React from "react";
import { Tab } from "./stacked-tabs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const ServicesMobileCard: React.FC<Tab & { className?: string }> = ({
  head,
  body,
  className,
}) => {
  return (
    <div  style={{backgroundColor:body.background}} className={`${className} p-4 text-white rounded-[0.625rem] flex flex-col `}>
      <Image className=" w-full rounded-md h-40  object-cover max-w-[18.5rem]" width={296} height={160}  src={body.image} alt={body.title} />
      <h4 className="h4 max-w-[18.5rem] my-2">{body.title}</h4>
      <p className=" text-xs md:text-sm text-white/70 max-w-[18.5rem]">{body.desc}</p>
      <div className=" mt-auto flex flex-col sm:flex-row gap-4 max-w-[18.5rem]">
        {body.cta.map((cta) => (
          <Button
            key={cta.text}
            variant={cta.variant}
            className="w-full "
            size={'sm'}
            asChild
          >
            <Link href={cta.link}>{cta.text}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ServicesMobileCard;
