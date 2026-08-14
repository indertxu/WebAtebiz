import React, { useEffect } from "react";
import {
  ArrowLeft, ArrowRight, ExternalLink, Zap, Brain, Layers,
  Building2, BarChart3, Sparkles, Timer, Users,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";

const IMG = "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/22243a142_generated_6a6a3eef.png";
const APP_URL = "https://nextreporting.atebiz.com/";

const PILLAR_ICONS = [BarChart3, Brain, Layers];
const TARGET_ICONS = [Building2, Users, Sparkles];

export default function NextReportingFullscreen({ open, onClose, revealDelay = 0 }) {
  const { t } = useI18n();
  const tr = t.fullscreen;

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
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,133,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

      <button
        onClick={onClose}
        className="fixed top-6 left-6 z-[10] inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:border-primary/60 transition-all focus-ring group animate-content-rise"
        style={{ animationDelay: `${revealDelay + 300}ms` }}
      >
        <ArrowLeft size={16} className="text-primary group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium">{tr.volverInicio}</span>
      </button>

      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-[10] group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:glow-emerald transition-all focus-ring animate-content-rise"
        style={{ animationDelay: `${revealDelay + 400}ms` }}
      >
        {tr.irWebTop}
        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>

      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-28">
        <div className="relative aspect-[16/8] rounded-3xl overflow-hidden mb-14 animate-content-rise" style={{ animationDelay: `${revealDelay + 200}ms` }}>
          <Image src={IMG} alt="Next Reporting" fittingType="fill" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 sm:p-12 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="mono flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                {tr.badge}
              </span>
              <span className="mono text-xs text-muted-foreground tracking-wider">{tr.heroTag}</span>
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-4">
              {tr.heroTitle1} <span className="text-primary text-glow">{tr.heroHighlight}</span>{tr.heroTitle2}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">{tr.heroDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 animate-content-rise" style={{ animationDelay: `${revealDelay + 350}ms` }}>
          {tr.stats.map((s) => (
            <div key={s.label} className="glass-panel rounded-2xl px-5 py-6 text-center hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="mono text-[10px] text-muted-foreground tracking-wider uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-20 animate-content-rise" style={{ animationDelay: `${revealDelay + 500}ms` }}>
          <div className="max-w-2xl mb-10">
            <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">{tr.pillarsTag}</div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              {tr.pillarsTitle1} <span className="text-primary">{tr.pillarsHighlight}</span>{tr.pillarsTitle2}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {tr.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <div key={p.title} className="glass-panel rounded-2xl p-7 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-3 tracking-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.teaser}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20 animate-content-rise" style={{ animationDelay: `${revealDelay + 650}ms` }}>
          <div className="max-w-2xl mb-10">
            <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">{tr.stepsTag}</div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              {tr.stepsTitle1} <span className="text-primary">{tr.stepsHighlight}</span> {tr.stepsTitle2}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {tr.steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="rounded-2xl border border-border p-6 hover:border-primary/40 transition-all h-full">
                  <div className="font-heading text-3xl font-bold text-primary mb-3">{String(i + 1).padStart(2, "0")}</div>
                  <h4 className="font-heading font-semibold text-base mb-2">{s.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < tr.steps.length - 1 && (
                  <ArrowRight size={20} className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-primary/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 animate-content-rise" style={{ animationDelay: `${revealDelay + 800}ms` }}>
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-4">{tr.targetTag}</div>
          <div className="flex flex-wrap gap-3">
            {tr.targets.map((label, i) => {
              const Icon = TARGET_ICONS[i];
              return (
                <div key={label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-primary/40 transition-colors">
                  <Icon size={14} className="text-primary" />
                  <span className="text-sm">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative glass-panel rounded-3xl p-8 sm:p-14 overflow-hidden animate-content-rise" style={{ animationDelay: `${revealDelay + 950}ms` }}>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/15 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Timer size={16} className="text-primary" />
              <span className="mono text-xs text-primary/80 tracking-wider uppercase">{tr.finalTag}</span>
            </div>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 leading-[1.1]">
              {tr.finalTitle1}
              <br />
              <span className="text-primary text-glow">{tr.finalHighlight}</span> {tr.finalTitle2}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl">
              {tr.finalDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
              >
                {tr.irWeb}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
              >
                <ArrowLeft size={18} />
                {tr.volverAtebiz}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mono text-[11px] text-muted-foreground tracking-wider uppercase mt-10">
          {tr.footerTag}
        </p>
      </div>
    </div>
  );
}
