"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Children, Fragment, isValidElement, type ReactNode, type CSSProperties } from "react";

interface WordStaggerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

function flatten(node: ReactNode): { word: string; isItalic: boolean }[] {
  const raw: { word: string; isItalic: boolean }[] = [];
  const walk = (n: ReactNode, italic: boolean) => {
    if (n == null || typeof n === "boolean") return;
    if (typeof n === "string" || typeof n === "number") {
      String(n)
        .split(/(\s+)/)
        .filter(Boolean)
        .forEach((token) => {
          if (/^\s+$/.test(token)) return;
          raw.push({ word: token, isItalic: italic });
        });
      return;
    }
    if (Array.isArray(n)) {
      n.forEach((c) => walk(c, italic));
      return;
    }
    if (isValidElement<{ children?: ReactNode }>(n)) {
      const isItalic =
        italic ||
        n.type === "em" ||
        n.type === "i" ||
        (typeof n.type === "string" && (n.type === "em" || n.type === "i"));
      walk(n.props.children, isItalic);
      return;
    }
  };
  Children.forEach(node, (c) => walk(c, false));

  // Glue trailing punctuation onto the previous word so we never render
  // a leading space before a comma, period, etc. Each animated word still
  // gets its own span — we just don't insert a space between e.g. "roots"
  // and ".".
  const merged: { word: string; isItalic: boolean }[] = [];
  for (const w of raw) {
    const last = merged[merged.length - 1];
    if (last && /^[.,!?;:'")\]}]+$/.test(w.word)) {
      last.word = last.word + w.word;
    } else {
      merged.push({ ...w });
    }
  }
  return merged;
}

export default function WordStagger({
  children,
  className,
  style,
  stagger = 0.07,
  delay = 0,
  as: Tag = "h1",
}: WordStaggerProps) {
  const reduced = useReducedMotion();
  const words = flatten(children);
  const MotionTag = motion(Tag);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };
  const word: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : "0.4em",
      filter: reduced ? "none" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: reduced ? 0 : 0.85, ease: [0.2, 0.6, 0.2, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className="inline-block align-baseline"
            style={{
              overflow: "hidden",
              paddingBottom: "0.22em",
              marginBottom: "-0.22em",
              paddingRight: "0.05em",
              marginRight: "-0.05em",
            }}
          >
            <motion.span
              variants={word}
              className={`inline-block ${w.isItalic ? "italic" : ""}`}
              style={
                w.isItalic
                  ? {
                      color: "var(--color-accent)",
                      fontVariationSettings: '"opsz" 60',
                    }
                  : undefined
              }
            >
              {w.word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MotionTag>
  );
}
