import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../context/I18nContext";
import { PROFILE } from "../data/portfolio";

const sections = ["home", "about", "skills", "projects", "contact"];

const MagneticLink = ({ href, children, onClick, testId }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <a
      ref={ref}
      href={href}
      data-testid={testId}
      data-magnetic
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-block text-[13px] font-medium tracking-wide text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors duration-300"
      style={{ willChange: "transform" }}
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#0D0D0D]/70 border-b border-white/[0.05]" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
        <a
          href="#home"
          data-testid="nav-logo"
          className="font-display text-lg tracking-tight text-[var(--text-primary)] flex items-center gap-3"
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--amber)" }}
          />
          I.S.A
          <span className="hidden md:inline text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--text-secondary)] ml-2">
            Portfolio / 2026
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <MagneticLink
              key={item.id}
              href={`#${item.id}`}
              testId={`nav-link-${item.id}`}
            >
              {item.label}
            </MagneticLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={PROFILE.cv}
            target="_blank"
            rel="noreferrer noopener"
            data-testid="nav-cv"
            data-magnetic
            className="hidden md:inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.25em] text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
          >
            <span aria-hidden="true">↗</span> {t.nav.resume}
          </a>
          <div
            className="flex items-center gap-1 font-mono text-[11px] tracking-widest uppercase border border-white/10 rounded-full px-1 py-1"
            data-testid="locale-toggle"
          >
            {["en", "fr"].map((l) => (
              <button
                key={l}
                data-testid={`locale-${l}`}
                aria-pressed={locale === l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 rounded-full transition-all ${
                  locale === l
                    ? "bg-[var(--amber)] text-[#0D0D0D]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen((s) => !s)}
            data-testid="nav-mobile-toggle"
            className="md:hidden text-[var(--text-primary)] p-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current" />
              <span className="block h-px bg-current" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-white/5 bg-[#0D0D0D]/95 backdrop-blur-xl"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-testid={`nav-mobile-${item.id}`}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={PROFILE.cv}
              target="_blank"
              rel="noreferrer noopener"
              data-testid="nav-mobile-cv"
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-[var(--amber)] inline-flex items-center gap-2"
            >
              ↗ {t.nav.resume}
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
export { sections };
