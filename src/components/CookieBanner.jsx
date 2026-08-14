import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, Check, ShieldCheck, X } from "lucide-react";
import { getConsent, saveConsent, trackVisit } from "@/lib/consent";
import { useI18n } from "@/lib/i18n";

export default function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
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
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
            <Cookie size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 id="cookie-banner-title" className="font-heading font-semibold text-base mb-1 tracking-tight">
              {t.cookieBanner.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.cookieBanner.desc1}{" "}
              <Link to="/legal" className="text-primary hover:underline">
                {t.cookieBanner.descLink}
              </Link>
              {t.cookieBanner.desc2}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleChoice("all")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:glow-emerald transition-all focus-ring"
          >
            <Check size={14} />
            {t.cookieBanner.aceptarTodas}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleChoice("necessary")}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-primary/30 text-xs text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
            >
              <ShieldCheck size={12} className="text-primary" />
              {t.cookieBanner.soloNecesarias}
            </button>
            <button
              onClick={() => handleChoice("rejected")}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-border text-xs hover:border-primary/40 hover:bg-secondary/50 transition-all focus-ring"
            >
              <X size={12} />
              {t.cookieBanner.rechazar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
