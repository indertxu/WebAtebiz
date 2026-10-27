import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { PRODUCT_VISUALS, SectionHead } from "./ui";

export function ProductCta({ product, className = "" }) {
  const web = PRODUCT_LINKS[product.key]?.web;
  if (web) {
    return (
      <a href={web} target="_blank" rel="noopener noreferrer" className={`nx-btn nx-btn-primary nx-btn-sm nx-focus ${className}`}>
        {product.cta}
        <ArrowUpRight size={15} />
      </a>
    );
  }
  return (
    <Link to="/contacto" className={`nx-btn nx-btn-primary nx-btn-sm nx-focus ${className}`}>
      {product.cta}
      <ArrowRight size={15} />
    </Link>
  );
}

function FlowStrip() {
  const { t } = useI18n();
  const e = t.ecosystem;
  const p = t.hero.panel;
  const node = (label, product = false) => (
    <span
      className="font-semibold text-[13.5px] px-3 py-2 rounded-[10px] whitespace-nowrap"
      style={
        product
          ? { background: "var(--nx-btn)", color: "#fff", boxShadow: "var(--nx-btn-shadow)" }
          : { border: "1px dashed var(--nx-line-2)", color: "var(--nx-fg-2)" }
      }
    >
      {label}
    </span>
  );
  const arrow = <span aria-hidden="true" style={{ color: "var(--nx-accent)" }}>→</span>;

  return (
    <div className="nx-card mt-6 p-5 sm:p-6 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] gap-6 items-center">
      <div className="min-w-0">
        <div className="nx-eyebrow"><b>{e.flowTitle}</b></div>
        <p className="nx-body mt-3 text-[15px]">{e.flow}</p>
      </div>
      <div className="min-w-0">
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {node(p.erps)}
            {arrow}
            {node("Next Data", true)}
            {arrow}
            {node(p.konso)}
            {arrow}
            {node("Next Reporting", true)}
            {arrow}
            {node(p.board)}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {node(p.firm)}
            {arrow}
            {node("Next Management", true)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ecosystem() {
  const { t, lang } = useI18n();
  const e = t.ecosystem;

  return (
    <section id="familia" className="py-16 lg:py-24">
      <div className="nx-wrap">
        <SectionHead tag={e.tag} title={e.title} desc={e.desc} />

        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {e.products.map((p) => {
            const Visual = PRODUCT_VISUALS[p.key];
            return (
              <article key={p.key} id={`card-${p.key}`} className="nx-card p-3 flex flex-col min-w-0">
                <Visual lang={lang} compact />
                <div className="px-3 pt-5 pb-3 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11.5px] uppercase tracking-[0.06em] nx-muted">{p.category}</span>
                    <span className={`nx-pill ${p.key === "next-management" ? "nx-pill-warn" : "nx-pill-on"} !text-[11px] !py-[5px]`}>{p.status}</span>
                  </div>
                  <h3 className="nx-h3 mt-3">{p.name}</h3>
                  <p className="font-semibold text-[16px] mt-2 leading-snug" style={{ color: "var(--nx-fg)" }}>{p.headline}</p>
                  <p className="nx-body text-[15px] mt-2">{p.desc}</p>
                  <ul className="grid gap-2 mt-4 text-[14.5px]">
                    {p.features.map((f) => (
                      <li key={f} className="nx-check">{f}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                    <ProductCta product={p} />
                    <Link to={`/productos#${p.key}`} className="nx-link nx-focus text-[14px]">
                      {e.verDetalle} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <FlowStrip />
      </div>
    </section>
  );
}
