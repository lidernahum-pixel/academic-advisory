"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({
  children,
  as: Tag = "div",
  className,
  stagger = 0.1,
  delay = 0,
}: StaggerProps) {
  const MotionTag = motion(Tag as ElementType);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  blur?: boolean;
}

export function StaggerItem({
  children,
  as: Tag = "div",
  className,
  y = 20,
  blur = true,
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion(Tag as ElementType);

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : y,
      filter: blur && !reduced ? "blur(6px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduced ? 0 : 0.65, ease: [0.2, 0.6, 0.2, 1] },
    },
  };

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
