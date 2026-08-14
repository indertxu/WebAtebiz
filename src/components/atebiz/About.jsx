import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Zap, LineChart, Lock, MapPin, Building2, Globe, Users,
  BarChart3, Database, Briefcase, ArrowRight, Info,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import NextReportingFullscreen from "./NextReportingFullscreen";
import ComingSoonModal from "./ComingSoonModal";

const HIGHLIGHT_ICONS = [MapPin, Building2, Globe, Users];
const VALUE_ICONS = [Zap, LineChart, Shield, Lock];
const PRODUCT_ICONS = [BarChart3, Database, Briefcase];
const PRODUCT_KEYS = ["next-reporting", "dataworkhouse", "next-management"];

export default function About() {
  const { t } = useI18n();
  const [nrOpen, setNrOpen] = useState(false);
  const [comingSoonProduct, setComingSoonProduct] = useState(null);

  const openProduct = (i) => {
    const key = PRODUCT_KEYS[i];
    if (key === "next-reporting") {
      setNrOpen(true);
    } else {
      const meta = t.about.productLine[i];
      setComingSoonProduct({
        ...meta,
        icon: PRODUCT_ICONS[i],
        features: buildFeaturesFor(key, t),
      });
    }
  };

  return (
    <section id="empresa" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            {t.about.tag}
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            {t.about.title1} <span className="text-primary">{t.about.titleHighlight}</span> {t.about.title2}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">{t.about.p1}</p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">{t.about.p2}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{t.about.p3}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {t.about.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i];
              return (
                <div key={h.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm mb-1">{h.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {t.about.values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <div key={v.title} className="glass-panel glass-panel-hover rounded-2xl p-6 group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Qué ofrecemos — TARJETAS CLICABLES */}
      <div className="relative max-w-7xl mx-auto px-6 mt-24 lg:mt-32">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            {t.about.ofrecemosTag}
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            {t.about.ofrecemosTitle1} <span className="text-primary">{t.about.ofrecemosHighlight}</span>{t.about.ofrecemosTitle2}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t.about.ofrecemosDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {t.about.productLine.map((p, i) => {
            const Icon = PRODUCT_ICONS[i];
            const isAvailable = i === 0; // solo Next Reporting está disponible
            return (
              <button
                key={p.name}
                onClick={() => openProduct(i)}
                className="glass-panel rounded-2xl p-7 flex gap-5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 text-left group focus-ring"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-heading font-semibold text-lg tracking-tight">{p.name}</h3>
                    <span className={`mono text-[10px] px-2.5 py-0.5 rounded-full ${
                      isAvailable
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground border border-border"
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                    {!isAvailable && <Lock size={11} className="text-muted-foreground" />}
                    {isAvailable && <Info size={12} className="text-primary/70" />}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{isAvailable ? "→" : "🔒"}</span>
                    <span>{isAvailable ? "Ver ficha" : "Ver detalles"}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/productos"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
          >
            {t.about.verTodos}
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
          >
            {t.about.hablarEquipo}
          </Link>
        </div>
      </div>

      {/* Popups */}
      <NextReportingFullscreen open={nrOpen} onClose={() => setNrOpen(false)} />
      <ComingSoonModal
        open={!!comingSoonProduct}
        product={comingSoonProduct}
        onClose={() => setComingSoonProduct(null)}
      />
    </section>
  );
}

/* ---------- Helpers ---------- */

// Features específicas por producto (mismas que en Productos)
function buildFeaturesFor(key, t) {
  const map = {
    dataworkhouse: 1,
    "next-management": 2,
  };
  const idx = map[key];
  if (idx == null) return [];
  return t.products.products[idx]?.features || [];
}
