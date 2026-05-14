"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Dispatch {
  date: string;
  kicker: string;
  title: string;
  body: string;
}

const DEFAULT_ITEMS: Dispatch[] = [
  {
    date: "March, 2026",
    kicker: "From the Practice",
    title: "On the long view of an admissions cycle.",
    body: "Two months past results, we are reminded again that the most durable outcomes follow students who were taught to read the work, not merely to win.",
  },
  {
    date: "January, 2026",
    kicker: "Field Note",
    title: "When mentorship is the curriculum.",
    body: "A short reflection on neurodivergent learners and the small, considered adjustments that often unlock years of progress.",
  },
  {
    date: "November, 2025",
    kicker: "From the Founder",
    title: "Twenty years of working with families.",
    body: "Elisabeth on what has changed in private educational counsel — and what, by design, never will.",
  },
];

export default function Dispatches({
  items = DEFAULT_ITEMS,
}: {
  items?: Dispatch[];
}) {
  const reduced = useReducedMotion();

  return (
    <section
      className="container-x"
      style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(80px,10vw,140px)" }}
    >
      <div className="content-max">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
          className="flex items-baseline gap-4 mb-12 md:mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
            ✦ Dispatches
          </span>
          <span aria-hidden className="flex-1 h-px bg-[var(--color-line)]" />
          <span className="kicker hidden md:inline">An occasional letter</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {items.map((d, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: reduced ? 0 : 24, filter: reduced ? "none" : "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                delay: i * 0.12,
                ease: [0.2, 0.6, 0.2, 1],
              }}
              className="group flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
                  {d.date}
                </span>
                <span aria-hidden className="text-muted opacity-50">·</span>
                <span className="kicker">{d.kicker}</span>
              </div>
              <h3
                className="font-serif font-normal m-0 leading-[1.15] tracking-[-0.014em] text-balance"
                style={{ fontSize: "clamp(22px, 2vw, 30px)" }}
              >
                {d.title}
              </h3>
              <p className="mt-4 text-ink-soft text-[16px] leading-[1.65] m-0">
                {d.body}
              </p>
              <span
                aria-hidden
                className="mt-6 h-px w-12 bg-ink opacity-50 transition-[width,opacity] duration-500 group-hover:w-24 group-hover:opacity-100"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
