import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
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
      className="fixed z-[130] w-[calc(100%-32px)] max-w-[380px] animate-fade-up"
      style={{
        right: "max(16px, env(safe-area-inset-right, 0px))",
        bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
      }}
      role="dialog"
      aria-labelledby="cookie-banner-title"
    >
      <div className="nx-card p-5" style={{ boxShadow: "var(--nx-shadow-focus)" }}>
        <div className="flex items-start gap-3">
          <div className="nx-icon"><Cookie size={18} /></div>
          <div className="min-w-0">
            <h3 id="cookie-banner-title" className="font-bold text-[15.5px] tracking-tight" style={{ color: "var(--nx-fg)" }}>
              {t.cookieBanner.title}
            </h3>
            <p className="nx-body text-[13.5px] mt-1">
              {t.cookieBanner.desc1}{" "}
              <Link to="/legal" className="nx-link !text-[13.5px]">
                {t.cookieBanner.descLink}
              </Link>
              {t.cookieBanner.desc2}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <button type="button" onClick={() => handleChoice("all")} className="nx-btn nx-btn-primary nx-btn-sm nx-focus w-full">
            {t.cookieBanner.aceptarTodas}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => handleChoice("necessary")} className="nx-btn nx-btn-ghost nx-btn-sm nx-focus !text-[13px]">
              {t.cookieBanner.soloNecesarias}
            </button>
            <button type="button" onClick={() => handleChoice("rejected")} className="nx-btn nx-btn-ghost nx-btn-sm nx-focus !text-[13px]">
              {t.cookieBanner.rechazar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
