import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React, { useCallback, useEffect, useState } from "react";

type Axis = "x" | "y";

const ScrollVertical = ({ children }: { children: React.ReactNode }) => {
  const [axis, setAxis] = useState<Axis>("x");
  const [forceWheelAxis, setForceWheelAxis] = useState<Axis | undefined>("y");
  const [target, setTarget] = useState<Element | undefined>();
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: false, skipSnaps: true, axis },
    [
      WheelGesturesPlugin({
        forceWheelAxis,
        target,
      }),
    ]
  );


  return (
    <>
      <div className="embla__scroll relative" data-axis={axis}>
        <div
          ref={emblaRef}
          className="embla__scroll__viewport   overflow-hidden"
        >
          <div className="embla__scroll__container  flex will-change-transform">
            {React.Children.map(children, (Child, index) => (
              <div className="embla__scroll__slid  w-full " key={index}>
                <div className="embla__scroll__slide__inner w-full min-w-max">{Child}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollVertical;
