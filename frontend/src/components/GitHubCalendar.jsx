import React, { lazy, Suspense, useState, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../context/I18nContext";
import { motion } from "framer-motion";

// Lazy-load the heavy calendar widget — keeps initial bundle tight
const ReactGitHubCalendar = lazy(() =>
  import("react-github-calendar").then((mod) => ({
    default: mod.default ?? mod.GitHubCalendar ?? mod,
  }))
);

// Custom 5-level theme built from the site's amber accent scale.
// Level 0 = near-black empty cell; level 4 = lightest amber tint.
const AMBER_THEME = {
  dark: [
    "#161616", // level 0 — empty
    "#3d2a10", // level 1 — faint amber
    "#7a5020", // level 2 — mid amber
    "#c8903a", // level 3 — brand amber
    "#e8b86d", // level 4 — lightest tint
  ],
};

// ──────────────────────────────────────────────────────────────
// Inner calendar — only mounted after lazy import resolves
// ──────────────────────────────────────────────────────────────
const CalendarInner = ({ username, label, link, reducedMotion }) => {
  const [failed, setFailed] = useState(false);
  const handleError = useCallback(() => setFailed(true), []);

  if (failed) return null;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {/* Eyebrow label + GitHub link */}
      <div className="flex items-center gap-3 mb-6">
        <span className="eyebrow" style={{ color: "var(--amber)" }}>
          {label}
        </span>
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub profile ianniboss"
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-secondary)] hover:text-[var(--amber)] transition-colors duration-200 inline-flex items-center gap-1"
        >
          &#8599; ianniboss
        </a>
      </div>

      {/* Horizontally scrollable on mobile — no layout break */}
      <div
        style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: "4px" }}
        aria-label="GitHub contribution graph"
      >
        <ReactGitHubCalendar
          username={username}
          theme={AMBER_THEME}
          colorScheme="dark"
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          hideColorLegend={false}
          hideMonthLabels={false}
          hideTotalCount={false}
          loading={false}
          errorMessage=""
          onError={handleError}
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            color: "var(--text-secondary)",
            minWidth: 680,
          }}
        />
      </div>
    </motion.div>
  );
};

// ──────────────────────────────────────────────────────────────
// Minimal inline ErrorBoundary — silently hides on any render error
// ──────────────────────────────────────────────────────────────
class CalendarErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { caught: false };
  }

  static getDerivedStateFromError() {
    return { caught: true };
  }

  componentDidCatch() {
    if (this.props.onError) this.props.onError();
  }

  render() {
    if (this.state.caught) return null;
    return this.props.children;
  }
}

// ──────────────────────────────────────────────────────────────
// Public export — handles lazy boundary + silent error state
// ──────────────────────────────────────────────────────────────
const GitHubCalendar = () => {
  const { t } = useI18n();
  const reducedMotion = useReducedMotion();
  const [lazyFailed, setLazyFailed] = useState(false);

  if (lazyFailed) return null;

  return (
    <div className="mt-20 pt-12 border-t border-white/[0.07]">
      <Suspense fallback={null}>
        <CalendarErrorBoundary onError={() => setLazyFailed(true)}>
          <CalendarInner
            username="ianniboss"
            label={t.projects.githubActivity}
            link="https://github.com/ianniboss"
            reducedMotion={reducedMotion}
          />
        </CalendarErrorBoundary>
      </Suspense>
    </div>
  );
};

export default GitHubCalendar;
