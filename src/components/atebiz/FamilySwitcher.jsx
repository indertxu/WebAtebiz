import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_VISUALS } from "./ui";
import { ProductCta } from "./Ecosystem";
import Cube, { PRODUCT_TO_FACE } from "./Cube";
import { EASE, Reveal, Stagger, StaggerItem, useSpotlight } from "./fx";
import { SectionMark } from "./SectionMark";

const DURATION = 7000;

export default function FamilySwitcher() {
  const { t, lang } = useI18n();
  const f = t.home.family;
  const products = t.ecosystem.products;
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const spot = useSpotlight();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % products.length), DURATION);
    return () => clearTimeout(id);
  }, [idx, paused, reduce, inView, products.length, tick]);

  const select = (i) => {
    setIdx(i);
    setTick((x) => x + 1);
  };

  const p = products[idx];
  const Visual = PRODUCT_VISUALS[p.key];

  return (
    <section id="familia" ref={sectionRef} className="relative py-16 lg:py-24">
      <SectionMark n={3} />
      <div className="nx-wrap">
        <Reveal>
          <div className="nx-eyebrow"><b>{f.tag}</b></div>
          <h2 className="nx-h2 mt-4 max-w-[18ch]">{f.title}</h2>
          <p className="nx-lead mt-5">{f.desc}</p>
        </Reveal>

        <div className="mt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Pestañas */}
          <div role="tablist" aria-label={f.tag} className="grid grid-cols-3 gap-2 sm:gap-3">
            {products.map((pr, i) => {
              const on = i === idx;
              return (
                <button
                  key={pr.key}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => select(i)}
                  className="nx-focus relative overflow-hidden text-left rounded-[16px] p-3 sm:p-4 transition-colors"
                  style={{
                    background: on ? "var(--nx-card)" : "var(--nx-ghost)",
                    border: `1px solid ${on ? "var(--nx-line-2)" : "var(--nx-line)"}`,
                    boxShadow: on ? "var(--nx-shadow-card)" : "none",
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-9 h-9 shrink-0 hidden sm:block">
                      <Cube active={on ? PRODUCT_TO_FACE[pr.key] : null} className="w-full h-full" label={pr.name} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-[14px] sm:text-[16px] tracking-tight truncate" style={{ color: "var(--nx-fg)" }}>
                        <span className="hidden sm:inline">Next </span>
                        {pr.name.replace(/^Next /, "")}
                      </span>
                      <span className="hidden sm:block text-[12.5px] truncate nx-muted">{pr.category}</span>
                    </span>
                  </span>
                  <span className="absolute left-0 bottom-0 h-[3px] w-full" style={{ background: "var(--nx-line)" }} aria-hidden="true">
                    {on && (
                      <motion.span
                        key={`${idx}-${tick}-${paused}-${inView}`}
                        className="block h-full origin-left"
                        style={{ background: "var(--nx-btn)" }}
                        initial={{ scaleX: reduce || paused || !inView ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: reduce || paused || !inView ? 0 : DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] mt-3 nx-muted hidden sm:block">{f.auto}</p>

          {/* Panel */}
          <div className="nx-card nx-spot mt-4 p-4 sm:p-6 lg:p-8 overflow-hidden" {...spot}>
            <AnimatePresence mode="wait">
              <motion.div
                key={p.key}
                className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-center"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Stagger className="min-w-0" gap={0.07} onMount>
                  <StaggerItem className="flex flex-wrap items-center gap-2">
                    <span className="nx-pill nx-pill-on">{p.category}</span>
                    <span className={`nx-pill ${p.key === "next-management" ? "nx-pill-warn" : ""}`}>{p.status}</span>
                  </StaggerItem>
                  <StaggerItem as="h3" className="font-black text-[clamp(30px,3.6vw,46px)] tracking-[-0.045em] leading-[1.02] mt-4" style={{ color: "var(--nx-fg)" }}>
                    {p.name}
                  </StaggerItem>
                  <StaggerItem as="p" className="font-semibold text-[18px] mt-2 nx-grad">
                    {p.headline}
                  </StaggerItem>
                  <StaggerItem as="p" className="nx-body text-[16px] mt-3 max-w-[56ch]">
                    {p.desc}
                  </StaggerItem>
                  <StaggerItem as="ul" className="grid gap-2 mt-5 text-[15px]">
                    {p.features.map((ft) => (
                      <li key={ft} className="nx-check">{ft}</li>
                    ))}
                  </StaggerItem>
                  <StaggerItem className="mt-7 flex flex-wrap items-center gap-3">
                    <ProductCta product={p} />
                    <Link to={`/productos#${p.key}`} className="nx-link nx-focus text-[14px]">
                      {f.detail} →
                    </Link>
                  </StaggerItem>
                </Stagger>
                <motion.div
                  className="min-w-0"
                  initial={reduce ? false : { opacity: 0, scale: 0.96, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                >
                  <Visual lang={lang} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
