import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";

const DATA_CORE =
  "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/9d6e82ee0_generated_d7e4c5ec.png";

export default function Hero() {
  const { t } = useI18n();
  const coreRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!coreRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      coreRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,133,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="animate-fade-up">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            {t.hero.badge}
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight">
            {t.hero.title1} <span className="text-primary text-glow">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t.hero.desc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/productos"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
            >
              {t.hero.verProductos}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-2xl font-bold text-primary">{s.val}</div>
                <div className="mono text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={coreRef} className="relative transition-transform duration-300 ease-out animate-fade-in">
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
            <Image
              src={DATA_CORE}
              alt="Núcleo de datos Atebiz"
              fittingType="fit"
              className="relative z-10 rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* velocity line */}
      <div className="absolute bottom-0 left-0 right-0 h-px velocity-line animate-pulse-glow" />
    </section>
  );
}