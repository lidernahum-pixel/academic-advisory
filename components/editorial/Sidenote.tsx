"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Sidenote({
  marker,
  label,
  children,
}: {
  marker: string;
  label: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.aside
      initial={{ opacity: 0, x: reduced ? 0 : -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
      className="border-l border-[var(--color-line)] pl-6 max-w-[36ch]"
    >
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
          {marker}
        </span>
        <span className="kicker">{label}</span>
      </div>
      <div className="font-serif text-[15px] leading-[1.6] text-ink-soft italic">
        {children}
      </div>
    </motion.aside>
  );
}
