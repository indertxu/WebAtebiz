import React, { useEffect } from "react";
import { X, Lock, Timer, Bell, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

/**
 * Modal reutilizable para productos "Próximamente".
 * Muestra icono grande con candado, nombre del producto,
 * descripción, features + mensaje de disponibilidad y CTA a contacto.
 */
export default function ComingSoonModal({ open, onClose, product }) {
  const { t, lang } = useI18n();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  // Textos i18n del modal
  const strings = lang === "en"
    ? {
        badge: "COMING SOON",
        tagline: "This module is on the roadmap",
        finalTag: "STAY IN THE LOOP",
        finalTitle: "Be the first to know when it's live.",
        finalDesc:
          "Get in touch with our team and we'll notify you as soon as this module is available. In the meantime, you can already explore Next Reporting, our first module in production.",
        notify: "Get notified",
        back: "Back to Atebiz",
        whatItSolves: "WHAT IT SOLVES",
        keyFeatures: "KEY FEATURES",
        status: "STATUS",
        statusValue: "In development",
        target: "TARGET USERS",
        targetValue: "Finance leaders · CFO · Controllers",
        footerTag: "ATEBIZ ECOSYSTEM · MODULE COMING SOON",
      }
    : {
        badge: "PRÓXIMAMENTE",
        tagline: "Este módulo está en la hoja de ruta",
        finalTag: "MANTENTE AL DÍA",
        finalTitle: "Sé el primero en saber cuándo llega.",
        finalDesc:
          "Ponte en contacto con nuestro equipo y te avisaremos en cuanto este módulo esté disponible. Mientras tanto, ya puedes explorar Next Reporting, nuestro primer módulo en producción.",
        notify: "Avisarme cuando esté disponible",
        back: "Volver a Atebiz",
        whatItSolves: "QUÉ RESUELVE",
        keyFeatures: "CARACTERÍSTICAS PRINCIPALES",
        status: "ESTADO",
        statusValue: "En desarrollo",
        target: "PENSADO PARA",
        targetValue: "Direcciones financieras · CFO · Controllers",
        footerTag: "ECOSISTEMA ATEBIZ · MÓDULO PRÓXIMAMENTE",
      };

  const Icon = product.icon;

  return (
    <div
      className="fixed inset-0 z-[110] bg-background overflow-y-auto no-scrollbar animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Background decorativo */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,133,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />

      {/* Botón cerrar arriba a la izquierda */}
      <button
        onClick={onClose}
        className="fixed top-6 left-6 z-[10] inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:border-primary/60 transition-all focus-ring group animate-content-rise"
      >
        <ArrowLeft
          size={16}
          className="text-primary group-hover:-translate-x-0.5 transition-transform"
        />
        <span className="text-sm font-medium">{strings.back}</span>
      </button>

      {/* Botón X arriba a la derecha */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[10] w-11 h-11 rounded-full glass-panel border border-primary/30 flex items-center justify-center hover:border-primary/60 transition-all focus-ring animate-content-rise"
        aria-label="Close"
      >
        <X size={18} className="text-primary" />
      </button>

      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-28">
        {/* Hero del producto — candado grande */}
        <div className="text-center mb-16 animate-content-rise">
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Aro exterior pulsante */}
            <div className="absolute inset-0 rounded-3xl bg-primary/15 blur-2xl animate-pulse-glow" />
            {/* Icono del producto */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              {Icon && <Icon size={54} className="text-primary" />}
              {/* Candado superpuesto */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-secondary border border-primary/40 flex items-center justify-center shadow-[0_0_25px_-5px_rgba(0,255,133,0.5)]">
                <Lock size={22} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 mb-5 mono text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
            <Timer size={13} />
            {strings.badge}
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-5">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {strings.tagline}
          </p>
        </div>

        {/* Descripción */}
        <div
          className="glass-panel rounded-3xl p-8 sm:p-10 mb-8 animate-content-rise"
          style={{ animationDelay: "150ms" }}
        >
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-4">
            {strings.whatItSolves}
          </div>
          <p className="text-foreground text-lg leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features + metadatos */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 animate-content-rise" style={{ animationDelay: "300ms" }}>
          <div className="md:col-span-2 glass-panel rounded-2xl p-7">
            <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-5">
              {strings.keyFeatures}
            </div>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="glass-panel rounded-2xl p-5">
              <div className="mono text-[10px] text-primary/80 tracking-wider uppercase mb-2">
                {strings.status}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-glow" />
                <span className="text-sm text-foreground font-medium">
                  {strings.statusValue}
                </span>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5">
              <div className="mono text-[10px] text-primary/80 tracking-wider uppercase mb-2">
                {strings.target}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {strings.targetValue}
              </div>
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div
          className="relative glass-panel rounded-3xl p-8 sm:p-12 overflow-hidden animate-content-rise"
          style={{ animationDelay: "450ms" }}
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-[70px] pointer-events-none" />
          <div className="relative max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Bell size={16} className="text-primary" />
              <span className="mono text-xs text-primary/80 tracking-wider uppercase">
                {strings.finalTag}
              </span>
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-4">
              {strings.finalTitle}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {strings.finalDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contacto"
                onClick={onClose}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
              >
                <Bell size={16} />
                {strings.notify}
              </Link>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
              >
                <ArrowLeft size={16} />
                {strings.back}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mono text-[11px] text-muted-foreground tracking-wider uppercase mt-10">
          {strings.footerTag}
        </p>
      </div>
    </div>
  );
}
