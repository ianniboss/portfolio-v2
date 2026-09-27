import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { INTERNSHIP_BEATS } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/* ── Accent color lookup — reuses the site's palette ──────────────── */
const accentHex = (a) => {
  switch (a) {
    case "amber":
      return "#C8903A";
    case "teal":
      return "#2A8B7A";
    case "purple":
      return "#8C6BB6";
    default:
      return "#9A9490";
  }
};

/* ── Progress label — "01 / 05" style, JetBrains Mono ──────────── */
const ProgressLabel = ({ index, total }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
  </span>
);

/* ── Single scroll-expansion beat (animated) ───────────────────── */
const AnimatedBeat = ({ beat, index, total, locale }) => {
  const containerRef = useRef(null);
  const title = locale === "fr" ? beat.titleFr : beat.titleEn;
  const color = accentHex(beat.accent);

  /* Track scroll progress through the unpinned container.
     offset: "start end" = top of container hits bottom of viewport
             "start start" = top of container hits top of viewport */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  /* Image starts at ~60% width with rounded corners,
     expands to ~96% width with less rounding as you scroll into view. */
  const width = useTransform(scrollYProgress, [0, 1], ["60%", "96%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["16px", "4px"]);

  return (
    <div
      ref={containerRef}
      data-testid={`internship-beat-${beat.id}`}
      className="relative flex flex-col items-center justify-center py-10 md:py-16 overflow-hidden"
    >
      {/* Overlay: progress + date + title (full width overlay) */}
      <div className="absolute inset-x-0 inset-y-10 md:inset-y-16 z-10 flex flex-col justify-between pointer-events-none p-6 md:p-12">
        <div className="flex items-center justify-between">
          <ProgressLabel index={index} total={total} />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color }}
          >
            {beat.date}
          </span>
        </div>
        <div>
          <h3
            className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[var(--text-primary)] max-w-2xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Expanding image */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          width,
          borderRadius,
          aspectRatio: "16 / 9",
          maxHeight: "85vh",
        }}
      >
        <img
          src={beat.image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.55) contrast(1.1)",
          }}
        />
        {/* Subtle gradient tint overlay in accent color */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30"
          style={{
            background: `linear-gradient(135deg, ${color}44, transparent 60%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ── Single beat — static (reduced motion) ────────────────────── */
const StaticBeat = ({ beat, index, total, locale }) => {
  const title = locale === "fr" ? beat.titleFr : beat.titleEn;
  const text = locale === "fr" ? beat.textFr : beat.textEn;
  const color = accentHex(beat.accent);

  return (
    <div
      data-testid={`internship-beat-${beat.id}`}
      className="py-16 md:py-24"
    >
      {/* Progress + date row */}
      <div className="flex items-center justify-between mb-6">
        <ProgressLabel index={index} total={total} />
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color }}
        >
          {beat.date}
        </span>
      </div>

      {/* Static image at moderate size */}
      <div className="relative overflow-hidden rounded-sm border border-white/10 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="relative" style={{ aspectRatio: "16 / 9" }}>
          <img
            src={beat.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.65) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-25"
            style={{
              background: `linear-gradient(135deg, ${color}44, transparent 60%)`,
            }}
          />
        </div>
      </div>

      {/* Title + text below image */}
      <h3 className="font-display text-2xl md:text-4xl tracking-tight leading-[1.1] text-[var(--text-primary)] mt-8 mb-4">
        {title}
      </h3>
      <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl">
        {text}
      </p>
    </div>
  );
};

/* ── Narrative text block between animated beats ──────────────── */
const NarrativeBlock = ({ beat, locale }) => {
  const text = locale === "fr" ? beat.textFr : beat.textEn;
  const color = accentHex(beat.accent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative pt-6 pb-24 md:pt-10 md:pb-32 px-6 md:px-12 lg:px-20 z-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-2xl">
          {/* Subtle accent bar */}
          <div
            className="w-10 h-[2px] mb-8"
            style={{ background: color }}
          />
          <p className="text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Internship section ──────────────────────────────────── */
const Internship = () => {
  const { t, locale } = useI18n();
  const reduced = useReducedMotion();
  const total = INTERNSHIP_BEATS.length;

  return (
    <section
      id="internship"
      data-testid="section-internship"
      className="relative"
    >
      {/* Section heading — matches the site's established pattern */}
      <div className="px-6 md:px-12 lg:px-20 pt-28 md:pt-40 pb-10 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow"
              >
                / 03 {t.internship.eyebrow}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
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
              initial={{ opacity: 0, y: 16 }}
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

      {/* Beats */}
      {reduced ? (
        /* Reduced motion: simple stacked layout, no pinning or animation */
        <div className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
          <div className="max-w-[1400px] mx-auto">
            {INTERNSHIP_BEATS.map((beat, i) => (
              <StaticBeat
                key={beat.id}
                beat={beat}
                index={i}
                total={total}
                locale={locale}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Full motion: scroll-expansion hero pattern */
        <div>
          {INTERNSHIP_BEATS.map((beat, i) => (
            <React.Fragment key={beat.id}>
              <AnimatedBeat
                beat={beat}
                index={i}
                total={total}
                locale={locale}
              />
              <NarrativeBlock beat={beat} locale={locale} />
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  );
};

export default Internship;
