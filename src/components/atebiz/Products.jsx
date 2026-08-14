import React, { useState, useRef, useEffect } from "react";
import { Lock, ArrowRight, Check, ExternalLink, Info } from "lucide-react";
import { Image } from "@/components/ui/image";
import NextReportingFullscreen from "./NextReportingFullscreen";
import { useI18n } from "@/lib/i18n";

const NEXT_REPORTING_PRODUCT_URL = "https://nextreport.atebiz.com/";
const NEXT_REPORTING_WEB_URL = "https://nextreporting.atebiz.com/";

const PRODUCT_META = [
  {
    key: "next-reporting",
    available: true,
    img: "/next-reporting-card.jpg",
    productUrl: NEXT_REPORTING_PRODUCT_URL,
    webUrl: NEXT_REPORTING_WEB_URL,
  },
  {
    key: "dataworkhouse",
    available: false,
    img: "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/de56168b5_generated_c36a29ac.png",
  },
  {
    key: "next-management",
    available: false,
    img: "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/df54ffa7f_generated_c05ad054.png",
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...(rest.style || {}) }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Products() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Combinamos metadatos técnicos con las traducciones
  const products = PRODUCT_META.map((meta, i) => ({
    ...meta,
    ...t.products.products[i],
  }));
  const product = products[active];
  const isNextReporting = product.key === "next-reporting";

  const handleSelectorClick = (idx) => {
    setActive(idx);
    if (products[idx].key === "next-reporting") {
      setShowFullscreen(true);
    }
  };

  return (
    <section id="productos" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-12 max-w-2xl">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            {t.products.tag}
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {t.products.title1} <span className="text-primary">{t.products.titleHighlight}</span> {t.products.title2}
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0">
            {products.map((p, i) => {
              const isActive = i === active;
              const isNR = p.key === "next-reporting";
              return (
                <button
                  key={p.key}
                  onClick={() => handleSelectorClick(i)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all duration-500 focus-ring shrink-0 lg:w-full hover:-translate-y-0.5 ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[0_0_30px_-8px_rgba(0,255,133,0.35)]"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-heading font-semibold text-sm truncate">{p.name}</div>
                      {isNR && <Info size={12} className="text-primary/70 shrink-0" />}
                    </div>
                    {p.available ? (
                      <div className="flex items-center gap-1 text-xs text-primary mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                        {isNR ? t.products.disponibleVer : t.products.disponible}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Lock size={11} />
                        {t.products.proximamente}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <Reveal className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col">
            {isNextReporting ? (
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-secondary group block focus-ring"
                aria-label={t.products.chipIrProducto}
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  fittingType="fill"
                  className="w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/40 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ExternalLink size={13} />
                  <span>{t.products.chipIrProducto}</span>
                </div>
              </a>
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-secondary">
                <Image src={product.img} alt={product.name} fittingType="fill" className="w-full h-full grayscale opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2">
                    <Lock size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{t.products.proximamente}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-heading font-bold text-2xl tracking-tight">{product.name}</h3>
              {product.available ? (
                <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Check size={12} /> {t.products.disponible}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  <Lock size={12} /> {t.products.proximamente}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{product.description}</p>

            <ul className="grid sm:grid-cols-3 gap-3 mb-8">
              {product.features.map((f, idx) => (
                <Reveal
                  as="li"
                  key={f}
                  delay={idx * 100}
                  className={`text-xs rounded-xl px-4 py-3 border transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/60 ${
                    product.available
                      ? "border-primary/20 bg-primary/5 text-foreground"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {f}
                </Reveal>
              ))}
            </ul>

            {product.available ? (
              <div className="flex flex-wrap gap-3">
                <a
                  href={product.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all duration-500 focus-ring overflow-hidden"
                >
                  <span className="shimmer-sweep opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative">{t.products.irWeb}</span>
                  <ExternalLink size={16} className="relative group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setShowFullscreen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
                >
                  <Info size={16} className="text-primary" />
                  {t.products.verFicha}
                </button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {t.products.proxDesc}
              </div>
            )}
          </Reveal>
        </div>
      </div>

      <NextReportingFullscreen
        open={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        revealDelay={0}
      />
    </section>
  );
}
