import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ProductCta } from "./Ecosystem";
import Cube, { PRODUCT_TO_FACE } from "./Cube";
import { EASE, Reveal, Stagger, StaggerItem } from "./fx";
import { SectionMark } from "./SectionMark";

/* ---------- 04 · Antes y después ---------- */

function Strike({ on, children }) {
  return (
    <span
      className="nx-strike"
      style={{ backgroundSize: on ? "100% 1.5px" : "0% 1.5px", color: on ? "var(--nx-panel-fg-3)" : "var(--nx-panel-fg)" }}
    >
      {children}
    </span>
  );
}

export function Compare() {
  const { t } = useI18n();
  const c = t.home.compare;
  const reduce = useReducedMotion();
  const [after, setAfter] = useState(false);

  return (
    <section id="antes-despues" className="relative py-16 lg:py-24">
      <SectionMark n={4} />
      <div className="nx-wrap">
        <Reveal className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 items-end">
          <div>
            <div className="nx-eyebrow"><b>{c.tag}</b></div>
            <h2 className="nx-h2 mt-4 max-w-[16ch]">
              {c.title.split(" ").slice(0, -1).join(" ")} <span className="nx-grad">{c.title.split(" ").slice(-1)}</span>
            </h2>
            <p className="nx-lead mt-5">{c.desc}</p>
          </div>
          <div className="grid gap-2 justify-items-start lg:justify-items-end">
            <div role="radiogroup" aria-label={c.hint} className="inline-flex p-1 rounded-[12px]" style={{ background: "var(--nx-sunk)", border: "1px solid var(--nx-line)" }}>
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  role="radio"
                  aria-checked={after === v}
                  onClick={() => setAfter(v)}
                  className="nx-focus relative px-4 py-2.5 rounded-[9px] text-[14px] font-semibold"
                  style={{ color: after === v ? (v ? "#fff" : "var(--nx-fg)") : "var(--nx-fg-3)" }}
                >
                  {after === v && (
                    <motion.span
                      layoutId="cmpPill"
                      className="absolute inset-0 rounded-[9px]"
                      style={{ background: v ? "var(--nx-btn)" : "var(--nx-card)", boxShadow: "var(--nx-shadow-card)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{v ? c.toggleOn : c.toggleOff}</span>
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] nx-muted">{c.hint}</span>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.05}>
          <motion.div
            className="nx-panel overflow-x-auto hidden md:block"
            onViewportEnter={() => !reduce && setTimeout(() => setAfter(true), 900)}
            viewport={{ once: true, amount: 0.5 }}
          >
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="nx-lbl">
                  <th className="font-medium px-5 py-4 w-[26%]">{c.cols[0]}</th>
                  <th className="font-medium px-5 py-4">{c.cols[1]}</th>
                  <th className="font-medium px-5 py-4" style={{ color: after ? "#6EE7B7" : undefined }}>{c.cols[2]}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r, i) => (
                  <tr key={r.task} style={{ borderTop: "1px solid var(--nx-panel-block-line)" }}>
                    <td className="px-5 py-4 align-top font-semibold text-[14.5px]" style={{ color: "var(--nx-panel-fg)" }}>{r.task}</td>
                    <td className="px-5 py-4 align-top text-[14.5px]" style={{ transitionDelay: `${i * 70}ms` }}>
                      <Strike on={after}>{r.before}</Strike>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <motion.div
                        className="flex flex-wrap items-start gap-2 text-[14.5px]"
                        animate={{ opacity: after ? 1 : 0.32, x: after ? 0 : -6 }}
                        transition={{ duration: 0.45, ease: EASE, delay: after ? i * 0.07 : 0 }}
                        style={{ color: "var(--nx-panel-fg)" }}
                      >
                        <span className="min-w-0 flex-1">{r.after}</span>
                        <span className="nx-chip shrink-0">{r.product}</span>
                      </motion.div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.ol
            className="md:hidden grid gap-2.5"
            onViewportEnter={() => !reduce && setTimeout(() => setAfter(true), 700)}
            viewport={{ once: true, amount: 0.2 }}
          >
            {c.rows.map((r, i) => (
              <li key={r.task} className="nx-panel !rounded-[16px] p-4 grid gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-[15px]" style={{ color: "var(--nx-panel-fg)" }}>{r.task}</span>
                  <span className="nx-chip shrink-0">{r.product}</span>
                </div>
                <span className="text-[13.5px]"><Strike on={after}>{r.before}</Strike></span>
                <motion.span
                  className="text-[14px] flex gap-2"
                  animate={{ opacity: after ? 1 : 0.3 }}
                  transition={{ duration: 0.4, delay: after ? i * 0.05 : 0 }}
                  style={{ color: "#A7F3D0" }}
                >
                  <span aria-hidden="true">→</span>
                  {r.after}
                </motion.span>
              </li>
            ))}
          </motion.ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 05 · ¿Por dónde empiezo? ---------- */

export function Quiz() {
  const { t } = useI18n();
  const q = t.home.quiz;
  const products = t.ecosystem.products;
  const [pick, setPick] = useState(null);
  const reduce = useReducedMotion();
  const chosen = pick == null ? null : q.options[pick].product;
  const product = products.find((p) => p.key === chosen);

  return (
    <section id="empezar" className="relative py-16 lg:py-24">
      <SectionMark n={5} />
      <div className="nx-wrap grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
        <div className="min-w-0">
          <Reveal>
            <div className="nx-eyebrow"><b>{q.tag}</b></div>
            <h2 className="nx-h2 mt-4 max-w-[14ch]">{q.title}</h2>
            <p className="nx-lead mt-5">{q.desc}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-2.5" role="radiogroup" aria-label={q.title}>
            {q.options.map((o, i) => {
              const on = pick === i;
              return (
                <StaggerItem key={o.label}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setPick(i)}
                    className="nx-focus w-full text-left flex items-center gap-4 rounded-[16px] p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: on ? "var(--nx-card)" : "var(--nx-ghost)",
                      border: `1.5px solid ${on ? "var(--nx-accent)" : "var(--nx-line)"}`,
                      boxShadow: on ? "0 18px 40px -26px rgba(4,120,87,.6)" : "none",
                    }}
                  >
                    <span
                      className="w-9 h-9 rounded-[10px] grid place-items-center font-mono text-[12px] shrink-0 transition-colors"
                      style={on ? { background: "var(--nx-btn)", color: "#fff" } : { background: "var(--nx-sunk)", color: "var(--nx-fg-3)" }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-semibold text-[16px] leading-snug" style={{ color: "var(--nx-fg)" }}>{o.label}</span>
                    <ArrowRight size={16} className="ml-auto shrink-0 transition-transform" style={{ color: on ? "var(--nx-accent)" : "var(--nx-fg-3)", transform: on ? "translateX(2px)" : "none" }} />
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <div className="min-w-0 lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={chosen || "none"}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="nx-panel p-6 sm:p-8 relative"
            >
              <div className="nx-glow-orb w-[380px] h-[380px] -right-24 -top-24" style={{ background: "rgba(52,211,153,.2)" }} aria-hidden="true" />
              <div className="relative grid sm:grid-cols-[minmax(0,1fr)_150px] gap-6 items-center">
                <div className="min-w-0">
                  {chosen == null && (
                    <>
                      <div className="font-mono text-[11.5px] uppercase tracking-[0.08em]" style={{ color: "#6EE7B7" }}>{q.tag}</div>
                      <h3 className="font-black text-[30px] tracking-[-0.04em] leading-[1.05] mt-3" style={{ color: "var(--nx-panel-fg)" }}>{t.ecosystem.title}</h3>
                      <p className="text-[15px] mt-3" style={{ color: "var(--nx-panel-fg-2)" }}>{q.desc}</p>
                    </>
                  )}
                  {chosen === "all" && (
                    <>
                      <span className="nx-chip">{q.fit}</span>
                      <h3 className="font-black text-[32px] tracking-[-0.04em] leading-[1.05] mt-3" style={{ color: "var(--nx-panel-fg)" }}>{q.allTitle}</h3>
                      <p className="text-[15px] mt-3" style={{ color: "var(--nx-panel-fg-2)" }}>{q.allDesc}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {products.map((p) => (
                          <Link key={p.key} to={`/productos#${p.key}`} className="nx-chip nx-chip-dim !py-2 !px-3 hover:!text-white">{p.name}</Link>
                        ))}
                      </div>
                      <Link to="/contacto" className="nx-btn nx-btn-primary nx-focus mt-6">
                        {q.allCta}
                        <ArrowRight size={16} />
                      </Link>
                    </>
                  )}
                  {product && (
                    <>
                      <span className="nx-chip">{q.fit}</span>
                      <h3 className="font-black text-[34px] tracking-[-0.045em] leading-[1.02] mt-3" style={{ color: "var(--nx-panel-fg)" }}>{product.name}</h3>
                      <p className="font-semibold text-[16px] mt-2" style={{ color: "#6EE7B7" }}>{product.headline}</p>
                      <p className="text-[15px] mt-3" style={{ color: "var(--nx-panel-fg-2)" }}>{product.desc}</p>
                      <ul className="grid gap-1.5 mt-4 text-[14px]">
                        {product.features.map((f) => (
                          <li key={f} className="flex gap-2" style={{ color: "var(--nx-panel-fg-2)" }}>
                            <span style={{ color: "#6EE7B7" }}>✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <ProductCta product={product} />
                        <Link to={`/productos#${product.key}`} className="text-[14px] font-semibold underline-offset-4 hover:underline" style={{ color: "var(--nx-panel-fg)" }}>
                          {t.home.family.detail} →
                        </Link>
                      </div>
                    </>
                  )}
                  {chosen != null && (
                    <button type="button" onClick={() => setPick(null)} className="nx-focus block mt-5 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--nx-panel-fg-3)" }}>
                      ↺ {q.reset}
                    </button>
                  )}
                </div>
                <div className="hidden sm:block">
                  <Cube active={chosen && chosen !== "all" ? PRODUCT_TO_FACE[chosen] : null} className="w-full h-auto" label="Atebiz" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 · Preguntas ---------- */

export function Faq() {
  const { t } = useI18n();
  const f = t.home.faq;
  const [open, setOpen] = useState(0);

  return (
    <section id="preguntas" className="relative py-16 lg:py-24">
      <SectionMark n={9} />
      <div className="nx-wrap grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="nx-eyebrow"><b>{f.tag}</b></div>
          <h2 className="nx-h2 mt-4 max-w-[12ch]">{f.title}</h2>
          <Link to="/contacto" className="nx-btn nx-btn-ghost nx-focus mt-8">
            {t.navbar.hablar}
            <ArrowRight size={16} />
          </Link>
        </Reveal>
        <Stagger className="grid gap-2.5">
          {f.items.map((it, i) => {
            const on = open === i;
            return (
              <StaggerItem key={it.q} className="nx-card overflow-hidden" style={{ borderColor: on ? "var(--nx-line-2)" : undefined }}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    className="nx-focus w-full flex items-center gap-4 text-left px-5 py-4"
                  >
                    <span className="font-bold text-[16.5px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{it.q}</span>
                    <span className="ml-auto w-8 h-8 shrink-0 rounded-full grid place-items-center transition-colors" style={on ? { background: "var(--nx-btn)", color: "#fff" } : { background: "var(--nx-sunk)", color: "var(--nx-fg-2)" }}>
                      {on ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="nx-body text-[15.5px] px-5 pb-5 max-w-[64ch]">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
