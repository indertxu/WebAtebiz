import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Layers, ShieldCheck, Sparkles, Building2, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PILLAR_ICONS = [Zap, Layers, ShieldCheck];
const TRUST_ICONS = [Building2, Globe, Sparkles];

export default function CTA() {
  const { t } = useI18n();

  return (
    <section id="manifiesto" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,133,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mono text-xs font-medium text-primary/80 tracking-[0.2em] uppercase mb-5 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-primary/60" />
            {t.cta.tag}
            <span className="w-8 h-px bg-primary/60" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
            {t.cta.title1}
            <br />
            {t.cta.title2} <span className="text-primary text-glow">{t.cta.titleHighlight}</span>
            {t.cta.title3}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            {t.cta.desc1}{" "}
            <span className="text-foreground font-medium">{t.cta.descHighlight}</span>
            {t.cta.desc2}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {t.cta.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <div key={p.title} className="glass-panel rounded-2xl p-7 text-center hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-14">
          {t.cta.trust.map((label, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={15} className="text-primary/80" />
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="h-px velocity-line opacity-40 max-w-lg mx-auto mb-14" />

        <div className="text-center">
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">
            {t.cta.finalTag}
          </div>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-6 max-w-xl mx-auto">
            {t.cta.finalTitle}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
            >
              {t.cta.hablarEquipo}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
            >
              {t.cta.verProductos}
            </Link>
          </div>
          <p className="mono text-[11px] text-muted-foreground tracking-wider uppercase mt-8">
            {t.cta.finalNote}
          </p>
        </div>
      </div>
    </section>
  );
}
