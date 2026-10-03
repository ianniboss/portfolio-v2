import React from "react";
import { motion } from "framer-motion";
import { INTERNSHIP_BEATS } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

const accentHex = (a) => {
  switch (a) {
    case "amber":  return "#C8903A";
    case "teal":   return "#2A8B7A";
    case "purple": return "#8C6BB6";
    default:       return "#9A9490";
  }
};

const Beat = ({ beat, index, total, locale, reduced }) => {
  const title = locale === "fr" ? beat.titleFr : beat.titleEn;
  const text  = locale === "fr" ? beat.textFr  : beat.textEn;
  const color = accentHex(beat.accent);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      data-testid={`internship-beat-${beat.id}`}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-8 py-14 md:py-20 border-t border-white/10 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="md:w-1/2 shrink-0">
        <div
          className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
            src={beat.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-contain"
            style={{ filter: "brightness(0.7) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-25"
            style={{ background: `linear-gradient(135deg, ${color}44, transparent 60%)` }}
          />
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center gap-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color }}
          >
            {beat.date}
          </span>
        </div>

        <div className="w-8 h-[2px]" style={{ background: color }} />

        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.1] text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

const Internship = () => {
  const { t, locale } = useI18n();
  const reduced = useReducedMotion();
  const total = INTERNSHIP_BEATS.length;

  return (
    <section id="internship" data-testid="section-internship" className="relative">
      <div className="px-6 md:px-12 lg:px-20 pt-28 md:pt-40 pb-10 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow"
              >
                / 03 {t.internship.eyebrow}
              </motion.div>
              <motion.h2
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display mt-4 text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)] max-w-2xl"
                data-testid="internship-title"
              >
                {t.internship.title}
              </motion.h2>
            </div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-sm text-[var(--text-secondary)] text-base"
            >
              {t.internship.subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          {INTERNSHIP_BEATS.map((beat, i) => (
            <Beat
              key={beat.id}
              beat={beat}
              index={i}
              total={total}
              locale={locale}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internship;
