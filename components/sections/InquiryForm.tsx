"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ROLES = [
  "A parent or family member",
  "A prospective student",
  "An institution or school",
  "An educational firm seeking management support",
  "A potential licensing partner",
  "Other",
];

const PRACTICES = [
  "Educational Consulting",
  "Management & Operations",
  "Intellectual Property & Licensing",
  "Undecided — would value your guidance",
];

export default function InquiryForm() {
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-[var(--color-line)] rounded-none px-0 pt-1.5 pb-2.5 font-serif text-[18px] text-ink outline-none transition-colors focus:border-ink";

  const labelClass =
    "block text-[12px] text-muted tracking-[0.02em] mb-2";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.6, 0.2, 1] }}
      className="grid gap-6 max-w-[640px]"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="fn" className={labelClass}>
            First Name
          </label>
          <input id="fn" name="fn" type="text" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="ln" className={labelClass}>
            Last Name
          </label>
          <input id="ln" name="ln" type="text" required className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="em" className={labelClass}>
            Email
          </label>
          <input id="em" name="em" type="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="ph" className={labelClass}>
            Telephone (optional)
          </label>
          <input id="ph" name="ph" type="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
          I am writing as
        </label>
        <select id="role" name="role" className={fieldClass}>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="practice" className={labelClass}>
          Practice of Interest
        </label>
        <select id="practice" name="practice" className={fieldClass}>
          {PRACTICES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="msg" className={labelClass}>
          Your Message
        </label>
        <textarea
          id="msg"
          name="msg"
          required
          placeholder="A few sentences about who you are and what you are looking for…"
          className={`${fieldClass} min-h-[130px] resize-y leading-[1.5]`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-1.5">
        <span className="text-[13px] text-muted italic">
          We respond personally within two business days.
        </span>
        <button
          type="submit"
          disabled={submitted}
          className="group inline-flex items-center gap-3.5 bg-ink text-bg px-[26px] py-[14px] font-serif text-[15px] tracking-[-0.005em] transition-[background,color,transform] duration-300 will-change-transform hover:bg-[var(--color-accent)] hover:scale-[1.012] disabled:opacity-70 disabled:hover:bg-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={submitted ? "sent" : "send"}
              initial={{ opacity: 0, y: reduced ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={{ duration: 0.25 }}
            >
              {submitted ? "Sent" : "Send Inquiry"}
            </motion.span>
          </AnimatePresence>
          <span
            aria-hidden
            className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.p
            key="thanks"
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="m-0 italic"
            style={{ color: "var(--color-accent)" }}
          >
            Thank you — your note has been received. We will be in touch shortly.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
