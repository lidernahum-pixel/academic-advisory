"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduced ? 0 : 16, filter: reduced ? "none" : "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: reduced ? 0 : -8, filter: reduced ? "none" : "blur(4px)" }}
        transition={{ duration: 0.55, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
