import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, Globe, Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { CountUp, EASE, Magnetic, Marquee, Reveal, Stagger, StaggerItem, useSpotlight } from "./fx";
import { SectionMark } from "./SectionMark";
import Cube from "./Cube";

/* ---------- 04 · Conectores ---------- */

function Chip({ label }) {
  return (
    <span
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-[12px] px-4 py-3 text-[15px] font-semibold"
      style={{ background: "var(--nx-card)", border: "1px solid var(--nx-line)", color: "var(--nx-fg)", boxShadow: "var(--nx-shadow-card)" }}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: "var(--nx-accent)" }} />
      {label}
    </span>
  );
}

export function Connectors() {
  const { t } = useI18n();
  const c = t.home.connectors;
  return (
    <section id="conectores" className="relative py-16 lg:py-24 overflow-hidden">
      <SectionMark n={4} />
      <div className="nx-wrap">
        <Reveal className="grid lg:grid-cols-2 gap-6 items-end">
          <div>
            <div className="nx-eyebrow"><b>{c.tag}</b></div>
            <h2 className="nx-h2 mt-4 max-w-[16ch]">{c.title}</h2>
          </div>
          <p className="nx-lead">{c.desc}</p>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-3">
        <Marquee items={c.row1} speed={42} renderItem={(x) => <Chip label={x} />} />
        <Marquee items={c.row2} speed={48} className="nx-marquee-rev" renderItem={(x) => <Chip label={x} />} />
      </div>
    </section>
  );
}

/* ---------- 05 · Velocidad (banda oscura) ---------- */

const SPEED = [
  { to: 4.2, d: 1, s: "s" },
  { to: 0.01, d: 2, s: "%" },
  { to: 3, d: 0, s: "x" },
  { text: "24/7" },
];

