import React, { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";

const accentColor = (a) => {
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

const ProjectCover = ({ hue, accent, title, year }) => (
  <div
    className="relative w-full h-full overflow-hidden"
    style={{
      background:
        `radial-gradient(120% 80% at 80% 0%, hsla(${hue}, 55%, 38%, 0.45) 0%, hsla(${hue}, 50%, 18%, 0.45) 40%, #0A0F1A 100%), #141820`,
    }}
  >
    {/* Pattern: dotted grid */}
    <div
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "radial-gradient(rgba(240,237,230,0.35) 1px, transparent 1.2px)",
        backgroundSize: "16px 16px",
      }}
    />
    {/* Pattern: diagonal lines */}
    <div
      className="absolute inset-0 opacity-20 mix-blend-overlay"
      style={{
        backgroundImage:
          `repeating-linear-gradient(135deg, ${accentColor(accent)}33 0 2px, transparent 2px 14px)`,
      }}
    />
    <div className="absolute inset-0 p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
        <span>{year}</span>
        <span style={{ color: accentColor(accent) }}>●</span>
      </div>
      <div>
        <h3 className="font-display text-2xl md:text-3xl leading-tight text-[var(--text-primary)] max-w-[90%]">
          {title}
        </h3>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, index, locale }) => {
  const [flipped, setFlipped] = useState(false);
  const title = locale === "fr" ? project.titleFr : project.titleEn;
  const desc = locale === "fr" ? project.descFr : project.descEn;
  const type = locale === "fr" ? project.typeFr : project.typeEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flip-card ${flipped ? "is-flipped" : ""}`}
      style={{ height: "100%" }}
    >
      <div
        className="flip-card-inner relative"
        style={{ minHeight: 360 }}
        data-testid={`project-card-${project.id}`}
        data-magnetic
      >
        {/* Front */}
        <div className="flip-face border border-white/10 rounded-sm overflow-hidden bg-[var(--surface-card)]">
          <ProjectCover
            hue={project.coverHue}
            accent={project.accent}
            title={title}
            year={project.year}
          />
        </div>
        {/* Back */}
        <div className="flip-face flip-back border border-white/10 rounded-sm overflow-hidden bg-[var(--surface-card)] p-6 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--amber)] mb-3">
              {type}
            </div>
            <h3 className="font-display text-xl md:text-2xl text-[var(--text-primary)] leading-tight">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              {desc}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.15em] border border-white/15 rounded-full text-[var(--text-secondary)]"
                >
                  {s}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              data-testid={`project-flip-${project.id}`}
              className="text-[11px] font-mono uppercase tracking-[0.3em] text-[var(--amber)]"
            >
              ← {locale === "fr" ? "Retour" : "Back"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile flip toggle (since hover doesn't apply) */}
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        data-testid={`project-toggle-${project.id}`}
        className="md:hidden mt-3 text-[11px] font-mono uppercase tracking-[0.3em] text-[var(--text-secondary)]"
      >
        {flipped
          ? locale === "fr"
            ? "Voir l'aperçu"
            : "Show preview"
          : locale === "fr"
            ? "Voir les détails"
            : "Show details"}
      </button>
    </motion.div>
  );
};

const Projects = () => {
  const { t, locale } = useI18n();
  return (
    <section
      id="projects"
      data-testid="section-projects"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="eyebrow">/ 03 — {t.projects.eyebrow}</div>
            <h2
              className="font-display mt-4 text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)] max-w-2xl"
              data-testid="projects-title"
            >
              {t.projects.title}
            </h2>
          </div>
          <p className="max-w-sm text-[var(--text-secondary)] text-base">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
