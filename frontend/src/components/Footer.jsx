import React from "react";
import { useI18n } from "../context/I18nContext";
import { PROFILE } from "../data/portfolio";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-white/10 py-12 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          {t.footer.year} · Ian Bin Syahrul Azlan
        </div>
        <div className="text-[12px] text-[var(--text-secondary)]">{t.footer.built}</div>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.3em]">
          <a
            data-testid="footer-email"
            href={`mailto:${PROFILE.email}`}
            className="text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
          >
            Email
          </a>
          <a
            data-testid="footer-github"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
          >
            GitHub
          </a>
          <a
            data-testid="footer-linkedin"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
