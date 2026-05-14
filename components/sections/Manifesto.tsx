"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface ManifestoProps {
  text: ReactNode;
  body: ReactNode[];
  link?: { href: string; label: string };
  sidenote?: ReactNode;
}

export default function Manifesto({ text, body, link, sidenote }: ManifestoProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="container-x"
      style={{ padding: "clamp(80px, 12vw, 180px) var(--gutter)" }}
    >
      <div className="content-max grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 md:gap-24 items-start">
        <div className="md:sticky md:top-32 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.2, 0.6, 0.2, 1] }}
            className="font-serif font-normal leading-[1.25] tracking-[-0.012em] text-ink max-w-[22ch] text-balance"
            style={{ fontSize: "clamp(24px, 2.8vw, 40px)" }}
          >
            {text}
          </motion.div>
          {sidenote && <div>{sidenote}</div>}
        </div>

        <div className="flex flex-col gap-6 text-ink-soft text-[18px] leading-[1.65] max-w-[52ch]">
          {body.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.1,
                ease: [0.2, 0.6, 0.2, 1],
              }}
              className="m-0"
            >
              {para}
            </motion.p>
          ))}
          {link && (
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.2, 0.6, 0.2, 1],
              }}
              className="mt-4"
            >
              <Link
                href={link.href}
                className="group inline-flex items-center gap-2.5 text-base text-ink border-b border-ink pb-0.5 whitespace-nowrap transition-[gap,color,border-color] duration-300 hover:gap-3.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
              >
                {link.label}{" "}
                <span aria-hidden className="transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
