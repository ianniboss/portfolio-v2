import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import ErrorBoundary from "./ErrorBoundary";
import { useI18n } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

const Typed = ({ text, delay = 0, speed = 55, className = "" }) => {
  const [out, setOut] = useState("");
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay, speed, reduced]);

  return (
    <span className={className}>
      {out}
      {out.length < text.length && <span className="caret">|</span>}
    </span>
  );
};

const Hero = () => {
  const { t } = useI18n();

  return (
    <section
      id="home"
      data-testid="section-hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ErrorBoundary fallback={<div className="w-full h-full bg-[var(--bg-base)]" />}>
          <HeroScene />
        </ErrorBoundary>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(13,13,13,0) 0%, rgba(13,13,13,0.55) 60%, rgba(13,13,13,0.92) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-40 md:pt-44 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
          data-testid="hero-eyebrow"
        >
          ⌁ {t.hero.eyebrow}
        </motion.div>

        <h1
          data-testid="hero-title"
          className="font-display mt-6 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] tracking-tighter text-[var(--text-primary)] max-w-5xl"
        >
          <Typed text={t.hero.titleParts[0]} delay={250} />
          <br />
          <span className="text-[var(--amber)]">
            <Typed text={t.hero.titleParts[1]} delay={1200} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--text-secondary)]"
          data-testid="hero-subtitle"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            data-testid="hero-cta-projects"
            data-magnetic
            className="group inline-flex items-center gap-3 bg-[var(--amber)] text-[#0D0D0D] px-6 py-3 rounded-full font-medium tracking-tight hover:bg-[#d9a35a] transition-colors duration-300"
          >
            {t.hero.cta_primary}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            data-testid="hero-cta-contact"
            data-magnetic
            className="inline-flex items-center gap-3 border border-white/15 px-6 py-3 rounded-full text-[var(--text-primary)] hover:border-[var(--amber)] hover:text-[var(--amber)] transition-all duration-300"
          >
            {t.hero.cta_secondary}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.3 }}
          className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--text-secondary)]"
        >
          <span
            className="inline-block w-8 h-px bg-[var(--text-secondary)] origin-left"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          {t.hero.scroll}
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scaleX(0.4); opacity: 0.4; }
          50% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
