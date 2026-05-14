"use client";

import { motion, useReducedMotion } from "framer-motion";
import CurtainImage from "@/components/motion/CurtainImage";

interface FeatureFigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  ratio?: "21/9" | "16/10" | "16/9" | "4/5" | "3/4" | "1/1";
}

export default function FeatureFigure({
  src,
  alt,
  caption,
  credit,
  ratio = "21/9",
}: FeatureFigureProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className="container-x"
      style={{ paddingBottom: "clamp(60px, 7vw, 120px)" }}
    >
      <div className="content-max">
        <CurtainImage src={src} alt={alt} ratio={ratio} />
        {(caption || credit) && (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-3 flex justify-between items-baseline gap-4 text-[12px] text-muted tracking-[0.02em]"
          >
            <em className="not-italic text-ink-soft italic">{caption}</em>
            {credit && (
              <span className="font-mono uppercase tracking-[0.18em] text-[10px] opacity-70">
                {credit}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
