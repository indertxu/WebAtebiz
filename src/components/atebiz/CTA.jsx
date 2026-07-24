import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section id="contacto" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(rgba(0,255,133,0.3) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
          Empieza hoy
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
          Inicia tu prueba de <span className="text-primary text-glow">Atebiz</span> ahora.
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Comienza tu prueba en menos de tres segundos. Sin tarjeta, sin fricción.
        </p>

        <div className="glass-panel rounded-2xl p-2 max-w-xl mx-auto">
          {sent ? (
            <div className="flex items-center justify-center gap-3 px-4 py-4 text-primary">
              <Check size={20} />
              <span className="text-sm font-medium">
                Acceso enviado a {email}. Revisa tu correo para continuar.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm py-4 px-4 focus-ring rounded-md"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring shrink-0"
              >
                Empezar
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}