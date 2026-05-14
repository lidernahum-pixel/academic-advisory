"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AppointmentTag() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : reduced ? 0 : 12,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.5, ease: [0.2, 0.6, 0.2, 1] }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40"
    >
      <Link
        href="/contact"
        className="flex items-center gap-2.5 px-4 py-2.5 bg-ink text-bg rounded-full shadow-[0_10px_30px_-8px_rgba(20,19,15,0.45)] active:scale-[0.97] transition-transform"
      >
        <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
          <span
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--color-warm-gold)" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--color-warm-gold)" }}
            animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0] }}
            transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
          />
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
          By Appointment
        </span>
      </Link>
    </motion.div>
  );
}
