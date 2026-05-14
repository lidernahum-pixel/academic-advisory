"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TenetsProps {
  items: { n: string; title: string; body: string }[];
}

export default function Tenets({ items }: TenetsProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className="content-max grid grid-cols-1 md:grid-cols-2 border-t border-[var(--color-line)]"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        gap: "clamp(40px, 5vw, 80px)",
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.n}
          initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.75,
            delay: i * 0.1,
            ease: [0.2, 0.6, 0.2, 1],
          }}
        >
          <div className="text-[13px] text-muted mb-3 tracking-[0.02em] font-mono">
            {item.n}
          </div>
          <h4
            className="font-serif font-normal m-0 mb-2.5 leading-[1.15] tracking-[-0.012em]"
            style={{ fontSize: "clamp(22px, 1.9vw, 28px)" }}
          >
            {item.title}
          </h4>
          <p className="text-ink-soft text-[17px] leading-[1.6] m-0 max-w-[44ch]">
            {item.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
