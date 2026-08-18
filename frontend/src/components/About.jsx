import React from "react";
import { motion } from "framer-motion";
import Globe from "./Globe";
import ErrorBoundary from "./ErrorBoundary";
import { useI18n } from "../context/I18nContext";
import { PROFILE } from "../data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const PORTRAIT_URL = PROFILE.portrait;

const About = () => {
  const { t } = useI18n();

  return (
    <section
      id="about"
      data-testid="section-about"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="eyebrow"
        >
          / 01 {t.about.eyebrow}
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 rounded-sm group">
              <img
                src={PORTRAIT_URL}
                alt="Ian Bin Syahrul Azlan portrait"
                data-testid="about-portrait"
                className="w-full h-full object-cover object-[50%_18%] grayscale group-hover:grayscale-0 transition-all duration-700"
                style={{ filter: "contrast(1.05) brightness(0.98)" }}
              />
              <div
                className="absolute inset-0 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(200,144,58,0) 0%, rgba(200,144,58,0) 60%, rgba(200,144,58,0.18) 100%)",
                }}
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)]">
                <span>// IAN</span>
                <span>Toulouse · FR</span>
              </div>
            </div>

            {/* Facts table */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 font-mono text-[12px]">
              {t.about.facts.map((f, idx) => (
                <li
                  key={f.k}
                  data-testid={`about-fact-${idx}`}
                  className="flex flex-col gap-1 border-t border-white/10 pt-3"
                >
                  <span className="text-[var(--text-secondary)] uppercase tracking-[0.2em] text-[10px]">
                    {f.k}
                  </span>
                  <span className="text-[var(--text-primary)]">{f.v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Text column */}
          <div className="lg:col-span-7">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)] max-w-2xl"
              data-testid="about-title"
            >
              {t.about.title}
            </motion.h2>

            <div className="mt-10 space-y-6 max-w-2xl">
              {t.about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  custom={i + 1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]"
                  data-testid={`about-paragraph-${i}`}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Globe + caption */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mt-12 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6 items-center border-t border-white/10 pt-8"
            >
              <div
                className="w-[160px] h-[160px] mx-auto sm:mx-0"
                data-testid="about-globe"
                aria-hidden="true"
              >
                <ErrorBoundary fallback={<div className="w-full h-full rounded-full border border-white/10" />}>
                  <Globe />
                </ErrorBoundary>
              </div>
              <div className="font-mono text-[12px] leading-relaxed text-[var(--text-secondary)]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--amber)] mb-2">
                  Two worlds
                </div>
                Kuala Lumpur → Toulouse · ~10,500 km. Bilingual upbringing, a Malaysian work ethic, a French academic frame. Both languages of the keyboard.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
