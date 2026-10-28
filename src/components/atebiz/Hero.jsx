import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Cube, { FACE_TO_PRODUCT } from "./Cube";
import { CountUp, DrawSpark, EASE, GrowBar, LiveNumber, Magnetic, RotatingTypewriter } from "./fx";

const REVENUE = [4.9, 5.1, 5.0, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 6.2, 6.5, 6.89];
const ORDER = ["top", "right", "left"];

const STATS = [
  { to: 4.2, d: 1, s: "s" },
  { to: 99.9, d: 1, s: "%" },
  { to: 1.2, d: 1, p: "+", s: "k" },
];

/* Tarjetas flotantes, una por cara del cubo */
function FaceCard({ face, active, onHover, children, title, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  const on = active === face;
  return (
    <motion.div
      className={`nx-panel !rounded-[18px] p-3.5 w-[230px] ${className}`}
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: on ? 1.04 : 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0 : delay, scale: { type: "spring", stiffness: 260, damping: 20 } }}
      onMouseEnter={() => onHover(face)}
      style={{
        borderColor: on ? "rgba(110,231,183,.55)" : undefined,
        boxShadow: on ? "0 30px 60px -28px rgba(16,185,129,.65)" : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <img src="/logo.png" alt="" width="18" height="18" />
        <span className="font-bold text-[13px] tracking-tight" style={{ color: "var(--nx-panel-fg)" }}>{title}</span>
        <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: on ? "#6EE7B7" : "rgba(255,255,255,.2)", boxShadow: on ? "0 0 0 4px rgba(52,211,153,.2)" : "none" }} />
      </div>
      {children}
    </motion.div>
  );
}

function CardsContent({ h, lang }) {
  const locale = lang === "en" ? "en-GB" : "es-ES";
  return {
    top: (
      <>
        <div className="nx-lbl">{h.nr.label}</div>
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <span className="font-mono text-[17px]" style={{ color: "var(--nx-panel-fg)" }}>
            <LiveNumber start={67943736} step={[400, 2600]} every={1100} locale={locale} /> €
          </span>
          <span className="nx-chip">{h.nr.chip}</span>
        </div>
        <DrawSpark points={REVENUE} height={34} delay={1.4} className="mt-1.5" />
      </>
    ),
    right: (
      <>
        <div className="nx-lbl">{h.nd.label}</div>
        <div className="font-mono text-[17px] mt-1" style={{ color: "var(--nx-panel-fg)" }}>
          <LiveNumber start={353731} step={[3, 41]} every={420} locale={locale} />
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          {[["#D89A6A", 0], ["#C9D6D1", 0.15], ["#E9C25A", 0.3]].map(([c, d], i) => (
            <span key={c} className="grid gap-1">
              <GrowBar pct={100} color={c} delay={1.5 + d} className="!h-1.5" />
              <span className="font-mono text-[9.5px]" style={{ color: "var(--nx-panel-fg-3)" }}>{h.nd.legend[i]}</span>
            </span>
          ))}
        </div>
      </>
    ),
    left: (
      <>
        <div className="nx-lbl">{h.nm.label}</div>
        <div className="font-mono text-[17px] mt-1" style={{ color: "var(--nx-panel-fg)" }}>
          <CountUp to={31} duration={2} /> <span style={{ color: "var(--nx-panel-fg-3)" }}>/ 45</span>
        </div>
        <GrowBar pct={68.9} delay={1.6} className="mt-2" />
        <div className="flex justify-between text-[11.5px] mt-2" style={{ color: "var(--nx-panel-fg-2)" }}>
          <span>{h.nm.sub}</span>
          <span className="font-mono" style={{ color: "var(--nx-panel-fg)" }}>{h.nm.subVal}</span>
        </div>
      </>
    ),
  };
}

