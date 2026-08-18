import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SKILLS, SKILL_GROUP_COLORS } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

const GROUPS = [
  { key: "lang", labelEn: "Languages", labelFr: "Langages" },
  { key: "web", labelEn: "Web", labelFr: "Web" },
  { key: "data", labelEn: "Data", labelFr: "Données" },
  { key: "ops", labelEn: "DevOps", labelFr: "DevOps" },
];

/* ── single progress bar row ─────────────────────────────────── */
const SkillBar = ({ name, level, color, animate }) => {
  const barRef = useRef(null);
  const [width, setWidth] = useState(animate ? 0 : level * 100);

  const triggerFill = useCallback(() => {
    // small rAF delay so the transition is visible after mount
    requestAnimationFrame(() => setWidth(level * 100));
  }, [level]);

  useEffect(() => {
    if (!animate) {
      setWidth(level * 100);
      return;
    }

    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerFill();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, level, triggerFill]);

  return (
    <div ref={barRef} className="mb-4">
      <span
        className="block text-[13px] mb-1"
        style={{ color: "#f0ede6", fontFamily: "'Satoshi', sans-serif" }}
      >
        {name}
      </span>
      <div
        className="w-full h-[2px] rounded-full"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: color,
            transition: animate ? "width 0.8s cubic-bezier(0.22,1,0.36,1)" : "none",
          }}
        />
      </div>
    </div>
  );
};

/* ── category block ──────────────────────────────────────────── */
const CategoryBlock = ({ groupKey, label, color, skills, animate }) => (
  <div>
    <span
      className="block font-mono text-[11px] uppercase tracking-[0.2em] mb-5"
      style={{ color }}
    >
      {label}
    </span>
    {skills.map((s) => (
      <SkillBar
        key={s.name}
        name={s.name}
        level={s.level}
        color={color}
        animate={animate}
      />
    ))}
  </div>
);

/* ── main section ────────────────────────────────────────────── */
const Skills = () => {
  const { t, locale } = useI18n();
  const reduced = useReducedMotion();

  // Group skills by category key
  const grouped = GROUPS.map((g) => ({
    ...g,
    label: locale === "fr" ? g.labelFr : g.labelEn,
    color: SKILL_GROUP_COLORS[g.key],
    skills: SKILLS.filter((s) => s.group === g.key),
  }));

  return (
    <section
      id="skills"
      data-testid="section-skills"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* heading row */}
        <div className="mb-16">
          <div className="eyebrow">/ 02 {t.skills.eyebrow}</div>
          <h2
            className="font-display mt-4 text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)]"
            data-testid="skills-title"
          >
            {t.skills.title}
          </h2>
          <p className="mt-6 max-w-md text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* category grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduced ? 0 : 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          data-testid="skills-grid"
        >
          {grouped.map((g) => (
            <CategoryBlock
              key={g.key}
              groupKey={g.key}
              label={g.label}
              color={g.color}
              skills={g.skills}
              animate={!reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
