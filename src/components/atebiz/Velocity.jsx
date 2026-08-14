import React from "react";
import { ArrowRight, ExternalLink, Zap, Brain, LayoutTemplate, FileBarChart, Clock, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const NEXT_REPORTING_WEB_URL = "https://nextreporting.atebiz.com/";

const HELP_ICONS = [FileBarChart, LayoutTemplate, Brain, Sparkles, Clock, Zap];

export default function Velocity() {
  const { t } = useI18n();

  return (
    <section id="velocidad" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            {t.velocity.tag}
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {t.velocity.title1} <span className="text-primary">{t.velocity.titleHighlight}</span>{t.velocity.title2}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {t.velocity.desc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden mb-24">
          {t.velocity.metrics.map((m) => (
            <div key={m.title} className="group relative bg-card p-8 lg:p-12 transition-colors duration-500 hover:bg-secondary cursor-default">
              <div className="absolute top-0 left-0 right-0 h-px velocity-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-heading text-5xl lg:text-6xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                {m.val}
              </div>
              <h3 className="font-heading text-xl font-semibold mt-4 mb-2">{m.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mb-12">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            {t.velocity.ayudaTag}
          </div>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
            {t.velocity.ayudaTitle1} <span className="text-primary">{t.velocity.ayudaHighlight}</span> {t.velocity.ayudaTitle2}
          </h3>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {t.velocity.ayudaDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {t.velocity.helps.map((h, i) => {
            const Icon = HELP_ICONS[i];
            return (
              <div key={h.title} className="glass-panel rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-base mb-2 tracking-tight">{h.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center">
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">
            {t.velocity.ctaTag}
          </div>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-3">
            {t.velocity.ctaTitle}
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t.velocity.ctaDesc}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={NEXT_REPORTING_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
            >
              {t.velocity.explorar}
              <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
