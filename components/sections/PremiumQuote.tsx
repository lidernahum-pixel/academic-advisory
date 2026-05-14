"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface PremiumQuoteProps {
  image: string;
  quote: string;
  cite: string;
}

export default function PremiumQuote({ image, quote, cite }: PremiumQuoteProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden isolate flex items-center justify-center"
      style={{ minHeight: "78vh", padding: "clamp(80px, 12vw, 180px) var(--gutter)" }}
    >
      <motion.div
        initial={{ scale: reduced ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.8, ease: [0.2, 0.6, 0.2, 1] }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(0.2) brightness(0.7)" }}
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20,19,15,0.55) 0%, rgba(20,19,15,0.85) 80%), linear-gradient(180deg, rgba(20,19,15,0.5) 0%, rgba(20,19,15,0.85) 100%)",
        }}
      />
      <div className="text-center max-w-[38ch]" style={{ color: "#f3f1ea" }}>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.2, 0.6, 0.2, 1] }}
          className="font-serif italic leading-[0.3]"
          style={{
            fontSize: "clamp(60px, 9vw, 140px)",
            color: "var(--color-warm-gold)",
            marginBottom: "clamp(28px, 5vw, 70px)",
            opacity: 0.85,
          }}
        >
          “
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, y: reduced ? 0 : 28, filter: reduced ? "none" : "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.2, 0.6, 0.2, 1] }}
          className="font-serif italic font-light leading-[1.12] tracking-[-0.02em] m-0 mb-9 text-cream text-balance"
          style={{
            fontSize: "clamp(26px, 4.6vw, 68px)",
            fontVariationSettings: '"opsz" 60',
          }}
        >
          {quote}
        </motion.blockquote>
        <motion.cite
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-[13px] tracking-[0.32em] uppercase not-italic"
          style={{ color: "rgba(243,241,234,0.65)" }}
        >
          {cite}
        </motion.cite>
      </div>
    </section>
  );
}
