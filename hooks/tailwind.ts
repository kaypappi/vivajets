import create from "@kodingdotninja/use-tailwind-breakpoint";
import { useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

const config = resolveConfig(tailwindConfig);

const { useBreakpoint: useBreakpointOriginal,useBreakpointEffect } = create(config.theme?.screens);

 const useBreakpoint = (
  breakpoint: "sm" | "md" | "lg" | "xl" | "2xl"
) => {
  const isBreakpointOrLarger = useBreakpointOriginal(breakpoint);

  // Workaround for a bug with the use-tailwind-breakpoint library. See:
  // https://github.com/kodingdotninja/use-tailwind-breakpoint/issues/2#issuecomment-1030703188
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return isBreakpointOrLarger;
};

export { useBreakpoint, useBreakpointEffect };