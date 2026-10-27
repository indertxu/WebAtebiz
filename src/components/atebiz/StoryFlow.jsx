import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CountUp, EASE, Reveal } from "./fx";
import { SectionMark } from "./SectionMark";

function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

function Stat({ s, locale, light = false }) {
  return (
    <div className="min-w-0">
      <div className="font-mono text-[clamp(22px,2.4vw,30px)] font-medium tracking-tight" style={{ color: light ? "var(--nx-fg)" : "var(--nx-panel-fg)" }}>
        <CountUp to={s.v} decimals={s.d || 0} prefix={s.p || ""} suffix={s.s || ""} locale={locale} duration={1.4} />
      </div>
      <div className="text-[12.5px] mt-0.5" style={{ color: light ? "var(--nx-fg-3)" : "var(--nx-panel-fg-3)" }}>{s.l}</div>
    </div>
  );
}

/* Diagrama vertical de nodos con un "paquete" de datos que baja hasta el paso activo */
function FlowPanel({ steps, active, locale }) {
  const reduce = useReducedMotion();
  return (
    <div className="nx-panel">
      <div className="nx-panel-bar">
        {steps[active].k}
        <span className="nx-panel-tag nx-live">{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
      </div>
      <div className="p-4 sm:p-5 relative">
        {/* Raíl */}
        <div className="absolute left-[38px] sm:left-[42px] top-8 bottom-8 w-[2px] rounded" style={{ background: "rgba(255,255,255,.08)" }} aria-hidden="true" />
        <motion.div
          className="absolute left-[38px] sm:left-[42px] top-8 w-[2px] rounded origin-top"
          style={{ background: "linear-gradient(#34D399,#A3E635)", height: "calc(100% - 64px)" }}
          animate={{ scaleY: steps.length > 1 ? active / (steps.length - 1) : 1 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
          aria-hidden="true"
        />
        <ol className="relative grid gap-2.5">
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <motion.li
                key={s.k}
                layout={!reduce}
                className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-3 items-start rounded-[14px] p-2.5"
                style={{
                  background: on ? "rgba(16,185,129,.10)" : "transparent",
                  border: `1px solid ${on ? "rgba(110,231,183,.35)" : "transparent"}`,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <motion.span
                  className="relative z-10 w-11 h-11 rounded-[12px] grid place-items-center font-mono text-[12px]"
                  animate={{
                    background: on ? "linear-gradient(135deg,#059669,#34D399)" : done ? "rgba(16,185,129,.22)" : "rgba(255,255,255,.05)",
                    color: on ? "#04261B" : done ? "#6EE7B7" : "#82A69A",
                    scale: on ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ border: "1px solid rgba(255,255,255,.08)" }}
                >
                  {s.product ? <img src="/logo.png" alt="" width="22" height="22" /> : String(i + 1).padStart(2, "0")}
                  {on && !reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-[12px]"
                      style={{ border: "2px solid #34D399" }}
                      initial={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.6 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </motion.span>
                <div className="min-w-0 pt-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[15px] tracking-tight" style={{ color: on || done ? "var(--nx-panel-fg)" : "var(--nx-panel-fg-3)" }}>{s.node}</span>
                    {done && <span className="nx-chip !py-1">✓</span>}
                  </div>
                  <div className="font-mono text-[11px] mt-0.5 truncate" style={{ color: "var(--nx-panel-fg-3)" }}>{s.sub}</div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="stats"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 pt-3">
                          {s.stats.map((st) => (
                            <Stat key={st.l} s={st} locale={locale} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function StickyStory({ story, locale }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const n = story.steps.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999))));
  });

  const step = story.steps[active];

  return (
    <div ref={ref} style={{ height: `${n * 85 + 40}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="nx-wrap w-full grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 items-center">
          <div className="min-w-0">
            <div className="nx-eyebrow"><b>{story.tag}</b></div>
            <h2 className="nx-h2 mt-4 max-w-[16ch]">{story.title}</h2>
            <p className="nx-lead mt-4 !text-[17px]">{story.desc}</p>

            <div className="mt-8 relative min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <div className="font-mono text-[12px] uppercase tracking-[0.08em]" style={{ color: "var(--nx-pill-fg)" }}>
                    {String(active + 1).padStart(2, "0")} · {step.k}
                  </div>
                  <h3 className="font-black text-[clamp(26px,2.6vw,34px)] tracking-[-0.035em] leading-[1.08] mt-2" style={{ color: "var(--nx-fg)" }}>
                    {step.title}
                  </h3>
                  <p className="nx-body mt-3 text-[16px] max-w-[52ch]">{step.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-1 w-48 rounded-full overflow-hidden" style={{ background: "var(--nx-line)" }}>
                <motion.div className="absolute inset-y-0 left-0 w-full origin-left rounded-full" style={{ scaleX: bar, background: "var(--nx-btn)" }} />
              </div>
              <span className="font-mono text-[12px] nx-muted">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="min-w-0">
            <FlowPanel steps={story.steps} active={active} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedStory({ story, locale }) {
  return (
    <div className="nx-wrap">
      <div className="nx-eyebrow"><b>{story.tag}</b></div>
      <h2 className="nx-h2 mt-4">{story.title}</h2>
      <p className="nx-lead mt-4">{story.desc}</p>
      <ol className="mt-8 grid gap-3 relative">
        {story.steps.map((s, i) => (
          <Reveal as="li" key={s.k} delay={0.05} className="nx-card p-5 grid gap-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[11px] grid place-items-center font-mono text-[12px] text-white shrink-0" style={{ background: "var(--nx-btn)" }}>
                {s.product ? <img src="/logo.png" alt="" width="22" height="22" /> : String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.06em] nx-muted">{String(i + 1).padStart(2, "0")} · {s.node}</div>
                <h3 className="font-black text-[20px] tracking-[-0.03em] leading-tight" style={{ color: "var(--nx-fg)" }}>{s.title}</h3>
              </div>
            </div>
            <p className="nx-body text-[15px]">{s.desc}</p>
            <div className="grid grid-cols-2 gap-3 pt-3" style={{ borderTop: "1px solid var(--nx-line)" }}>
              {s.stats.map((st) => (
                <Stat key={st.l} s={st} locale={locale} light />
              ))}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function StoryFlow() {
  const { t, lang } = useI18n();
  const story = t.home.story;
  const locale = lang === "en" ? "en-GB" : "es-ES";
  const desktop = useMedia("(min-width: 1024px) and (min-height: 700px)");
  const reduce = useReducedMotion();

  return (
    <section id="historia" className="relative pt-10">
      <SectionMark n={2} />
      {desktop && !reduce ? <StickyStory story={story} locale={locale} /> : <div className="py-10"><StackedStory story={story} locale={locale} /></div>}

      <div className="nx-wrap pb-6 relative">
        <Reveal className="nx-soft p-5 sm:p-6 flex flex-wrap items-center gap-4 justify-between">
          <p className="text-[16px] font-semibold max-w-[60ch]" style={{ color: "var(--nx-fg)" }}>{story.lane}</p>
          <Link to="/productos#next-management" className="nx-btn nx-btn-ghost nx-btn-sm nx-focus">
            {story.laneCta}
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
