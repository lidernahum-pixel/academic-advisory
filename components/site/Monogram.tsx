"use client";

import { motion } from "framer-motion";

/**
 * Custom AA ligatured mark — two A's sharing a crossbar, framed
 * by a fine round-topped enclosure that nods to a seal/cartouche.
 */
export default function Monogram({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-label="The Academic Advisory monogram"
      role="img"
    >
      {/* Outer cartouche — soft round-topped frame */}
      <path
        d="M 8 24 Q 8 8 32 8 Q 56 8 56 24 L 56 56 L 8 56 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.55"
      />
      {/* Inner mark — two slim A's sharing a crossbar */}
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        fill="none"
      >
        {/* left A */}
        <path d="M 18 46 L 25 22 L 32 46" />
        {/* right A */}
        <path d="M 32 46 L 39 22 L 46 46" />
        {/* shared crossbar */}
        <path d="M 22.5 36 L 41.5 36" />
      </g>
      {/* base rule */}
      <line
        x1="14"
        y1="51"
        x2="50"
        y2="51"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </motion.svg>
  );
}