function CubeStage() {
  const { t, lang } = useI18n();
  const h = t.home.hero;
  const reduce = useReducedMotion();
  const [active, setActive] = useState("top");
  const [hover, setHover] = useState(false);
  const cards = CardsContent({ h, lang });

  // Rota la cara activa sola mientras nadie interactúa
  useEffect(() => {
    if (reduce || hover) return;
    const id = setInterval(() => setActive((a) => ORDER[(ORDER.indexOf(a) + 1) % ORDER.length]), 3200);
    return () => clearInterval(id);
  }, [reduce, hover]);

  const titles = { top: h.nr.title, right: h.nd.title, left: h.nm.title };

  // Inclinación 3D del cubo siguiendo al ratón
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 });
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Coordenadas en un lienzo de 1000×1000 (mismo sistema que las líneas guía)
  const leaders = {
    top: "M500,300 C560,230 620,170 690,150",
    right: "M640,600 C700,650 720,700 700,760",
    left: "M330,640 C290,690 250,720 220,760",
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[600px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        mx.set(0);
        my.set(0);
      }}
      onMouseMove={onMove}
      style={{ perspective: 1200 }}
    >
      <div className="relative aspect-square">
        {/* Órbita decorativa */}
        <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <g className="nx-spin-slow">
            <circle cx="500" cy="500" r="430" fill="none" stroke="var(--nx-line-2)" strokeDasharray="2 14" strokeWidth="2" />
          </g>
          <circle cx="500" cy="500" r="340" fill="none" stroke="var(--nx-line)" strokeWidth="1.5" />
          {Object.entries(leaders).map(([k, d]) => (
            <motion.path
              key={k}
              d={d}
              fill="none"
              stroke={active === k ? "var(--nx-accent)" : "var(--nx-line-2)"}
              strokeWidth={active === k ? 3 : 2}
              strokeDasharray="5 7"
              className="hidden sm:block nx-flow"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 1.4, duration: 0.6 }}
            />
          ))}
        </svg>

        <motion.div className="absolute left-[17%] top-[14%] w-[66%]" style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
          <Cube
            active={active}
            onFace={(f) => setActive(f)}
            label={h.cubeLabel}
            faceLabels={titles}
            className="w-full h-auto overflow-visible"
          />
        </motion.div>

        {/* Tarjetas (escritorio) */}
        <div className="hidden sm:block absolute left-[64%] top-[2%]">
          <FaceCard face="top" active={active} onHover={setActive} title={titles.top} delay={1.2}>{cards.top}</FaceCard>
        </div>
        <div className="hidden sm:block absolute left-[62%] top-[74%]">
          <FaceCard face="right" active={active} onHover={setActive} title={titles.right} delay={1.35}>{cards.right}</FaceCard>
        </div>
        <div className="hidden sm:block absolute left-[0%] top-[76%]">
          <FaceCard face="left" active={active} onHover={setActive} title={titles.left} delay={1.5}>{cards.left}</FaceCard>
        </div>
      </div>

      {/* Tarjetas (móvil) */}
      <div className="sm:hidden mt-2 grid gap-3">
        {ORDER.map((f, i) => (
          <FaceCard key={f} face={f} active={active} onHover={setActive} title={titles[f]} delay={1 + i * 0.12} className="!w-full">
            {cards[f]}
          </FaceCard>
        ))}
      </div>
      <span className="sr-only">{Object.values(FACE_TO_PRODUCT).join(", ")}</span>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useI18n();
  const h = t.hero;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);
  const locale = lang === "en" ? "en-GB" : "es-ES";

  return (
    <section id="inicio" ref={ref} className="relative pt-6 sm:pt-10 pb-10 lg:pb-16 overflow-hidden">
      <div className="nx-glow-orb w-[520px] h-[520px] -right-40 -top-40" style={{ background: "rgba(52,211,153,.16)" }} aria-hidden="true" />
      <div className="nx-glow-orb w-[420px] h-[420px] -left-48 top-[40%]" style={{ background: "rgba(163,230,53,.10)" }} aria-hidden="true" />

      <div className="nx-wrap relative grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-10 lg:gap-4 items-center">
        <motion.div className="min-w-0" style={{ y, opacity: fade }}>
          <motion.div
            className="flex flex-wrap gap-2"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="nx-pill nx-pill-on">{h.badge}</span>
            <span className="nx-pill">{h.pill2}</span>
          </motion.div>

          <h1 className="nx-h1 mt-6 !text-[clamp(40px,4.9vw,70px)]">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              {h.title1}
            </motion.span>
            <span className="block nx-grad min-h-[2em]">
              <RotatingTypewriter key={lang} texts={t.home.hero.rotate} startDelay={800} />
            </span>
          </h1>

          <motion.p
            className="nx-lead mt-5"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            <b>{h.lead}</b> {h.desc}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            <Magnetic>
              <Link to="/contacto" className="nx-btn nx-btn-primary nx-focus !px-6 !py-4 !text-[16px]">
                {h.hablarEquipo}
                <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <Link to="/productos" className="nx-btn nx-btn-ghost nx-focus !px-6 !py-4 !text-[16px]">
              {h.verProductos}
            </Link>
          </motion.div>
          <p className="text-[13px] mt-4 nx-muted">{h.note}</p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[520px] pt-6" style={{ borderTop: "1px solid var(--nx-line)" }}>
            {h.stats.map((s, i) => (
              <div key={s.label} className="min-w-0">
                <div className="font-mono text-[clamp(22px,2.8vw,32px)] font-medium tracking-tight" style={{ color: "var(--nx-fg)" }}>
                  <CountUp to={STATS[i].to} decimals={STATS[i].d} prefix={STATS[i].p || ""} suffix={STATS[i].s} duration={2} locale={locale} />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.06em] mt-1 nx-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="min-w-0">
          <CubeStage />
        </div>
      </div>

      <a href="#historia" className="nx-focus hidden lg:flex flex-col items-center gap-3 mx-auto mt-8 w-max font-mono text-[11px] uppercase tracking-[0.12em] nx-muted">
        {t.home.scroll}
        <span className="relative block w-px h-14 overflow-hidden" style={{ background: "var(--nx-line)" }}>
          <span className="absolute inset-0 nx-scroll-cue" style={{ background: "var(--nx-accent)" }} />
        </span>
      </a>
    </section>
  );
}
