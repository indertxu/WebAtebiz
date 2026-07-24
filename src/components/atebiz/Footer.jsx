import React from "react";
import { Link } from "react-router-dom";

const cols = [
  {
    title: "Productos",
    links: [
      { label: "Next Reporting", to: "/productos" },
      { label: "Velocidad", to: "/velocidad" },
      { label: "Precios", to: "/contacto" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", to: "/empresa" },
      { label: "Contacto", to: "/contacto" },
      { label: "Carreras", to: "/empresa" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal Hub", to: "/legal" },
      { label: "Privacidad", to: "/legal" },
      { label: "Términos", to: "/legal" },
      { label: "Seguridad", to: "/legal" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Atebiz" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-xl tracking-tight">atebiz</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Inteligencia financiera a la velocidad del pensamiento. Software de grado institucional para empresas
              que se mueven rápido.
            </p>
            <div className="text-xs text-muted-foreground mt-6 space-y-1">
              <a href="mailto:info@atebiz.com" className="block hover:text-primary transition-colors">
                info@atebiz.com
              </a>
              <a href="mailto:sales@atebiz.com" className="block hover:text-primary transition-colors">
                sales@atebiz.com
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mono text-xs text-primary/80 mb-4">{c.title.toUpperCase()}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded-md"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px velocity-line opacity-30 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="mono text-xs text-muted-foreground">© 2026 Atebiz. Todos los derechos reservados.</p>
          <p className="mono text-xs text-muted-foreground">Construido con precisión institucional.</p>
        </div>
      </div>
    </footer>
  );
}