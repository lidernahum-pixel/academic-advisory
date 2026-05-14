"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  duration?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 24,
  blur = true,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion(Tag as ElementType);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : y,
      filter: blur && !reduced ? "blur(6px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduced ? 0 : duration,
        delay,
        ease: [0.2, 0.6, 0.2, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
