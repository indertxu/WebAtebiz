import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Eyebrow } from "./ui";

const PILLAR_ICONS = [Zap, Layers, ShieldCheck];
const TRUST_ICONS = [Building2, Globe, Sparkles];

export function FinalBand() {
  const { t } = useI18n();
  const c = t.cta;
  return (
    <div className="nx-panel relative p-7 sm:p-12 lg:p-14 grid lg:grid-cols-[minmax(0,1.2fr)_auto] gap-8 items-end">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-40 w-[520px] h-[420px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(52,211,153,.22), transparent)" }}
      />
      <div className="relative min-w-0">
        <div className="font-mono text-[12px] uppercase tracking-[0.08em]" style={{ color: "#6EE7B7" }}>{c.finalTag}</div>
        <h2 className="font-black tracking-[-0.045em] leading-[1.02] mt-4 text-[clamp(30px,4.2vw,50px)] max-w-[20ch]" style={{ color: "var(--nx-panel-fg)" }}>
          {c.finalTitle}
        </h2>
        <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] mt-6" style={{ color: "var(--nx-panel-fg-3)" }}>{c.finalNote}</p>
      </div>
      <div className="relative flex flex-wrap gap-3">
        <Link to="/contacto" className="nx-btn nx-btn-primary nx-focus">
          {c.hablarEquipo}
          <ArrowRight size={17} />
        </Link>
        <Link
          to="/productos"
          className="nx-btn nx-focus"
          style={{ border: "1px solid var(--nx-panel-block-line)", color: "var(--nx-panel-fg)", background: "rgba(255,255,255,.04)" }}
        >
          {c.verProductos}
        </Link>
      </div>
    </div>
  );
}

export default function CTA() {
  const { t } = useI18n();
  const c = t.cta;

  return (
    <section id="manifiesto" className="py-16 lg:py-24">
      <div className="nx-wrap">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-end">
          <div className="min-w-0">
            <Eyebrow tag={c.tag} />
            <h2 className="nx-h2 mt-4">
              {c.title1}
              <br />
              {c.title2} <span className="nx-grad">{c.titleHighlight}</span>
              {c.title3}
            </h2>
          </div>
          <p className="nx-lead min-w-0">
            {c.desc1} <b>{c.descHighlight}</b>
            {c.desc2}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {c.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <div key={p.title} className="nx-soft p-6">
                <div className="nx-icon"><Icon size={19} /></div>
                <h3 className="font-bold text-[18px] tracking-tight mt-4" style={{ color: "var(--nx-fg)" }}>{p.title}</h3>
                <p className="nx-body text-[15px] mt-1.5">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {c.trust.map((label, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <span key={label} className="inline-flex items-center gap-2 text-[14px] font-medium" style={{ color: "var(--nx-fg-2)" }}>
                <Icon size={15} style={{ color: "var(--nx-accent)" }} />
                {label}
              </span>
            );
          })}
        </div>

        <div className="mt-16">
          <FinalBand />
        </div>
      </div>
    </section>
  );
}
