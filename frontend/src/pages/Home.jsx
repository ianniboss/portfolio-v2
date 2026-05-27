import React, { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import { useReducedMotion } from "../hooks/useReducedMotion";

const Marquee = () => {
  const items = [
    "Java",
    "React",
    "Docker",
    "SCRUM",
    "PHP 8.4",
    "Linux",
    "PL/SQL",
    "Oracle APEX",
    "Toulouse → World",
    "Alternance · Sept 2026",
  ];
  return (
    <div
      data-testid="brand-marquee"
      className="border-y border-white/10 py-5 overflow-hidden bg-[var(--bg-tint)]"
    >
      <div className="marquee-track inline-flex whitespace-nowrap font-display text-2xl md:text-4xl">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="inline-flex items-center">
            {items.map((it, i) => (
              <span key={i} className="px-8 text-[var(--text-secondary)]">
                {it} <span className="text-[var(--amber)] mx-2">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <div className="App grain relative">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
