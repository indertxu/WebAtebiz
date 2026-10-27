import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Spark } from "./ui";

const REVENUE = [4.9, 5.1, 5.0, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 6.2, 6.5, 6.89];

function Node({ title, sub }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5" style={{ border: "1px dashed var(--nx-panel-block-line)" }}>
      <span className="text-[13px] font-semibold" style={{ color: "var(--nx-panel-fg)" }}>{title}</span>
      <span className="font-mono text-[11px] text-right" style={{ color: "var(--nx-panel-fg-3)" }}>{sub}</span>
    </div>
  );
}

function Down() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <svg width="12" height="22" viewBox="0 0 12 22">
        <line x1="6" y1="0" x2="6" y2="16" stroke="#34D399" strokeWidth="1.5" className="nx-flow" />
        <path d="M1.5 14 6 20.5 10.5 14" fill="none" stroke="#34D399" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function ProductRow({ name, children }) {
  return (
    <div className="nx-pb grid gap-2.5" style={{ borderColor: "rgba(52,211,153,.32)", background: "rgba(16,185,129,.07)" }}>
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="" width="20" height="20" />
        <span className="font-bold text-[14px] tracking-tight" style={{ color: "var(--nx-panel-fg)" }}>{name}</span>
      </div>
      {children}
    </div>
  );
}

function EcosystemPanel() {
  const { t } = useI18n();
  const p = t.hero.panel;
  return (
    <div className="nx-panel" aria-label={p.title}>
      <div className="nx-panel-bar">
        {p.title}
        <span className="nx-panel-tag nx-live">{p.tag}</span>
      </div>
      <div className="p-4 sm:p-5">
        <Node title={p.erps} sub={p.erpsSub} />
        <Down />
        <ProductRow name="Next Data">
          <div className="flex items-center justify-between gap-3 text-[12.5px]" style={{ color: "var(--nx-panel-fg-2)" }}>
            <span>{p.nd}</span>
            <span className="font-mono nx-num" style={{ color: "var(--nx-panel-fg)" }}>352.527</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
            {[["BRONZE", "#D89A6A"], ["SILVER", "#C9D6D1"], ["GOLD", "#E9C25A"]].map(([k, c]) => (
              <span key={k} className="grid gap-1">
                <i className="h-1.5 rounded-full" style={{ background: c }} />
                <span className="font-mono text-[9.5px]" style={{ color: "var(--nx-panel-fg-3)" }}>{k}</span>
              </span>
            ))}
          </div>
        </ProductRow>
        <Down />
        <Node title={p.konso} sub={p.konsoSub} />
        <Down />
        <ProductRow name="Next Reporting">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="nx-lbl">{p.nr}</div>
              <div className="nx-big mt-1">67,9 M €</div>
            </div>
            <span className="nx-chip">+8,6 %</span>
          </div>
          <Spark points={REVENUE} height={40} />
        </ProductRow>
        <Down />
        <Node title={p.board} sub={p.boardSub} />

        <div className="my-4" style={{ borderTop: "1px dashed var(--nx-panel-block-line)" }} />

        <Node title={p.firm} sub={p.firmSub} />
        <Down />
        <ProductRow name="Next Management">
          <div className="flex items-center justify-between gap-3 text-[12.5px]" style={{ color: "var(--nx-panel-fg-2)" }}>
            <span>Grupo Norvia · {p.nm}</span>
            <span className="font-mono nx-num" style={{ color: "var(--nx-panel-fg)" }}>45 / 31</span>
          </div>
          <div className="nx-bar"><i style={{ width: "68.9%" }} /></div>
        </ProductRow>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section className="pt-6 sm:pt-12 pb-16 lg:pb-24">
      <div className="nx-wrap grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 lg:gap-16 items-center">
        <div className="min-w-0 animate-fade-up">
          <div className="flex flex-wrap gap-2">
            <span className="nx-pill nx-pill-on">{h.badge}</span>
            <span className="nx-pill">{h.pill2}</span>
          </div>
          <h1 className="nx-h1 mt-6 !text-[clamp(40px,5.4vw,74px)]">
            {h.title1}
            <br />
            <span className="nx-grad">{h.titleHighlight}</span>
          </h1>
          <p className="nx-lead mt-6">
            <b>{h.lead}</b> {h.desc}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/productos" className="nx-btn nx-btn-primary nx-focus">
              {h.verProductos}
              <ArrowRight size={17} />
            </Link>
            <Link to="/contacto" className="nx-btn nx-btn-ghost nx-focus">
              {h.hablarEquipo}
            </Link>
            <a href="#familia" className="nx-link nx-focus inline-flex items-center gap-1.5 ml-1 text-[15px]">
              {t.ecosystem.tag}
              <ArrowDown size={15} />
            </a>
          </div>
          <p className="text-[13px] mt-4 nx-muted">{h.note}</p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[520px] pt-6" style={{ borderTop: "1px solid var(--nx-line)" }}>
            {h.stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <div className="font-mono text-[clamp(20px,2.6vw,28px)] font-medium tracking-tight nx-num" style={{ color: "var(--nx-fg)" }}>
                  {s.val}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.06em] mt-1 nx-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 w-full max-w-[540px] lg:max-w-none mx-auto animate-fade-up" style={{ animationDelay: "120ms" }}>
          <EcosystemPanel />
        </div>
      </div>
    </section>
  );
}
