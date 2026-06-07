import React, { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../context/I18nContext";
import { PROFILE } from "../data/portfolio";
import ContactParticles from "./ContactParticles";
import ErrorBoundary from "./ErrorBoundary";

const FORMSPREE_ID = "xpqnenzg";

const Contact = () => {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, locale }),
      });
      if (!res.ok) throw new Error("formspree_error");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(t.contact.error);
    }
  };

  return (
    <section
      id="contact"
      data-testid="section-contact"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0 opacity-70" aria-hidden="true">
        <ErrorBoundary fallback={<div className="w-full h-full" />}>
          <ContactParticles />
        </ErrorBoundary>
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(13,13,13,0) 0%, rgba(13,13,13,0.7) 70%, rgba(13,13,13,1) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="eyebrow">/ 05 {t.contact.eyebrow}</div>
          <h2
            className="font-display mt-4 text-3xl md:text-5xl tracking-tight leading-[1.05] text-[var(--text-primary)]"
            data-testid="contact-title"
          >
            {t.contact.title}
          </h2>
          <p className="mt-6 max-w-md text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>

          <div className="mt-10 border-t border-white/10 pt-8 space-y-4 font-mono text-[12px]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--amber)] mb-2">
              {t.contact.or}
            </div>
            <a
              data-testid="contact-email"
              href={`mailto:${PROFILE.email}`}
              className="block text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
            >
              ↗ {PROFILE.email}
            </a>
            <a
              data-testid="contact-phone"
              href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
              className="block text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
            >
              ↗ {PROFILE.phone}
            </a>
            <div className="text-[var(--text-secondary)]">{PROFILE.location}</div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          data-testid="contact-form"
          className="lg:col-span-7 p-8 md:p-10 rounded-md border border-white/10 backdrop-blur-xl"
          style={{ background: "rgba(20, 24, 32, 0.6)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                {t.contact.name}
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="contact-input-name"
                className="bg-transparent border-b border-white/15 focus:border-[var(--amber)] outline-none py-2 text-base text-[var(--text-primary)] transition-colors"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                {t.contact.email}
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-testid="contact-input-email"
                className="bg-transparent border-b border-white/15 focus:border-[var(--amber)] outline-none py-2 text-base text-[var(--text-primary)] transition-colors"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 mt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              {t.contact.message}
            </span>
            <textarea
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              data-testid="contact-input-message"
              className="bg-transparent border-b border-white/15 focus:border-[var(--amber)] outline-none py-2 text-base text-[var(--text-primary)] transition-colors resize-none"
            />
          </label>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              data-testid="contact-submit"
              data-magnetic
              className="group inline-flex items-center gap-3 bg-[var(--amber)] text-[#0D0D0D] px-7 py-3 rounded-full font-medium hover:bg-[#d9a35a] transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {status === "sending" ? t.contact.sending : t.contact.send}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            {status === "success" && (
              <span
                data-testid="contact-success"
                className="font-mono text-[12px] text-[var(--teal)]"
              >
                ✓ {t.contact.success}
              </span>
            )}
            {status === "error" && (
              <span
                data-testid="contact-error"
                className="font-mono text-[12px] text-[#e07a5f]"
              >
                ✗ {errorMsg || t.contact.error}
              </span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
