import Image from "next/image";
import React from "react";

interface TestimonialMobileCardProps {
  slide: {
    name: string;
    testimony: string;
    image: string;
  };
  className?: string;
}

const TestimonialMobileCard: React.FC<TestimonialMobileCardProps> = ({
  slide,
  className,
}) => {
  return (
    <div className={` w-full text-white ${className}`}>
      <div className="card-top flex p-4 gap-2 bg-meteor/80 border-b-2 border-dashed rounded-md ">
        <div className="w-10 h-10 relative object-cover rounded-full overflow-hidden">
        <Image className=" w-full object-cover h-full aspect-square " width={40} height={40} src={slide.image} alt={slide.name} />
        </div>
        <div className="flex w-full flex-col">
            <h5 className="h5 line-clamp-1">{slide.name}</h5>
            <h6 className=" text-xs text-white/70 line-clamp-1 ">{slide.name}</h6>
        </div>
      </div>
      <div className="card-bottom rounded-md bg-meteor/80 p-4 ">
        <p className="p">
            {slide.testimony}
        </p>
      </div>
    </div>
  );
};

export default TestimonialMobileCard;
