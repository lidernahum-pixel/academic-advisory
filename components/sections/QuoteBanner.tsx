"use client";

import { motion, useReducedMotion } from "framer-motion";

interface QuoteBannerProps {
  image: string;
  quote: string;
  cite: string;
}

export default function QuoteBanner({ image, quote, cite }: QuoteBannerProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "75vh", minHeight: 480 }}
    >
      <motion.img
        src={image}
        alt=""
        initial={{ scale: reduced ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: [0.2, 0.6, 0.2, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,19,15,0) 30%, rgba(20,19,15,0.55) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "clamp(40px, 6vw, 80px)",
          width: "calc(100% - 2 * var(--gutter))",
          maxWidth: "var(--content-max)",
          color: "#f3f1ea",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 28, filter: reduced ? "none" : "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div
            className="font-serif italic leading-[1.2] max-w-[28ch]"
            style={{ fontSize: "clamp(20px, 2.4vw, 34px)" }}
          >
            “{quote}”
          </div>
          <div
            className="text-[12px] tracking-[0.18em] uppercase whitespace-nowrap"
            style={{ color: "rgba(243,241,234,0.7)" }}
          >
            {cite}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
