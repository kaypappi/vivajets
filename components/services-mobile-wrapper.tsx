import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

import { TabsProps } from "./stacked-tabs";
import ServicesMobileCard from "./services-mobile-card";

function computeClosestMultiple(
  dynamicValue: number,
  givenValue: number,
  limit: number
): number {
  const lowestMultiple = Math.floor(dynamicValue / givenValue) * givenValue;
  const halfLowestMultiple = lowestMultiple / 2;
  const maxResult = givenValue * limit;
  

  if (dynamicValue <= 0) {
    // If the dynamicValue is 0 or lower, return 0.
    return 0;
  } else if (dynamicValue <= halfLowestMultiple + givenValue) {
    // If the dynamicValue is between 0 (inclusive) and half of the lowest multiple value plus givenValue, return the lowest multiple.
    return lowestMultiple;
  } else {
    // Calculate the closest highest multiple of the givenValue (ignoring the last multiple).
    const closestHighestMultiple = Math.floor(dynamicValue / givenValue) * givenValue;

    // Return the computed value, making sure it doesn't exceed the maxResult.
    return Math.min(closestHighestMultiple, maxResult);
  }
}

const ServicesMobileWrapper: React.FC<TabsProps> = ({
  services,
  className,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState<number>(0);
  const [viewportW, setViewportW] = useState<number>(0);
  const [childPositions, setChildPositions] = useState<DOMRect[]>([]);

  const scrollPerc = useMotionValue<number>(0);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newScrollYProgress=computeClosestMultiple(latest*100,25,services.length-1)
    scrollYProgress.set(newScrollYProgress/100)
  })

  useLayoutEffect(() => {
    if (scrollRef.current) {
      setScrollRange(scrollRef.current.scrollWidth);
    }
  }, [scrollRef]);

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    if (ghostRef.current) {
      resizeObserver.observe(ghostRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [onResize]);


  useEffect(() => {
    // Function to get the positions of the child elements
    const getChildPositions = () => {
      if (scrollRef.current) {
        const childElements =
          scrollRef.current.querySelectorAll<HTMLDivElement>(
            ".thumbnails > .services-mobile-card"
          );
        const positions = Array.from(childElements).map((element) =>
          element.getBoundingClientRect()
        );
        setChildPositions(positions);
      }
    };

    // Call the function to get the positions after the rendering is completed
    getChildPositions();
  }, [services]);

  const transform = useTransform(scrollYProgress, [0, 0.25], [0, -368], {
    clamp: false,
  });

  const physics = { damping: 40, mass: 0.8, stiffness: 100 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <div
        ref={scrollRef}
        style={{height:'600px'  }}
        className={`scroll-container rounded-[0.625rem] will-change-transform w-max overflow-y-auto sticky top-40 ${className}`}
      >
        <motion.section
          
          style={{ x: spring }}
          className="thumbnails-container  sticky top-0 w-max flex items-center"
        >
          <div className="thumbnails relative flex gap-x-6 ">
            {services.map((service, index) => {
              return (
                <ServicesMobileCard
                  head={service.head}
                  body={service.body}
                  key={service.head.title}
                  className="services-mobile-card w-full min-h-[600px] max-w-[90%]  snap-start"
                />
              );
            })}
          </div>
        </motion.section>

        <div
          ref={ghostRef}
          style={{ minHeight: `${scrollRange}px` }}
          className="ghost "
        />
      </div>
    </>
  );
};

export default ServicesMobileWrapper;
