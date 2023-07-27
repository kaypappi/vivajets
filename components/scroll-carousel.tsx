import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import React, { useCallback, useEffect, useState } from 'react'

type Axis = 'x' | 'y'

const ScrollCarousel = ({ children }: { children: React.ReactNode }) => {
  const [axis, setAxis] = useState<Axis>('x')
  const [forceWheelAxis, setForceWheelAxis] = useState<Axis | undefined>("y")
  const [target, setTarget] = useState<Element | undefined>()
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, skipSnaps: true, axis }, [
    WheelGesturesPlugin({
      forceWheelAxis,
      target,
    }),
  ])


  return (
    <>
      <div className="embla__scroll w-full " data-axis={axis}>
        <div ref={emblaRef} className="embla__scroll__viewport ">
          <div className="embla__scroll__container ">
            {React.Children.map(children, (Child, index) => (
              <div className="embla__scroll__slide" key={index}>
                <div className="embla__scroll__slide__inner">{Child}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScrollCarousel
