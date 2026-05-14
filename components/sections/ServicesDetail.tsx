"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ServicesDetailProps {
  items: { n: string; title: string; body: string }[];
}

export default function ServicesDetail({ items }: ServicesDetailProps) {
  const reduced = useReducedMotion();

  return (
    <div className="content-max border-t border-[var(--color-line)]">
      {items.map((item, i) => (
        <motion.div
          key={item.n}
          initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            delay: i * 0.06,
            ease: [0.2, 0.6, 0.2, 1],
          }}
          className="grid grid-cols-[50px_1fr] md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1.6fr)] gap-x-4 md:gap-x-7 py-11 border-b border-[var(--color-line)]"
        >
          <div className="text-[13px] text-muted pt-1.5 font-mono tracking-[0.02em]">
            {item.n}
          </div>
          <h4
            className="font-serif font-normal m-0 leading-[1.05] tracking-[-0.014em]"
            style={{ fontSize: "clamp(24px, 2.4vw, 34px)" }}
          >
            {item.title}
          </h4>
          <p className="text-[17px] leading-[1.55] text-ink-soft m-0 max-w-[52ch] col-start-2 md:col-start-3">
            {item.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
