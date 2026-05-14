"use client";

import { motion, useReducedMotion } from "framer-motion";

interface StatusBandProps {
  kicker?: string;
  status: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function StatusBand({
  kicker = "Currently",
  status,
  body,
  ctaLabel,
  ctaHref,
}: StatusBandProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="container-x"
      style={{ paddingTop: "clamp(72px,10vw,140px)", paddingBottom: "clamp(72px,10vw,140px)" }}
    >
      <div className="content-max border-y border-[var(--color-line)]" style={{ padding: "clamp(36px,5vw,72px) 0" }}>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-baseline gap-x-8 gap-y-5"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="relative inline-flex h-2 w-2"
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
                animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0] }}
                transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
              />
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
              {kicker}
            </span>
          </div>

          <div
            className="font-serif font-normal leading-[1.2] tracking-[-0.014em] text-balance"
            style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
          >
            <span className="text-ink">{status}</span>{" "}
            <span className="text-ink-soft">— {body}</span>
          </div>

          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="group inline-flex items-baseline gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 whitespace-nowrap transition-[gap,color,border-color] duration-300 hover:gap-3 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]"
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
