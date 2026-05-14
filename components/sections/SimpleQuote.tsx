"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SimpleQuoteProps {
  quote: string;
  cite: string;
}

export default function SimpleQuote({ quote, cite }: SimpleQuoteProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="text-left max-w-[1100px] mx-auto"
      style={{ padding: "clamp(80px, 11vw, 160px) var(--gutter)" }}
    >
      <motion.blockquote
        initial={{ opacity: 0, y: reduced ? 0 : 28, filter: reduced ? "none" : "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.2, 0.6, 0.2, 1] }}
        className="font-serif italic font-normal leading-[1.15] tracking-[-0.018em] text-ink m-0 mb-7 max-w-[18ch]"
        style={{ fontSize: "clamp(26px, 4.4vw, 64px)" }}
      >
        {quote}
      </motion.blockquote>
      <motion.cite
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-[13px] not-italic text-muted tracking-[0.02em]"
      >
        {cite}
      </motion.cite>
    </section>
  );
}
