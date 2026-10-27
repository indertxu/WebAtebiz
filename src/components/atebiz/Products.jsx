import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { Eyebrow, PRODUCT_VISUALS } from "./ui";
import { FinalBand } from "./CTA";

function ProductSection({ product, detail, index }) {
  const { t, lang } = useI18n();
  const pp = t.productsPage;
  const Visual = PRODUCT_VISUALS[product.key];
  const links = PRODUCT_LINKS[product.key];
  const isEven = index % 2 === 1;

  return (
    <section id={product.key} className="py-14 lg:py-20" style={{ borderTop: "1px solid var(--nx-line)" }}>
      <div className="nx-wrap">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div className={`min-w-0 ${isEven ? "lg:order-2" : ""}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="nx-pill nx-pill-on">{product.name}</span>
              <span className="nx-pill">{product.category}</span>
              <span className={`nx-pill ${product.key === "next-management" ? "nx-pill-warn" : ""}`}>{product.status}</span>
            </div>
            <h2 className="nx-h2 mt-5">{product.headline}</h2>
            <p className="nx-lead mt-5">{product.desc}</p>
            {detail.problem && (
              <p className="nx-body mt-4 text-[15.5px] max-w-[62ch] pl-4" style={{ borderLeft: "2px solid var(--nx-warn)" }}>
                {detail.problem}
              </p>
            )}
            <p className="text-[14px] mt-5 nx-muted">
              {t.ecosystem.paraQuien}: <b style={{ color: "var(--nx-fg)" }}>{product.audience}</b>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {links.web ? (
                <a href={links.web} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn-primary nx-focus">
                  {pp.web}
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <Link to="/contacto" className="nx-btn nx-btn-primary nx-focus">
                  {pp.demo}
                  <ArrowRight size={16} />
                </Link>
              )}
              {links.app && (
                <a href={links.app} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn-ghost nx-focus">
                  {pp.app}
                  <ArrowUpRight size={16} />
                </a>
              )}
              {links.web && (
                <Link to="/contacto" className="nx-btn nx-btn-ghost nx-focus">
                  {pp.demo}
                </Link>
              )}
            </div>
          </div>
          <div className={`min-w-0 w-full max-w-[560px] mx-auto lg:max-w-none ${isEven ? "lg:order-1" : ""}`}>
            <Visual lang={lang} />
          </div>
        </div>

        <div className="mt-14">
          <Eyebrow tag={product.name}>{detail.blocksTitle}</Eyebrow>
          {detail.blocks && (
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              {detail.blocks.map((b) => (
                <div key={b.title} className="nx-card p-6">
                  <h3 className="font-bold text-[18px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{b.title}</h3>
                  <p className="nx-body text-[15px] mt-2">{b.desc}</p>
                </div>
              ))}
            </div>
          )}
          {detail.flow && (
            <ol
              className={`mt-5 grid gap-4 ${
                detail.flow.length > 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
              }`}
            >
              {detail.flow.map((s, i) => (
                <li key={s.title} className="nx-card p-5 grid gap-2 content-start">
                  <span
                    className="w-8 h-8 rounded-[10px] grid place-items-center font-mono text-[12px] font-medium text-white"
                    style={{ background: "var(--nx-btn)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-[16.5px] tracking-tight mt-1" style={{ color: "var(--nx-fg)" }}>{s.title}</h3>
                  <p className="nx-body text-[14.5px]">{s.desc}</p>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-6 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4">
          <div className="nx-soft p-6">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] nx-muted">{detail.listTitle}</h3>
            <ul className={`mt-4 grid gap-2.5 text-[15px] ${detail.list.length > 5 ? "sm:grid-cols-2 sm:gap-x-6" : ""}`}>
              {detail.list.map((l) => (
                <li key={l} className="nx-check">{l}</li>
              ))}
            </ul>
          </div>
          <div className="nx-soft p-6 grid gap-5 content-start">
            <div>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] nx-muted">{detail.chipsTitle}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {detail.chips.map((c) => (
                  <span key={c} className="nx-pill nx-pill-on">{c}</span>
                ))}
              </div>
            </div>
            {detail.chipsMore && (
              <div>
                <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] nx-muted">{detail.chipsMoreLabel}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {detail.chipsMore.map((c) => (
                    <span key={c} className="nx-pill">{c}</span>
                  ))}
                </div>
              </div>
            )}
            <p className="nx-body text-[14.5px] pt-4" style={{ borderTop: "1px solid var(--nx-line)" }}>{detail.plans}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  const { t } = useI18n();
  const pp = t.productsPage;
  const products = t.ecosystem.products;

  return (
    <>
      <section className="pt-6 sm:pt-12 pb-12">
        <div className="nx-wrap">
          <Eyebrow tag={pp.tag} />
          <h1 className="nx-h1 mt-5 max-w-[16ch]">{pp.title}</h1>
          <p className="nx-lead mt-6">{pp.desc}</p>
          <nav className="mt-8 grid sm:grid-cols-3 gap-3" aria-label={pp.jump}>
            {products.map((p) => (
              <a key={p.key} href={`#${p.key}`} className="nx-card nx-focus p-4 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                <img src="/logo.png" alt="" width="34" height="34" />
                <span className="min-w-0">
                  <span className="block font-bold text-[16px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{p.name}</span>
                  <span className="block text-[13px] truncate nx-muted">{p.category}</span>
                </span>
                <span className="ml-auto nx-muted" aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {products.map((p, i) => (
        <ProductSection key={p.key} product={p} detail={pp.detail[p.key]} index={i} />
      ))}

      <section className="pb-16 lg:pb-24">
        <div className="nx-wrap">
          <FinalBand />
        </div>
      </section>
    </>
  );
}
