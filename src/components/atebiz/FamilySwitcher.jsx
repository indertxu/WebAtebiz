import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { ProductCta } from "./Ecosystem";
import Cube, { PRODUCT_TO_FACE } from "./Cube";
import { APP_SCREENS } from "./AppScreens";
import { EASE, Reveal, Stagger, StaggerItem } from "./fx";
import { SectionMark } from "./SectionMark";

const DURATION = 8000;

/* Tarjeta explicativa que se superpone a la pantalla, como en "Así se ve" de Next Reporting */
function Caption({ p, idx, total, f }) {
  const app = PRODUCT_LINKS[p.key]?.app;
  return (
    <Stagger onMount gap={0.06} className="nx-card p-5 sm:p-6 lg:w-[400px]" style={{ boxShadow: "var(--nx-shadow-focus)" }}>
      <StaggerItem className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.08em]" style={{ color: "var(--nx-pill-fg)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {p.category}
        </span>
        <span className={`nx-pill ${p.key === "next-management" ? "nx-pill-warn" : "nx-pill-on"} !text-[10.5px] !py-[4px]`}>{p.status}</span>
      </StaggerItem>
      <StaggerItem as="h3" className="font-black text-[clamp(26px,2.6vw,34px)] tracking-[-0.045em] leading-[1.02] mt-3" style={{ color: "var(--nx-fg)" }}>
        {p.name}
      </StaggerItem>
      <StaggerItem as="p" className="font-semibold text-[16px] mt-1.5 nx-grad">{p.headline}</StaggerItem>
      <StaggerItem as="p" className="nx-body text-[14.5px] mt-2.5">{p.desc}</StaggerItem>
      <StaggerItem as="ul" className="grid gap-1.5 mt-4 text-[14px]">
        {p.features.map((ft) => (
          <li key={ft} className="nx-check">{ft}</li>
        ))}
      </StaggerItem>
      <StaggerItem className="mt-5 flex flex-wrap items-center gap-2.5">
        <ProductCta product={p} />
        {app && (
          <a href={app} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn-ghost nx-btn-sm nx-focus">
            {f.app}
            <ArrowUpRight size={15} />
          </a>
        )}
        <Link to={`/productos#${p.key}`} className="nx-link nx-focus text-[13.5px]">
          {f.detail} →
        </Link>
      </StaggerItem>
    </Stagger>
  );
}

export default function FamilySwitcher() {
  const { t, lang } = useI18n();
  const f = t.home.family;
  const products = t.ecosystem.products;
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = setTimeout(() => {
      setDir(1);
      setIdx((i) => (i + 1) % products.length);
    }, DURATION);
    return () => clearTimeout(id);
  }, [idx, paused, reduce, inView, products.length, tick]);

  const select = (i) => {
    setDir(i >= idx ? 1 : -1);
    setIdx(i);
    setTick((x) => x + 1);
  };
  const step = (d) => select((idx + d + products.length) % products.length);

  const p = products[idx];
  const Screen = APP_SCREENS[p.key];
  const running = !reduce && !paused && inView;

  return (
    <section id="familia" ref={sectionRef} className="relative py-16 lg:py-24">
      <SectionMark n={3} />
      <div className="nx-wrap">
        <Reveal className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 items-end">
          <div>
            <div className="nx-eyebrow"><b>{f.tag}</b> {f.sub}</div>
            <h2 className="nx-h2 mt-4 max-w-[18ch]">{f.title}</h2>
            <p className="nx-lead mt-5">{f.desc}</p>
          </div>
          <div role="tablist" aria-label={f.tag} className="flex flex-wrap gap-2">
            {products.map((pr, i) => {
              const on = i === idx;
              return (
                <button
                  key={pr.key}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => select(i)}
                  className="nx-focus relative overflow-hidden flex items-center gap-2 rounded-[12px] pl-2 pr-3.5 py-2 transition-colors"
                  style={{
                    background: on ? "var(--nx-card)" : "var(--nx-ghost)",
                    border: `1px solid ${on ? "var(--nx-line-2)" : "var(--nx-line)"}`,
                    boxShadow: on ? "var(--nx-shadow-card)" : "none",
                  }}
                >
                  <span className="w-7 h-7 shrink-0">
                    <Cube active={on ? PRODUCT_TO_FACE[pr.key] : null} className="w-full h-full" label={pr.name} />
                  </span>
                  <span className="font-bold text-[14px] tracking-tight whitespace-nowrap" style={{ color: on ? "var(--nx-fg)" : "var(--nx-fg-2)" }}>
                    {pr.name}
                  </span>
                  <span className="absolute left-0 bottom-0 h-[2px] w-full" aria-hidden="true">
                    {on && (
                      <motion.span
                        key={`${idx}-${tick}-${running}`}
                        className="block h-full origin-left"
                        style={{ background: "var(--nx-btn)" }}
                        initial={{ scaleX: running ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: running ? DURATION / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="relative mt-10 lg:pb-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative">
            <div className="nx-glow-orb w-[70%] h-[80%] left-[15%] top-[10%]" style={{ background: "rgba(52,211,153,.22)" }} aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={p.key}
                className="relative lg:ml-[14%]"
                initial={reduce ? false : { opacity: 0, x: 60 * dir, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, x: -60 * dir, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Screen lang={lang} />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={lang === "en" ? "Previous product" : "Producto anterior"}
              className="nx-focus hidden lg:grid absolute left-[calc(14%-22px)] top-[38%] w-11 h-11 place-items-center rounded-full"
              style={{ background: "var(--nx-card)", border: "1px solid var(--nx-line-2)", color: "var(--nx-fg)", boxShadow: "var(--nx-shadow-card)" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={lang === "en" ? "Next product" : "Producto siguiente"}
              className="nx-focus grid absolute -right-2 sm:-right-4 top-[38%] w-11 h-11 place-items-center rounded-full"
              style={{ background: "var(--nx-btn)", color: "#fff", boxShadow: "var(--nx-btn-shadow)" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4 lg:mt-0 lg:absolute lg:left-0 lg:bottom-0 z-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={p.key}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
              >
                <Caption p={p} idx={idx} total={products.length} f={f} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.08em] mt-5 nx-muted flex flex-wrap items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: running ? "var(--nx-accent)" : "var(--nx-fg-3)" }} />
          {f.auto}
          <Link to="/productos" className="nx-link !text-[12px] ml-auto normal-case tracking-normal font-sans">
            {t.hero.verProductos} <ArrowRight size={12} className="inline" />
          </Link>
        </div>
      </div>
    </section>
  );
}
