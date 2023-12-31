"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all rounded-full text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        white:
          "bg-white text-brand hover:bg-transparent hover:text-white ring-transparent ring-2 hover:ring-white dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        clay: "bg-clay text-white hover:bg-clay hover:bg-opacity-[.16] hover:backdrop-blur-lg ring-transparent ring-2 hover:ring-clay dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90  dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
        outline:
          "border border-white bg-transparent hover:bg-white hover:text-brand dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: " px-10 py-6",
        sm: "px-4 py-3 text-xs",
        lg: "  px-8 py-3",
        xl: "px-10 py-3",
        "2xl": "px-12 py-3",
        "3xl": "px-14 py-3",
        "4xl": "px-16 py-3",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>["variant"];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <motion.div
      className=""
      whileHover={{
        x:[0,5,2,5],
        y:[0,5,2,5],
        transition: {
          duration: 0.5,
        }
      }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
