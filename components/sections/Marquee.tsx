"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

interface MarqueeProps {
  items: string[];
  duration?: number;
  className?: string;
}

export default function Marquee({
  items,
  duration = 60,
  className = "",
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const sequence = [...items, ...items, ...items];

  return (
    <section
      className={`relative overflow-hidden border-y border-[var(--color-line)] py-7 ${className}`}
      aria-label="Practice attributes"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      <motion.div
        className="flex flex-nowrap whitespace-nowrap gap-x-12 will-change-transform"
        animate={
          reduced ? undefined : { x: ["0%", "-33.333%"] }
        }
        transition={
          reduced
            ? undefined
            : { duration, ease: "linear", repeat: Infinity }
        }
      >
        {sequence.map((item, i) => (
          <Fragment key={i}>
            <span className="font-serif italic text-[clamp(22px,2.4vw,36px)] tracking-[-0.012em] text-ink whitespace-nowrap">
              {item}
            </span>
            <span
              aria-hidden
              className="text-[clamp(22px,2.4vw,36px)] text-[var(--color-warm-gold)] self-center"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ✦
            </span>
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
}
