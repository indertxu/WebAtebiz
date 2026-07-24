import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Zap,
  Brain,
  Layers,
  Building2,
  BarChart3,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import { Image } from "@/components/ui/image";

const IMG =
  "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/22243a142_generated_6a6a3eef.png";

const APP_URL = "https://web-reporting-zmdp.vercel.app/";

/* ---------- Contenido: teasers para generar interés (NO exhaustivo) ---------- */

const stats = [
  { value: "Real-time", label: "Reporting siempre al día" },
  { value: "IA", label: "Análisis automáticos" },
  { value: "Multi-dim.", label: "Sociedad · país · negocio" },
  { value: "Board-ready", label: "Packs listos para dirección" },
];

const pillars = [
  {
    icon: BarChart3,
    title: "Reporting ejecutivo",
    teaser:
      "Genera reportes financieros claros y consistentes desde los datos ya consolidados de tu grupo. Sin Excel rotos ni versiones enfrentadas.",
  },
  {
    icon: Brain,
    title: "Análisis con IA",
    teaser:
      "La IA lee tus estados financieros, detecta desviaciones frente a presupuesto, señala anomalías y genera comentarios automáticos.",
  },
  {
    icon: Layers,
    title: "KPIs por dimensión",
    teaser:
      "Explora tus cifras por sociedad, país, unidad de negocio, moneda o cualquier dimensión. Todo el análisis, en un motor.",
  },
];

const steps = [
  {
    n: "01",
    title: "Conecta Konsolidator",
    desc: "Next Reporting se alimenta directamente de los datos ya consolidados en Konsolidator.",
  },
  {
    n: "02",
    title: "Analiza con IA",
    desc: "La IA cruza cifras, identifica insights y prepara los comentarios ejecutivos.",
  },
  {
    n: "03",
    title: "Board pack listo",
    desc: "Recibes reportes y board packs listos para presentar en el consejo o a inversores.",
  },
];

const targets = [
  { icon: Building2, label: "Grupos multi-entidad" },
  { icon: Users, label: "Direcciones financieras" },
  { icon: Sparkles, label: "Consejos de administración" },
];

/**
 * NextReportingFullscreen — presentación teaser del producto.
 * Objetivo: dar contexto suficiente para despertar interés y dirigir
 * al sitio real de Next Reporting para saber más.
 */
export default function NextReportingFullscreen({ open, onClose, revealDelay = 0 }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-background overflow-y-auto no-scrollbar animate-fade-in">
      {/* Background decorativo */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,133,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

      {/* Botón volver — fijo arriba izquierda */}
      <button
        onClick={onClose}
        className="fixed top-6 left-6 z-[10] inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:border-primary/60 transition-all focus-ring group animate-content-rise"
        style={{ animationDelay: `${revealDelay + 300}ms` }}
        aria-label="Volver a inicio"
      >
        <ArrowLeft size={16} className="text-primary group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium">Volver a inicio</span>
      </button>

      {/* CTA fijo arriba derecha — atajo directo al producto */}
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-[10] group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:glow-emerald transition-all focus-ring animate-content-rise"
        style={{ animationDelay: `${revealDelay + 400}ms` }}
      >
        Abrir Next Reporting
        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>

      {/* Contenido */}
      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-28">
        {/* -------- Hero -------- */}
        <div
          className="relative aspect-[16/8] rounded-3xl overflow-hidden mb-14 animate-content-rise"
          style={{ animationDelay: `${revealDelay + 200}ms` }}
        >
          <Image src={IMG} alt="Next Reporting" fittingType="fill" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="mono flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                DISPONIBLE
              </span>
              <span className="mono text-xs text-muted-foreground tracking-wider">
                REPORTE Y ANÁLISIS · CON IA
              </span>
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-4">
              Reporting y análisis financiero <span className="text-primary text-glow">con IA</span>.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Next Reporting se conecta a Konsolidator y transforma los datos consolidados de tu grupo en
              KPIs, análisis por dimensión y board packs listos para dirección.
            </p>
          </div>
        </div>

        {/* -------- Stats row -------- */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 animate-content-rise"
          style={{ animationDelay: `${revealDelay + 350}ms` }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-panel rounded-2xl px-5 py-6 text-center hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-1">
                {s.value}
              </div>
              <div className="mono text-[10px] text-muted-foreground tracking-wider uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* -------- Pillars — Qué resuelve -------- */}
        <div
          className="mb-20 animate-content-rise"
          style={{ animationDelay: `${revealDelay + 500}ms` }}
        >
          <div className="max-w-2xl mb-10">
            <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">
              QUÉ RESUELVE
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              Del dato consolidado al <span className="text-primary">insight ejecutivo</span>, sin fricción.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="glass-panel rounded-2xl p-7 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <p.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.teaser}</p>
              </div>
            ))}
          </div>
        </div>

        {/* -------- Cómo funciona — 3 pasos compactos -------- */}
        <div
          className="mb-20 animate-content-rise"
          style={{ animationDelay: `${revealDelay + 650}ms` }}
        >
          <div className="max-w-2xl mb-10">
            <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">
              CÓMO FUNCIONA
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              De datos consolidados a <span className="text-primary">board pack</span> en 3 pasos.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="rounded-2xl border border-border p-6 hover:border-primary/40 transition-all h-full">
                  <div className="font-heading text-3xl font-bold text-primary mb-3">{s.n}</div>
                  <h4 className="font-heading font-semibold text-base mb-2">{s.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-primary/40 z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* -------- Para quién es — chips compactos -------- */}
        <div
          className="mb-20 animate-content-rise"
          style={{ animationDelay: `${revealDelay + 800}ms` }}
        >
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-4">
            PENSADO PARA
          </div>
          <div className="flex flex-wrap gap-3">
            {targets.map((t) => (
              <div
                key={t.label}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <t.icon size={14} className="text-primary" />
                <span className="text-sm">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* -------- CTA final grande -------- */}
        <div
          className="relative glass-panel rounded-3xl p-8 sm:p-14 overflow-hidden animate-content-rise"
          style={{ animationDelay: `${revealDelay + 950}ms` }}
        >
          {/* Aura decorativa */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/15 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Timer size={16} className="text-primary" />
              <span className="mono text-xs text-primary/80 tracking-wider uppercase">
                EXPLORA EL PRODUCTO COMPLETO
              </span>
            </div>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 leading-[1.1]">
              Esto es solo el principio.
              <br />
              <span className="text-primary text-glow">Descubre Next Reporting</span> por dentro.
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl">
              Accede al sitio completo para ver casos de uso reales, capturas de la plataforma, precios
              y comenzar tu demo con nuestro equipo.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
              >
                Ir a Next Reporting
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
              >
                <ArrowLeft size={18} />
                Volver a Atebiz
              </button>
            </div>
          </div>
        </div>

        {/* Nota pie */}
        <p className="text-center mono text-[11px] text-muted-foreground tracking-wider uppercase mt-10">
          NEXT REPORTING · BY ATEBIZ · MÓDULO DISPONIBLE HOY
        </p>
      </div>
    </div>
  );
}
