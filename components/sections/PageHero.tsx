"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import WordStagger from "@/components/motion/WordStagger";

interface PageHeroProps {
  metaLeft: string;
  metaRight: string;
  title: ReactNode;
  subLeftLabel?: string;
  subLeft?: ReactNode;
  subRight?: ReactNode;
  titleMaxCh?: number;
}

export default function PageHero({
  metaLeft,
  metaRight,
  title,
  subLeftLabel,
  subLeft,
  subRight,
  titleMaxCh = 14,
}: PageHeroProps) {
  const reduced = useReducedMotion();

  const fade = (delay: number, y = 18) => ({
    initial: { opacity: 0, y: reduced ? 0 : y, filter: reduced ? "none" : "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: [0.2, 0.6, 0.2, 1] as const },
  });

  return (
    <section
      className="container-x relative"
      style={{
        paddingTop: "clamp(48px, 9vw, 160px)",
        paddingBottom: "clamp(40px, 7vw, 110px)",
      }}
    >
      {/* meta strip */}
      <motion.div
        {...fade(0)}
        className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[var(--color-line)] pb-4 mb-[clamp(40px,7vw,100px)]"
      >
        <span className="kicker">{metaLeft}</span>
        <span aria-hidden className="text-muted">·</span>
        <span className="kicker">{metaRight}</span>
        <span className="ml-auto font-mono text-[10px] tracking-[0.18em] uppercase text-muted hidden md:inline">
          Lat. 18°27′N · Long. 66°06′W
        </span>
      </motion.div>

      {/* word-stagger title */}
      <WordStagger
        className="font-display"
        as="h1"
        style={{
          fontSize: "clamp(38px, 8vw, 132px)",
          maxWidth: `${titleMaxCh}ch`,
          letterSpacing: "-0.025em",
        }}
      >
        {title}
      </WordStagger>

      {(subLeft || subRight) && (
        <motion.div
          {...fade(0.5)}
          className="grid grid-cols-1 md:grid-cols-[minmax(220px,1fr)_minmax(0,1.8fr)] gap-7 md:gap-16 items-end"
          style={{ marginTop: "clamp(40px, 6vw, 80px)" }}
        >
          {subLeft && (
            <div className="text-ink text-base leading-[1.55]">
              {subLeftLabel && (
                <span className="block text-muted mb-2 text-[11px] tracking-[0.18em] uppercase font-mono">
                  {subLeftLabel}
                </span>
              )}
              {subLeft}
            </div>
          )}
          {subRight && (
            <div
              className="text-ink-soft text-[18px] leading-[1.6] md:relative"
              style={{ maxWidth: "44ch" }}
            >
              {subRight}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
