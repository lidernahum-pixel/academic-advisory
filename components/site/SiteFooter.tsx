"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";

const FIRM_LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const PRACTICE_LINKS = [
  { href: "/consulting", label: "Educational Consulting" },
  { href: "/management", label: "Management & Operations" },
  { href: "/licensing", label: "IP & Licensing" },
];

const JURISDICTIONS = [
  { city: "San Juan", region: "Puerto Rico" },
  { city: "New York", region: "United States" },
  { city: "London", region: "United Kingdom" },
];

export default function SiteFooter() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();
  const [signed, setSigned] = useState(false);

  const reveal = {
    hidden: { opacity: 0, y: reduced ? 0 : 18, filter: reduced ? "none" : "blur(4px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.07, duration: 0.7, ease: [0.2, 0.6, 0.2, 1] as [number, number, number, number] },
    }),
  };

  const handleSign = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigned(true);
  };

  return (
    <footer
      className="text-[#d9d4c5] relative overflow-hidden"
      style={{
        background: "var(--color-ink)",
        padding: "clamp(70px, 10vw, 130px) var(--gutter) 36px",
      }}
    >
      {/* faint typographic backdrop — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-8 select-none font-serif italic leading-none text-[clamp(140px,22vw,360px)] opacity-[0.045] whitespace-nowrap hidden md:block"
        style={{
          color: "var(--color-warm-gold)",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        Advisory
      </div>

      <div className="content-max relative">
        {/* Mailing line */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-20 pb-16 md:pb-20 border-b border-[rgba(217,212,197,0.18)]"
        >
          <div>
            <div
              className="font-serif text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.018em] max-w-[18ch]"
              style={{ color: "#f3f1ea" }}
            >
              Quarterly{" "}
              <em className="italic" style={{ color: "var(--color-warm-gold)", fontVariationSettings: '"opsz" 60' }}>note</em>.
            </div>
            <p
              className="mt-5 text-[15px] leading-[1.65] max-w-[44ch]"
              style={{ color: "rgba(217,212,197,0.74)" }}
            >
              Four issues a year. Counsel, not promotion.
            </p>
          </div>
          <form
            onSubmit={handleSign}
            className="flex flex-col gap-4 md:self-end"
          >
            <label
              htmlFor="ml"
              className="font-mono text-[11px] tracking-[0.18em] uppercase"
              style={{ color: "var(--color-warm-gold)" }}
            >
              Subscribe
            </label>
            <div className="flex items-end gap-4 border-b border-[rgba(217,212,197,0.3)] pb-2 transition-colors focus-within:border-[var(--color-warm-gold)]">
              <input
                id="ml"
                type="email"
                required
                placeholder="your@email"
                disabled={signed}
                className="flex-1 bg-transparent outline-none border-0 font-serif text-[18px] py-1.5"
                style={{ color: "#f3f1ea" }}
              />
              <button
                type="submit"
                disabled={signed}
                className="font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:text-[var(--color-warm-gold)]"
                style={{ color: signed ? "var(--color-warm-gold)" : "#d9d4c5" }}
              >
                {signed ? "Received →" : "Send →"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Three-column lockup */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.9fr_0.9fr] gap-10 md:gap-16 py-14 border-b border-[rgba(217,212,197,0.15)]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
          >
            <div className="font-serif text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.018em] text-[#f3f1ea] max-w-[14ch]">
              The Academic{" "}
              <em
                className="italic"
                style={{ color: "var(--color-warm-gold)", fontVariationSettings: '"opsz" 60' }}
              >
                Advisory
              </em>
            </div>
            <p
              className="mt-6 text-[15px] leading-[1.65] max-w-[36ch]"
              style={{ color: "rgba(217,212,197,0.74)" }}
            >
              A private consultancy in education — based in San Juan, Puerto
              Rico, working with families and institutions across the mainland
              United States and internationally.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
          >
            <h5
              className="font-mono text-[11px] tracking-[0.18em] uppercase mb-5"
              style={{ color: "var(--color-warm-gold)" }}
            >
              Firm
            </h5>
            <ul className="grid gap-2 list-none p-0 m-0">
              {FIRM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-serif text-[18px] text-[#d9d4c5] transition-colors hover:text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="opacity-0 -translate-x-2 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--color-warm-gold)]"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={3}
          >
            <h5
              className="font-mono text-[11px] tracking-[0.18em] uppercase mb-5"
              style={{ color: "var(--color-warm-gold)" }}
            >
              Practices
            </h5>
            <ul className="grid gap-2 list-none p-0 m-0">
              {PRACTICE_LINKS.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-baseline gap-2 font-serif text-[17px] text-[#d9d4c5] transition-colors hover:text-white"
                  >
                    <span
                      className="font-mono text-[10px] opacity-50"
                      style={{ color: "var(--color-warm-gold)" }}
                    >
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Jurisdictions */}
        <div className="py-12 border-b border-[rgba(217,212,197,0.15)]">
          <div className="flex items-baseline gap-4 mb-6">
            <span
              className="font-mono text-[11px] tracking-[0.18em] uppercase"
              style={{ color: "var(--color-warm-gold)" }}
            >
              By Appointment
            </span>
            <span
              aria-hidden
              className="flex-1 h-px"
              style={{ background: "rgba(217,212,197,0.18)" }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {JURISDICTIONS.map((j, i) => (
              <motion.div
                key={j.city}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.1 }}
              >
                <div
                  className="font-serif italic text-[clamp(17px,2vw,28px)] leading-tight"
                  style={{ color: "#f3f1ea", fontVariationSettings: '"opsz" 36' }}
                >
                  {j.city}
                </div>
                <div
                  className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] uppercase mt-1"
                  style={{ color: "rgba(217,212,197,0.55)" }}
                >
                  {j.region}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Colophon */}
        <div
          className="mt-9 flex flex-wrap gap-y-2 gap-x-5 sm:gap-x-9 text-[11px] sm:text-[12px] tracking-[0.04em] items-center"
          style={{ color: "rgba(217,212,197,0.55)" }}
        >
          <span className="font-mono">© {year} The Academic Advisory, LLC</span>
          <a
            href="mailto:Admin@TheAcademicAdvisory.com"
            className="font-mono transition-colors hover:text-white break-all"
          >
            Admin@TheAcademicAdvisory.com
          </a>
          <span className="font-mono">San Juan · Puerto Rico 00911</span>
          <span className="sm:ml-auto font-mono italic" style={{ color: "rgba(217,212,197,0.4)" }}>
            MMXXVI
          </span>
        </div>
      </div>
    </footer>
  );
}
