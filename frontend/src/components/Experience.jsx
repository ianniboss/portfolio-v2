import React from "react";
import { motion } from "framer-motion";
import { TIMELINE, COMMUNITY } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";

/* Reusable timeline list — renders any array of timeline items with a given dot color */
const TimelineList = ({ items, locale, dotColor, startIndex = 0 }) => (
  <ol className="relative border-l border-white/10 pl-6 md:pl-10 space-y-10">
    {items.map((item, i) => {
      const title = locale === "fr" ? item.titleFr : item.titleEn;
      const desc = locale === "fr" ? item.descFr : item.descEn;
      const color =
        dotColor || (item.kind === "work" ? "#C8903A" : "#2A8B7A");

      return (
        <motion.li
          key={startIndex + i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          data-testid={`experience-item-${startIndex + i}`}
          className="relative"
        >
          <span
            className="absolute -left-[34px] md:-left-[46px] top-1.5 w-3 h-3 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 0 4px #0D0D0D`,
            }}
          />
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            {item.period}
          </div>
          <div className="mt-2 font-display text-xl md:text-2xl text-[var(--text-primary)]">
            {title}
          </div>
          <div className="text-[var(--amber)] font-mono text-[12px] uppercase tracking-[0.2em] mt-1">
            {item.org}
          </div>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)] text-base leading-relaxed">
            {desc}
          </p>
        </motion.li>
      );
    })}
  </ol>
);

const Experience = () => {
  const { t, locale } = useI18n();

  return (
    <section
      id="experience"
      data-testid="section-experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section heading */}
        <div className="eyebrow">/ 04 {t.experience.eyebrow}</div>
        <h2 className="font-display mt-4 text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)] max-w-3xl">
          {t.experience.title}
        </h2>

        {/* Education & work timeline */}
        <div className="mt-14">
          <TimelineList items={TIMELINE} locale={locale} />
        </div>

        {/* Community involvement */}
        <div className="mt-20">
          <h3 className="font-display text-xl md:text-2xl tracking-tight text-[var(--text-primary)] mb-10">
            {t.experience.communityHeading}
          </h3>
          <TimelineList
            items={COMMUNITY}
            locale={locale}
            dotColor="#9A9490"
            startIndex={TIMELINE.length}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
