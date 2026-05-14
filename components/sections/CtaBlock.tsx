"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import MagneticButton from "@/components/motion/MagneticButton";

interface CtaBlockProps {
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  marker?: string;
}

export default function CtaBlock({
  heading,
  body,
  ctaLabel,
  ctaHref,
  marker = "Begin",
}: CtaBlockProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="border-t border-[var(--color-line)]"
      style={{ padding: "clamp(80px, 10vw, 160px) var(--gutter)" }}
    >
      <div className="content-max">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
          className="flex items-baseline gap-4 mb-10 md:mb-14"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
            ✦ {marker}
          </span>
          <span aria-hidden className="flex-1 h-px bg-[var(--color-line)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 md:gap-16 items-end">
          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.2, 0.6, 0.2, 1] }}
            className="font-display max-w-[14ch]"
            style={{ fontSize: "clamp(32px, 5.6vw, 84px)" }}
          >
            {heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.6, 0.2, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <p className="text-ink-soft text-[17px] max-w-[42ch] m-0">{body}</p>
            <MagneticButton href={ctaHref}>{ctaLabel}</MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Re-export a simple text-link CtaButton for inline use
export { default as CtaButton } from "@/components/motion/MagneticButton";
