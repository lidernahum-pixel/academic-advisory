"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
  strength = 0.22,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const arrowX = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const arrowSX = useSpring(arrowX, { stiffness: 280, damping: 22 });

  const handleMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (reduced || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
    arrowX.set((offsetX / (rect.width / 2)) * 6);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
    arrowX.set(0);
  };

  const isExternal = /^(mailto:|https?:\/\/)/.test(href);

  const baseClasses =
    "group relative inline-flex items-center gap-3.5 font-serif text-[15px] tracking-[-0.005em] overflow-hidden";
  const solidWrap = "bg-ink text-bg px-[28px] py-[15px]";
  const ghostWrap = "bg-transparent text-ink border border-ink px-[27px] py-[14px] hover:text-bg";
  const styles = `${baseClasses} ${variant === "solid" ? solidWrap : ghostWrap} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-x-100 ${
          variant === "solid" ? "bg-[var(--color-accent)]" : "bg-ink"
        }`}
      />
      <span className="relative">{children}</span>
      <motion.span
        aria-hidden
        className="relative text-lg leading-none"
        style={{ x: arrowSX }}
      >
        →
      </motion.span>
    </>
  );

  return (
    <motion.span
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block will-change-transform"
    >
      {isExternal ? (
        <a href={href} className={styles}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={styles}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}
