"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadProps {
  index: string;
  kicker: string;
  title: ReactNode;
}

export default function SectionHead({ index, kicker, title }: SectionHeadProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18, filter: reduced ? "none" : "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
      className="content-max flex flex-col items-start gap-6 md:gap-7 pb-[clamp(40px,6vw,80px)] mb-[clamp(40px,6vw,80px)] border-b border-[var(--color-line)]"
    >
      <div className="flex gap-3 items-baseline">
        <span className="text-muted text-[14px] tracking-[0.02em] font-mono">
          {index}
        </span>
        <span className="kicker text-ink">{kicker}</span>
      </div>
      <h2
        className="font-display max-w-[22ch] m-0"
        style={{ fontSize: "clamp(40px, 5.6vw, 84px)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
