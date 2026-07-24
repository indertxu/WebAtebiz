import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, Check, ShieldCheck, X } from "lucide-react";
import { getConsent, saveConsent, trackVisit } from "@/lib/consent";

/**
 * CookieBanner — tarjeta compacta en la esquina inferior derecha.
 * 3 opciones: Aceptar todas / Solo necesarias / Rechazar.
 * Solo envía datos al Sheet si el usuario pulsa "Aceptar todas".
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const handleChoice = async (status) => {
    saveConsent(status);
    setVisible(false);
    if (status === "all") {
      trackVisit(status);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[130] max-w-sm w-[calc(100%-2rem)] animate-fade-up"
      role="dialog"
      aria-labelledby="cookie-banner-title"
    >
      <div className="glass-panel rounded-2xl border border-primary/25 p-5 shadow-[0_0_40px_-10px_rgba(0,255,133,0.35)]">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
            <Cookie size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              id="cookie-banner-title"
              className="font-heading font-semibold text-base mb-1 tracking-tight"
            >
              Este sitio usa cookies
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Usamos cookies para mejorar tu experiencia. Consulta nuestra{" "}
              <Link to="/legal" className="text-primary hover:underline">
                Política de Cookies
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Buttons stacked vertically for compact card */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleChoice("all")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:glow-emerald transition-all focus-ring"
          >
            <Check size={14} />
            Aceptar todas
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleChoice("necessary")}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-primary/30 text-xs text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
            >
              <ShieldCheck size={12} className="text-primary" />
              Solo necesarias
            </button>
            <button
              onClick={() => handleChoice("rejected")}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-border text-xs hover:border-primary/40 hover:bg-secondary/50 transition-all focus-ring"
            >
              <X size={12} />
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
