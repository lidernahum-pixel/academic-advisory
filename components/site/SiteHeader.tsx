"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import Monogram from "./Monogram";

const NAV_ITEMS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/consulting", label: "Consulting" },
  { href: "/management", label: "Management" },
  { href: "/licensing", label: "Licensing" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  const scaleX = useTransform(progress, (v) => v);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
      className="sticky top-0 z-50 backdrop-blur-md transition-colors"
      style={{
        background: isScrolled
          ? "rgba(243,241,234,0.86)"
          : "rgba(243,241,234,1)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="container-x grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8 pt-5 md:pt-6">
        <div className="hidden md:flex items-center gap-3 kicker">
          <span className="inline-block h-px w-6 bg-[var(--color-ink-soft)] opacity-40" />
          The Academic Advisory · LLC
        </div>

        <Link
          href="/"
          className="group flex items-center gap-3 justify-center"
          aria-label="The Academic Advisory — Home"
        >
          <Monogram size={24} className="text-ink hidden md:block" />
          <span className="font-serif font-normal text-[19px] tracking-[-0.012em] text-ink leading-none whitespace-nowrap">
            The Academic Advisory
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3 kicker justify-end">
          San Juan · New York · London
          <span className="inline-block h-px w-6 bg-[var(--color-ink-soft)] opacity-40" />
        </div>
      </div>

      <nav className="container-x flex flex-wrap justify-center gap-x-7 md:gap-x-10 gap-y-2 pb-3.5 mt-2">
        {NAV_ITEMS.map((item) => {
          const active = isCurrent(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[14px] py-1 transition-colors"
              style={{ color: active ? "var(--color-ink)" : "var(--color-ink-soft)" }}
            >
              {item.label}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--color-ink)] transition-transform duration-500 ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-x-100"
              />
              {active && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-px bg-ink"
                  transition={{ duration: 0.45, ease: [0.2, 0.6, 0.2, 1] }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[var(--color-ink)]"
        style={{ scaleX, opacity: 0.85 }}
      />
    </motion.header>
  );
}
