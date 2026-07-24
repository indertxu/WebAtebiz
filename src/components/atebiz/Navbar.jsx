import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Productos", to: "/productos" },
  { label: "Velocidad", to: "/velocidad" },
  { label: "Empresa", to: "/empresa" },
  { label: "Legal", to: "/legal" },
  { label: "Contacto", to: "/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <Link
            to="/contacto"
            className="text-sm px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
          >
            Iniciar prueba
          </Link>
        </div>

        <button
          className="md:hidden text-foreground focus-ring rounded-md"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
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
          <Link
            to="/contacto"
            onClick={() => setOpen(false)}
            className="text-sm px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-center"
          >
            Iniciar prueba
          </Link>
        </div>
      )}
    </header>
  );
}