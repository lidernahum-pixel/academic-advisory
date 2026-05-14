"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface DropCapProps {
  letter: string;
  children: ReactNode;
  className?: string;
}

export default function DropCap({ letter, children, className }: DropCapProps) {
  const reduced = useReducedMotion();
  return (
    <p className={`m-0 ${className ?? ""}`}>
      <motion.span
        initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.2, 0.6, 0.2, 1] }}
        className="float-left mr-3 mt-[0.07em] font-serif italic font-normal leading-[0.85]"
        style={{
          fontSize: "clamp(72px, 7.5vw, 110px)",
          color: "var(--color-accent)",
          fontVariationSettings: '"opsz" 60',
        }}
        aria-hidden
      >
        {letter}
      </motion.span>
      <span className="sr-only">{letter}</span>
      {children}
    </p>
  );
}
