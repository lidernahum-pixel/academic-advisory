"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface PremiumCard {
  index: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
  alt: string;
}

export default function PremiumCards({ cards }: { cards: PremiumCard[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="content-max grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
      {cards.map((card, i) => (
        <motion.div
          key={card.href}
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, delay: i * 0.12, ease: [0.2, 0.6, 0.2, 1] }}
        >
          <Link
            href={card.href}
            className="group block relative overflow-hidden"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-paper">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-[transform,filter] duration-[2200ms] ease-[cubic-bezier(.2,.6,.2,1)] group-hover:scale-[1.045] brightness-[0.88] saturate-[0.78] group-hover:brightness-100 group-hover:saturate-100"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,19,15,0.18) 0%, rgba(20,19,15,0) 35%, rgba(20,19,15,0.78) 100%)",
                }}
              />

              {/* chapter index */}
              <div className="absolute top-5 left-5 right-5 flex items-baseline justify-between text-cream">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-80">
                  Practice · {card.index}
                </span>
                <span
                  aria-hidden
                  className="h-px w-10 bg-cream opacity-50 transition-[width,opacity] duration-500 group-hover:w-16 group-hover:opacity-90"
                />
              </div>

              {/* title + excerpt */}
              <div
                className="absolute flex flex-col gap-3 text-cream"
                style={{
                  left: "clamp(20px, 2.4vw, 36px)",
                  right: "clamp(20px, 2.4vw, 36px)",
                  bottom: "clamp(24px, 3vw, 36px)",
                }}
              >
                <h3
                  className="font-serif italic font-normal m-0 leading-[1.05] tracking-[-0.018em] [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]"
                  style={{
                    fontSize: "clamp(24px, 2.4vw, 36px)",
                    fontVariationSettings: '"opsz" 36',
                  }}
                  dangerouslySetInnerHTML={{ __html: card.title }}
                />

                {/* excerpt — hidden default, slides up on hover */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-[max-height] duration-[700ms] ease-[cubic-bezier(.2,.6,.2,1)]">
                  <p
                    className="m-0 text-[14px] leading-[1.55] opacity-0 translate-y-2 transition-[opacity,transform] duration-[500ms] delay-[150ms] group-hover:opacity-90 group-hover:translate-y-0"
                    style={{ color: "rgba(243,241,234,0.92)" }}
                  >
                    {card.excerpt}
                  </p>
                </div>

                <span className="self-start inline-flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase text-cream pb-1.5 border-b border-[rgba(243,241,234,0.6)] transition-[gap,border-color] duration-300 group-hover:gap-3.5 group-hover:border-cream">
                  Enter Practice
                  <span aria-hidden className="font-serif text-sm tracking-normal">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
