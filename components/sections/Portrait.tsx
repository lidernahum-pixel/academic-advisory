"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import DropCap from "@/components/editorial/DropCap";

interface PortraitProps {
  image: string;
  name: string;
  role: string;
  paragraphs: string[];
}

export default function Portrait({ image, name, role, paragraphs }: PortraitProps) {
  const reduced = useReducedMotion();

  return (
    <section className="container-x" style={{ padding: "clamp(60px,9vw,120px) 0" }}>
      <div className="content-max grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.2, 0.6, 0.2, 1] }}
        >
          <figure className="relative aspect-[4/5] overflow-hidden bg-paper">
            <Image
              src={image}
              alt={`${name}, ${role}`}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <motion.div
              aria-hidden
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.15 }}
              className="absolute inset-0 origin-right"
              style={{ background: "var(--color-bg)" }}
            />
          </figure>
          <div className="flex justify-between mt-4 text-[12px] text-muted tracking-[0.04em]">
            <span className="font-mono uppercase tracking-[0.18em]">{name}</span>
            <em className="italic font-serif text-ink-soft">{role}</em>
          </div>
        </motion.div>

        <div className="text-[19px] leading-[1.75] text-ink max-w-[58ch]">
          {paragraphs.map((p, i) =>
            i === 0 ? (
              <DropCap key={i} letter={p[0]}>
                <span className="font-serif">{p.slice(1)}</span>
              </DropCap>
            ) : (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: reduced ? 0 : 18, filter: reduced ? "none" : "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + i * 0.12,
                  ease: [0.2, 0.6, 0.2, 1],
                }}
                className="m-0 mt-7"
              >
                {p}
              </motion.p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
