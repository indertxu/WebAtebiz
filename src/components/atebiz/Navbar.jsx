import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { useTheme, Wordmark } from "./ui";
import { EASE } from "./fx";

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
          style={lang === l ? { background: "var(--nx-pill-bg)", color: "var(--nx-pill-fg)" } : { color: "var(--nx-fg-3)" }}
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
      className="nx-focus w-[38px] h-[38px] grid place-items-center rounded-[10px] transition-colors overflow-hidden"
      style={{ border: "1px solid var(--nx-line-2)", background: "var(--nx-ghost)", color: "var(--nx-fg)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* Desplegable "Entrar" con los accesos a cada producto */
function SignInMenu({ full = false }) {
  const { t } = useI18n();
  const n = t.navbar;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = [
    { name: "Next Reporting", sub: n.appSub["next-reporting"], href: PRODUCT_LINKS["next-reporting"].app },
    { name: "Next Data", sub: n.appSub["next-data"], href: PRODUCT_LINKS["next-data"].app },
    { name: n.prueba, sub: n.pruebaSub, href: START_TRIAL_URL, trial: true },
  ];

  return (
    <div ref={ref} className={`relative ${full ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`nx-focus inline-flex items-center gap-1.5 h-[38px] px-3.5 rounded-[10px] font-semibold text-[14px] transition-colors ${full ? "w-full justify-between" : ""}`}
        style={{ border: "1px solid var(--nx-line-2)", background: "var(--nx-ghost)", color: "var(--nx-fg)" }}
      >
        {n.entrar}
        <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className={`absolute z-50 mt-2 ${full ? "left-0 right-0" : "right-0 w-[300px]"} nx-card p-2`}
            style={{ boxShadow: "var(--nx-shadow-focus)" }}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <div className="px-3 pt-2 pb-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] nx-muted">{n.entrarTitle}</div>
            {items.map((it) => (
              <a
                key={it.name}
                role="menuitem"
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="nx-focus flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors hover:bg-[var(--nx-sunk)]"
                style={it.trial ? { borderTop: "1px solid var(--nx-line)", marginTop: 4, paddingTop: 12 } : undefined}
              >
                <img src="/logo.png" alt="" width="26" height="26" className={it.trial ? "opacity-60" : ""} />
                <span className="min-w-0">
                  <span className="block font-bold text-[14px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{it.name}</span>
                  <span className="block text-[12.5px] nx-muted">{it.sub}</span>
                </span>
                <ArrowUpRight size={15} className="ml-auto shrink-0" style={{ color: "var(--nx-fg-3)" }} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { label: t.navbar.productos, to: "/productos" },
    { label: t.navbar.velocidad, to: "/velocidad" },
    { label: t.navbar.empresa, to: "/empresa" },
    { label: t.navbar.legal, to: "/legal" },
    { label: t.navbar.contacto, to: "/contacto" },
  ];

  const linkClass = ({ isActive }) =>
    `nx-focus relative text-[14px] font-medium px-3 py-2 rounded-[9px] transition-colors ${isActive ? "" : "hover:bg-[var(--nx-sunk)]"}`;
  const linkStyle = ({ isActive }) => (isActive ? { color: "var(--nx-pill-fg)", background: "var(--nx-pill-bg)" } : { color: "var(--nx-fg-2)" });

  return (
    <header className="sticky z-50 py-3" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="nx-wrap">
        <motion.div
          className="relative flex items-center gap-3 rounded-[18px] py-2 pl-3.5 pr-2"
          animate={{
            boxShadow: scrolled ? "0 18px 40px -24px rgba(6,42,33,.45)" : "0 12px 30px -20px rgba(6,42,33,.18)",
          }}
          style={{
            background: "var(--nx-nav)",
            border: "1px solid var(--nx-line)",
            backdropFilter: "blur(16px) saturate(1.4)",
            WebkitBackdropFilter: "blur(16px) saturate(1.4)",
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
            <div className="hidden md:block"><LangSwitch /></div>
            <ThemeButton />
            <div className="hidden sm:block"><SignInMenu /></div>
            <Link to="/contacto" className="nx-btn nx-btn-primary nx-btn-sm nx-focus hidden sm:inline-flex">
              {t.navbar.demo}
              <ArrowRight size={15} />
            </Link>
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

          {/* Progreso de lectura de la página */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[18px] overflow-hidden">
            <motion.span
              className="absolute left-0 bottom-0 h-[2px] w-full origin-left"
              style={{ scaleX: scrollYProgress, background: "var(--nx-btn)" }}
            />
          </span>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="lg:hidden mt-2 nx-card p-3 grid gap-1"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkClass} style={linkStyle}>
                  {l.label}
                </NavLink>
              ))}
              <div className="grid gap-2 pt-3 mt-2" style={{ borderTop: "1px solid var(--nx-line)" }}>
                <SignInMenu full />
                <div className="flex items-center justify-between gap-3">
                  <LangSwitch />
                  <Link to="/contacto" className="nx-btn nx-btn-primary nx-btn-sm">
                    {t.navbar.demo}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