export function SpeedBand() {
  const { t, lang } = useI18n();
  const v = t.velocity;
  const sp = t.home.speed;
  const locale = lang === "en" ? "en-GB" : "es-ES";
  return (
    <section id="velocidad-home" className="relative py-16 lg:py-24">
      <SectionMark n={5} />
      <div className="nx-wrap">
        <div className="nx-panel relative p-6 sm:p-10 lg:p-14">
          <div className="nx-glow-orb w-[480px] h-[480px] -right-32 -top-48" style={{ background: "rgba(52,211,153,.18)" }} aria-hidden="true" />
          <Reveal className="relative grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 items-end">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.08em]" style={{ color: "#6EE7B7" }}>{sp.tag} · Next Reporting</div>
              <h2 className="font-black text-[clamp(32px,4.4vw,56px)] tracking-[-0.045em] leading-[1.02] mt-4 max-w-[18ch]" style={{ color: "var(--nx-panel-fg)" }}>
                {sp.title}
              </h2>
            </div>
            <Link
              to="/velocidad"
              className="nx-btn nx-focus self-start lg:self-end"
              style={{ border: "1px solid var(--nx-panel-block-line)", color: "var(--nx-panel-fg)", background: "rgba(255,255,255,.04)" }}
            >
              {sp.cta}
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          <Stagger className="relative mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-[18px] overflow-hidden" style={{ background: "var(--nx-panel-block-line)" }}>
            {v.metrics.map((m, i) => (
              <StaggerItem key={m.title} className="p-6 lg:p-7" style={{ background: "var(--nx-panel-solid, #0B2E24)" }}>
                <div className="font-mono font-medium tracking-[-0.04em] text-[clamp(44px,5vw,64px)] leading-none" style={{ color: "#6EE7B7" }}>
                  {SPEED[i].text ? SPEED[i].text : <CountUp to={SPEED[i].to} decimals={SPEED[i].d} suffix={SPEED[i].s} locale={locale} duration={2} />}
                </div>
                <h3 className="font-bold text-[17px] tracking-tight mt-5" style={{ color: "var(--nx-panel-fg)" }}>{m.title}</h3>
                <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: "var(--nx-panel-fg-2)" }}>{m.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 · Manifiesto (palabras que se encienden con el scroll) ---------- */

function ScrollWord({ word, range, progress, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block mr-[0.24em] ${accent ? "nx-grad" : ""}`}>
      {word}
    </motion.span>
  );
}

const PILLAR_ICONS = [Zap, Layers, ShieldCheck];
const TRUST_ICONS = [Building2, Globe, Sparkles];

export function Manifesto() {
  const { t } = useI18n();
  const c = t.cta;
  const words = t.home.manifesto.words.split(" ");
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 25%"] });
  const spot = useSpotlight();

  return (
    <section id="manifiesto" className="relative py-16 lg:py-24">
      <SectionMark n={6} />
      <div className="nx-wrap">
        <div className="nx-eyebrow"><b>{c.tag}</b></div>
        <h2 ref={ref} className="font-black tracking-[-0.055em] leading-[0.98] mt-5 text-[clamp(44px,8.6vw,124px)]" style={{ color: "var(--nx-fg)" }}>
          {words.map((w, i) => {
            const start = i / words.length;
            const accent = /inteligencia|intelligence/i.test(w);
            return reduce ? (
              <span key={i} className={`inline-block mr-[0.24em] ${accent ? "nx-grad" : ""}`}>{w}</span>
            ) : (
              <ScrollWord key={i} word={w} accent={accent} progress={scrollYProgress} range={[start, Math.min(1, start + 1.4 / words.length)]} />
            );
          })}
        </h2>
        <Reveal as="p" className="nx-lead mt-8 !max-w-[70ch]">
          {c.desc1} <b>{c.descHighlight}</b>
          {c.desc2}
        </Reveal>

        <Stagger className="mt-12 grid md:grid-cols-3 gap-4">
          {c.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <StaggerItem key={p.title} className="nx-card nx-spot p-6 transition-transform hover:-translate-y-1" {...spot}>
                <div className="nx-icon"><Icon size={19} /></div>
                <h3 className="font-black text-[22px] tracking-[-0.03em] mt-5" style={{ color: "var(--nx-fg)" }}>{p.title}</h3>
                <p className="nx-body text-[15px] mt-1.5">{p.desc}</p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {c.trust.map((label, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <span key={label} className="inline-flex items-center gap-2 text-[14.5px] font-semibold" style={{ color: "var(--nx-fg-2)" }}>
                <Icon size={16} style={{ color: "var(--nx-accent)" }} />
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 · Cierre con formulario ---------- */

export function FinalCall() {
  const { t } = useI18n();
  const f = t.home.final;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const reduce = useReducedMotion();
  const products = t.ecosystem.products;
  const [showCube, setShowCube] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    navigate(`/contacto${email ? `?email=${encodeURIComponent(email.trim())}` : ""}`);
  };

  return (
    <section id="hablemos" className="relative pt-16 lg:pt-24 pb-24 lg:pb-32">
      <SectionMark n={7} />
      <div className="nx-wrap">
        <div className="nx-panel relative p-7 sm:p-12 lg:p-16 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 items-center">
          <div className="nx-glow-orb w-[560px] h-[560px] -left-40 -bottom-72" style={{ background: "rgba(52,211,153,.2)" }} aria-hidden="true" />
          <div className="relative min-w-0">
            <div className="font-mono text-[12px] uppercase tracking-[0.08em] nx-live" style={{ color: "#6EE7B7" }}>{f.tag}</div>
            <h2 className="font-black tracking-[-0.05em] leading-[1] mt-4 text-[clamp(32px,4.8vw,62px)] max-w-[18ch]" style={{ color: "var(--nx-panel-fg)" }}>
              {f.title}
            </h2>
            <form onSubmit={submit} className="mt-8 flex flex-wrap gap-3 max-w-[560px]">
              <label htmlFor="final-email" className="sr-only">Email</label>
              <input
                id="final-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={f.placeholder}
                className="flex-1 min-w-[220px] rounded-[12px] px-4 py-4 text-[16px] outline-none"
                style={{ background: "rgba(255,255,255,.06)", border: "1px solid var(--nx-panel-block-line)", color: "var(--nx-panel-fg)" }}
              />
              <Magnetic>
                <button type="submit" className="nx-btn nx-btn-primary nx-focus !py-4 !px-6 !text-[16px]">
                  {f.button}
                  <ArrowRight size={18} />
                </button>
              </Magnetic>
            </form>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] mt-4" style={{ color: "var(--nx-panel-fg-3)" }}>{f.note}</p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-[13px] mr-1" style={{ color: "var(--nx-panel-fg-3)" }}>{f.products}</span>
              {products.map((p) => {
                const web = PRODUCT_LINKS[p.key]?.web;
                const cls = "nx-chip nx-chip-dim !py-2 !px-3 !text-[12px] hover:!text-white transition-colors";
                return web ? (
                  <a key={p.key} href={web} target="_blank" rel="noopener noreferrer" className={cls}>
                    {p.name} <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <Link key={p.key} to={`/productos#${p.key}`} className={cls}>
                    {p.name} <ArrowRight size={12} />
                  </Link>
                );
              })}
            </div>
          </div>
          <motion.div
            className="relative hidden lg:block nx-float"
            initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            onViewportEnter={() => setShowCube(true)}
            style={{ minHeight: 300 }}
          >
            {showCube && <Cube active="top" className="w-full max-w-[340px] mx-auto h-auto" label="Atebiz" />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
