import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const START_TRIAL_URL = "https://konsolidator-iberia-reporting.vercel.app/";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: t.navbar.productos, to: "/productos" },
    { label: t.navbar.velocidad, to: "/velocidad" },
    { label: t.navbar.empresa, to: "/empresa" },
    { label: t.navbar.legal, to: "/legal" },
    { label: t.navbar.contacto, to: "/contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitch = ({ compact = false }) => (
    <div className={`flex items-center gap-0.5 p-0.5 rounded-full border border-primary/25 bg-background/40 ${compact ? "" : ""}`}>
      <button
        onClick={() => setLang("es")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold mono tracking-wider transition-all focus-ring ${
          lang === "es" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold mono tracking-wider transition-all focus-ring ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-md">
          <img src="/logo.png" alt="Atebiz" className="w-8 h-8 object-contain" />
          <span className="font-heading font-bold text-xl tracking-tight">atebiz</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm transition-colors focus-ring rounded-md ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <LangSwitch />
          <a
            href={START_TRIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
          >
            {t.navbar.iniciarPrueba}
            <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <button
          className="md:hidden text-foreground focus-ring rounded-md"
          onClick={() => setOpen(!open)}
          aria-label={t.navbar.menu}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass-panel mt-3 mx-4 rounded-2xl p-6 flex flex-col gap-4 animate-fade-up">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex justify-start">
            <LangSwitch />
          </div>
          <a
            href={START_TRIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 text-sm px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-center"
          >
            {t.navbar.iniciarPrueba}
            <ExternalLink size={13} />
          </a>
        </div>
      )}
    </header>
  );
}
