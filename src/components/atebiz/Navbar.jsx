import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme, Wordmark } from "./ui";

const START_TRIAL_URL = "https://konsolidator-iberia-reporting.vercel.app/";

function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center p-0.5 rounded-[10px]" style={{ border: "1px solid var(--nx-line-2)", background: "var(--nx-ghost)" }}>
      {["es", "en"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={l === "es" ? "Cambiar a español" : "Switch to English"}
          className="nx-focus px-2.5 py-1.5 rounded-[8px] font-mono text-[11px] font-medium uppercase transition-colors"
          style={
            lang === l
              ? { background: "var(--nx-pill-bg)", color: "var(--nx-pill-fg)" }
              : { color: "var(--nx-fg-3)" }
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ThemeButton() {
  const { dark, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.navbar.tema}
      className="nx-focus w-[38px] h-[38px] grid place-items-center rounded-[10px] transition-colors"
      style={{ border: "1px solid var(--nx-line-2)", background: "var(--nx-ghost)", color: "var(--nx-fg)" }}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { label: t.navbar.productos, to: "/productos" },
    { label: t.navbar.velocidad, to: "/velocidad" },
    { label: t.navbar.empresa, to: "/empresa" },
    { label: t.navbar.legal, to: "/legal" },
    { label: t.navbar.contacto, to: "/contacto" },
  ];

  const linkClass = ({ isActive }) =>
    `nx-focus text-[14px] font-medium px-3 py-2 rounded-[9px] transition-colors ${isActive ? "" : "hover:bg-[var(--nx-sunk)]"}`;
  const linkStyle = ({ isActive }) =>
    isActive ? { color: "var(--nx-pill-fg)", background: "var(--nx-pill-bg)" } : { color: "var(--nx-fg-2)" };

  return (
    <header className="sticky z-50 py-3" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="nx-wrap">
        <div
          className="flex items-center gap-3 rounded-[18px] py-2 pl-3.5 pr-2"
          style={{
            background: "var(--nx-nav)",
            border: "1px solid var(--nx-line)",
            boxShadow: "var(--nx-shadow-card)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <Link to="/" className="nx-focus rounded-md shrink-0" aria-label="Atebiz">
            <Wordmark />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 ml-auto" aria-label="Principal">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} style={linkStyle}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto lg:ml-2">
            <div className="hidden sm:block"><LangSwitch /></div>
            <ThemeButton />
            <a
              href={START_TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nx-btn nx-btn-primary nx-btn-sm nx-focus hidden sm:inline-flex"
            >
              {t.navbar.iniciarPrueba}
              <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              className="nx-focus lg:hidden w-[38px] h-[38px] grid place-items-center rounded-[10px]"
              style={{ border: "1px solid var(--nx-line-2)", background: "var(--nx-ghost)", color: "var(--nx-fg)" }}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={t.navbar.menu}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 nx-card p-3 grid gap-1 animate-fade-up">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} style={linkStyle}>
                {l.label}
              </NavLink>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2" style={{ borderTop: "1px solid var(--nx-line)" }}>
              <LangSwitch />
              <a href={START_TRIAL_URL} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn-primary nx-btn-sm">
                {t.navbar.iniciarPrueba}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
