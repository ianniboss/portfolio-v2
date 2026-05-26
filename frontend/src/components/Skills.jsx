import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, AdaptiveDpr } from "@react-three/drei";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import { SKILLS, SKILL_GROUP_COLORS } from "../data/portfolio";
import { useI18n } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Build deterministic 3D positions to avoid overlap.
const buildPositions = (count) => {
  const out = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 1.6;
    const r = Math.sqrt(Math.max(0, 1 - (y * 0.7) ** 2));
    const theta = golden * i;
    const x = Math.cos(theta) * r * 2.6;
    const z = Math.sin(theta) * r * 1.4 - 0.5;
    out.push([x, y * 1.4, z]);
  }
  return out;
};

const Orb = ({ position, color, label, level, onHover, onLeave, isActive }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const baseScale = 0.45 + level * 0.55;
  const targetScale = useRef(baseScale);

  useFrame((_, delta) => {
    if (!ref.current) return;
    targetScale.current = isActive ? baseScale * 1.35 : baseScale;
    ref.current.scale.x += (targetScale.current - ref.current.scale.x) * 0.18;
    ref.current.scale.y = ref.current.scale.x;
    ref.current.scale.z = ref.current.scale.x;
    if (!reduced) ref.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.4} floatIntensity={reduced ? 0 : 1}>
      <group position={position}>
        <mesh
          ref={ref}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover();
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onLeave();
          }}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            roughness={0.35}
            metalness={0.4}
            emissive={color}
            emissiveIntensity={isActive ? 0.7 : 0.25}
          />
        </mesh>
        {isActive && (
          <Html center distanceFactor={6} zIndexRange={[100, 0]}>
            <div
              className="px-3 py-1.5 rounded-full bg-[#0D0D0D]/90 border border-white/15 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-primary)] whitespace-nowrap"
              style={{ transform: "translateY(-30px)" }}
            >
              {label} · {Math.round(level * 100)}%
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

const SkillsCanvas = ({ skills, activeIdx, setActiveIdx }) => {
  const positions = useMemo(() => buildPositions(skills.length), [skills.length]);
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      role="img"
      aria-label="Floating 3D orbs representing each technical skill"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <pointLight position={[-4, -2, -2]} intensity={1.1} color="#C8903A" />
      <pointLight position={[4, 2, -2]} intensity={0.9} color="#2A8B7A" />
      <Suspense fallback={null}>
        {skills.map((s, i) => (
          <Orb
            key={s.name}
            position={positions[i]}
            color={SKILL_GROUP_COLORS[s.group]}
            label={s.name}
            level={s.level}
            isActive={activeIdx === i}
            onHover={() => setActiveIdx(i)}
            onLeave={() => setActiveIdx((v) => (v === i ? null : v))}
          />
        ))}
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

const groupLabel = (key, locale) => {
  if (locale === "fr") {
    return { lang: "Langages", web: "Web", data: "Données", ops: "DevOps" }[key];
  }
  return { lang: "Languages", web: "Web", data: "Data", ops: "DevOps" }[key];
};

const Skills = () => {
  const { t, locale } = useI18n();
  const [activeIdx, setActiveIdx] = useState(null);
  const groups = ["lang", "web", "data", "ops"];

  return (
    <section
      id="skills"
      data-testid="section-skills"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">/ 02 — {t.skills.eyebrow}</div>
            <h2
              className="font-display mt-4 text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)]"
              data-testid="skills-title"
            >
              {t.skills.title}
            </h2>
            <p className="mt-6 max-w-md text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              {t.skills.subtitle}
            </p>

            <ul className="mt-10 space-y-4">
              {groups.map((g) => (
                <li
                  key={g}
                  data-testid={`skills-legend-${g}`}
                  className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: SKILL_GROUP_COLORS[g] }}
                  />
                  {groupLabel(g, locale)}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="relative h-[460px] md:h-[520px] rounded-md border border-white/10 bg-[#0A0F1A]/40 overflow-hidden"
              data-testid="skills-canvas-wrapper"
            >
              <ErrorBoundary fallback={<div className="w-full h-full" />}>
                <SkillsCanvas
                  skills={SKILLS}
                  activeIdx={activeIdx}
                  setActiveIdx={setActiveIdx}
                />
              </ErrorBoundary>
              <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                <span>// skill cloud</span>
                <span>{SKILLS.length} nodes</span>
              </div>
            </motion.div>

            {/* Tag list fallback / accessibility */}
            <div className="mt-6 flex flex-wrap gap-2" data-testid="skills-tag-list">
              {SKILLS.map((s) => (
                <span
                  key={s.name}
                  className="px-3 py-1 rounded-full border text-[12px] font-mono"
                  style={{
                    borderColor: SKILL_GROUP_COLORS[s.group] + "55",
                    color: SKILL_GROUP_COLORS[s.group],
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
