import React from "react";
import { ArrowUpRight, Brain, Clock, FileBarChart, LayoutTemplate, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { Eyebrow, SectionHead } from "./ui";

const HELP_ICONS = [FileBarChart, LayoutTemplate, Brain, Sparkles, Clock, Zap];

export default function Velocity() {
  const { t } = useI18n();
  const v = t.velocity;

  return (
    <>
      <section className="pt-6 sm:pt-12 pb-14">
        <div className="nx-wrap">
          <Eyebrow tag={v.tag} />
          <h1 className="nx-h1 mt-5 max-w-[18ch]">
            {v.title1} <span className="nx-grad">{v.titleHighlight}</span>
            {v.title2}
          </h1>
          <p className="nx-lead mt-6">{v.desc}</p>

          <div
            className="mt-12 grid sm:grid-cols-2 gap-px rounded-[22px] overflow-hidden"
            style={{ background: "var(--nx-line)", border: "1px solid var(--nx-line)", boxShadow: "var(--nx-shadow-card)" }}
          >
            {v.metrics.map((m) => (
              <div key={m.title} className="p-7 lg:p-10" style={{ background: "var(--nx-card)" }}>
                <div className="font-mono font-medium tracking-[-0.04em] text-[clamp(44px,6vw,72px)] leading-none nx-grad nx-num">{m.val}</div>
                <h2 className="font-bold text-[20px] tracking-tight mt-5" style={{ color: "var(--nx-fg)" }}>{m.title}</h2>
                <p className="nx-body text-[15.5px] mt-2 max-w-[52ch]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="nx-wrap">
          <SectionHead
            tag={v.ayudaTag}
            title={
              <>
                {v.ayudaTitle1} <span className="nx-grad">{v.ayudaHighlight}</span> {v.ayudaTitle2}
              </>
            }
            desc={v.ayudaDesc}
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {v.helps.map((h, i) => {
              const Icon = HELP_ICONS[i];
              return (
                <div key={h.title} className="nx-card p-6">
                  <div className="nx-icon"><Icon size={19} /></div>
                  <h3 className="font-bold text-[17.5px] tracking-tight mt-4" style={{ color: "var(--nx-fg)" }}>{h.title}</h3>
                  <p className="nx-body text-[15px] mt-1.5">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="nx-wrap">
          <div className="nx-panel p-7 sm:p-12 grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-end">
            <div className="min-w-0">
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] nx-live" style={{ color: "#6EE7B7" }}>{v.ctaTag}</div>
              <h2 className="font-black tracking-[-0.045em] leading-[1.04] mt-4 text-[clamp(28px,3.8vw,44px)] max-w-[22ch]" style={{ color: "var(--nx-panel-fg)" }}>
                {v.ctaTitle}
              </h2>
              <p className="mt-4 text-[16px] max-w-[60ch]" style={{ color: "var(--nx-panel-fg-2)" }}>{v.ctaDesc}</p>
            </div>
            <a href={PRODUCT_LINKS["next-reporting"].web} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn-primary nx-focus">
              {v.explorar}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
