"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface CurtainImageProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  parallax?: boolean;
}

const ratioStyles: Record<string, string> = {
  "21/9": "aspect-[21/9]",
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
};

export default function CurtainImage({
  src,
  alt,
  ratio = "21/9",
  className = "",
  priority = false,
  sizes = "(min-width: 1280px) 1160px, 100vw",
}: CurtainImageProps) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true, margin: "-80px" }}
      className={`relative overflow-hidden bg-paper ${ratioStyles[ratio] ?? ratio} ${className}`}
    >
      <motion.div
        initial={{ scale: reduced ? 1 : 1.08 }}
        animate={revealed ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.2, 0.6, 0.2, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={revealed ? { scaleY: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
        className="absolute inset-0 origin-bottom"
        style={{ background: "var(--color-bg)" }}
      />

      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={revealed ? { scaleY: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-0 origin-bottom"
        style={{ background: "var(--color-ink)" }}
      />
    </motion.div>
  );
}
