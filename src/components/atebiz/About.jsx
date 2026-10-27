import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Globe, LineChart, Lock, MapPin, Shield, Users, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Eyebrow, SectionHead } from "./ui";
import { ProductCta } from "./Ecosystem";

const HIGHLIGHT_ICONS = [MapPin, Building2, Globe, Users];
const VALUE_ICONS = [Zap, LineChart, Shield, Lock];

function PlacesPanel() {
  const { t, lang } = useI18n();
  const hl = t.about.highlights;
  const places = [
    { city: "Valencia", code: "VLC", note: hl[0].title },
    { city: "Madrid", code: "MAD", note: hl[1].title },
    { city: lang === "en" ? "Denmark" : "Dinamarca", code: "DK", note: hl[2].title },
  ];
  return (
    <div className="nx-panel">
      <div className="nx-panel-bar">
        Atebiz
        <span className="nx-panel-tag">{hl[3].title}</span>
      </div>
      <ol className="p-5 grid gap-0">
        {places.map((p, i) => (
          <li key={p.code} className="grid grid-cols-[52px_minmax(0,1fr)] gap-4">
            <div className="flex flex-col items-center">
              <span className="w-[52px] h-[52px] rounded-[14px] grid place-items-center font-mono text-[13px] font-medium" style={{ background: "rgba(16,185,129,.16)", color: "#6EE7B7", border: "1px solid rgba(52,211,153,.3)" }}>
                {p.code}
              </span>
              {i < places.length - 1 && <span className="w-px flex-1 min-h-[22px]" style={{ background: "rgba(52,211,153,.35)" }} />}
            </div>
            <div className="pb-6 pt-1.5 min-w-0">
              <div className="font-bold text-[17px] tracking-tight" style={{ color: "var(--nx-panel-fg)" }}>{p.city}</div>
              <div className="text-[13.5px] mt-0.5" style={{ color: "var(--nx-panel-fg-2)" }}>{p.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  const { t } = useI18n();
  const a = t.about;
  const products = t.ecosystem.products;

  return (
    <>
      <section className="pt-6 sm:pt-12 pb-14">
        <div className="nx-wrap grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-16 items-start">
          <div className="min-w-0">
            <Eyebrow tag={a.tag} />
            <h1 className="nx-h1 mt-5 !text-[clamp(38px,5.4vw,68px)]">
              {a.title1} <span className="nx-grad">{a.titleHighlight}</span> {a.title2}
            </h1>
            <div className="mt-7 grid gap-4 max-w-[64ch]">
              <p className="nx-lead">{a.p1}</p>
              <p className="nx-body text-[16.5px]">{a.p2}</p>
              <p className="nx-body text-[16.5px]">{a.p3}</p>
            </div>
          </div>
          <div className="min-w-0 w-full max-w-[520px] mx-auto lg:mt-10">
            <PlacesPanel />
          </div>
        </div>

        <div className="nx-wrap mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {a.highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i];
            return (
              <div key={h.title} className="nx-soft p-5 flex gap-4 items-start">
                <div className="nx-icon"><Icon size={18} /></div>
                <div className="min-w-0">
                  <h2 className="font-bold text-[15.5px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{h.title}</h2>
                  <p className="nx-body text-[14px] mt-1">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="nx-wrap grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {a.values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <div key={v.title} className="nx-card p-6">
                <div className="nx-icon"><Icon size={19} /></div>
                <h2 className="font-black text-[24px] tracking-[-0.03em] mt-5" style={{ color: "var(--nx-fg)" }}>{v.title}</h2>
                <p className="nx-body text-[15px] mt-1.5">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="nx-wrap">
          <SectionHead
            tag={a.ofrecemosTag}
            title={
              <>
                {a.ofrecemosTitle1} <span className="nx-grad">{a.ofrecemosHighlight}</span>
                {a.ofrecemosTitle2}
              </>
            }
            desc={a.ofrecemosDesc}
          />
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {products.map((p) => (
              <article key={p.key} className="nx-card p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="" width="34" height="34" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-[18px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{p.name}</h3>
                    <span className="font-mono text-[11.5px] uppercase tracking-[0.06em] nx-muted">{p.status}</span>
                  </div>
                </div>
                <p className="nx-body text-[15px] mt-4 flex-1">{p.desc}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <ProductCta product={p} />
                  <Link to={`/productos#${p.key}`} className="nx-link nx-focus text-[14px]">{a.verFicha} →</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/productos" className="nx-btn nx-btn-primary nx-focus">
              {a.verTodos}
              <ArrowRight size={17} />
            </Link>
            <Link to="/contacto" className="nx-btn nx-btn-ghost nx-focus">
              {a.hablarEquipo}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
