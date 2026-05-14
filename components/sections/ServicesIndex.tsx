"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface ServicesIndexProps {
  items: { n: string; title: string; body: string; href: string }[];
}

export default function ServicesIndex({ items }: ServicesIndexProps) {
  const reduced = useReducedMotion();

  return (
    <div className="content-max border-t border-[var(--color-line)]">
      {items.map((item, i) => (
        <motion.div
          key={item.n}
          initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.6, 0.2, 1] }}
          className="border-b border-[var(--color-line)]"
        >
          <Link
            href={item.href}
            className="group block py-9 transition-colors hover:bg-[rgba(20,19,15,0.025)] -mx-4 md:-mx-6 px-4 md:px-6"
          >
            <div className="grid grid-cols-[50px_1fr] md:grid-cols-[60px_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] gap-x-4 md:gap-x-5 items-baseline">
              <span className="text-[14px] text-muted font-mono tracking-[0.04em] col-start-1 row-start-1">
                {item.n}
              </span>
              <h3
                className="font-serif font-normal m-0 leading-[1.05] tracking-[-0.018em] col-start-2 row-start-1"
                style={{ fontSize: "clamp(22px, 2.7vw, 38px)" }}
              >
                {item.title}
              </h3>
              <p className="m-0 text-ink-soft text-[17px] leading-[1.55] max-w-[50ch] col-start-2 md:col-start-3 row-start-2 md:row-start-1 mt-3 md:mt-0">
                {item.body}
              </p>
              <div className="text-[13px] text-ink-soft italic flex items-center whitespace-nowrap col-start-2 row-start-3 mt-2 md:col-start-4 md:row-start-1 md:mt-0 md:justify-end">
                Read
                <span
                  aria-hidden
                  className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
