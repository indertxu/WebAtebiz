import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Brain, LayoutTemplate, FileBarChart, Clock, Sparkles } from "lucide-react";

const metrics = [
  {
    val: "4.2s",
    title: "Auditoría completa",
    desc: "Un análisis financiero profundo que antes tomaba días, ahora en segundos. Next Reporting devuelve tu auditoría lista para revisar en cuestión de un café.",
  },
  {
    val: "0.01%",
    title: "Margen de error",
    desc: "Precisión institucional con doble validación algorítmica. Cada KPI y cada cifra del board pack pasa por controles de coherencia automáticos.",
  },
  {
    val: "3x",
    title: "Velocidad de reporte",
    desc: "Reportes ejecutivos generados tres veces más rápido que el método manual. Menos horas cerrando el mes, más horas decidiendo sobre él.",
  },
  {
    val: "24/7",
    title: "Sincronización en vivo",
    desc: "Los datos consolidados de tu grupo llegan a Next Reporting de forma continua. Al abrir la plataforma, tus KPIs siempre están al día.",
  },
];

const nextReportingHelps = [
  {
    icon: FileBarChart,
    title: "Cierre mensual",
    desc: "El cierre financiero se convierte en un proceso de minutos, no de semanas. Next Reporting encadena consolidado → análisis → board pack sin fricción.",
  },
  {
    icon: LayoutTemplate,
    title: "Board packs y consejos",
    desc: "Genera el pack ejecutivo para el consejo de administración con la misma plantilla, actualizado hasta el último minuto.",
  },
  {
    icon: Brain,
    title: "Análisis con IA",
    desc: "La IA lee tus estados, detecta desviaciones frente a presupuesto, señala anomalías y sugiere comentarios ejecutivos automáticamente.",
  },
  {
    icon: Sparkles,
    title: "Preparación de reuniones",
    desc: "Prepara reuniones con inversores, dirección o auditores en horas en vez de días. La información está lista y validada al momento.",
  },
  {
    icon: Clock,
    title: "Ahorro de tiempo real",
    desc: "El equipo financiero recupera decenas de horas al mes. El tiempo que antes se iba en Excel ahora se dedica a analizar y decidir.",
  },
  {
    icon: Zap,
    title: "Respuesta instantánea",
    desc: "Cuando dirección pregunta, la respuesta ya está. Consultas ad-hoc que antes requerían un día de trabajo se resuelven al instante.",
  },
];

export default function Velocity() {
  return (
    <section id="velocidad" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero de velocidad */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            Velocity Engine · Next Reporting
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            La rapidez no es una promesa. Es una <span className="text-primary">métrica medible</span>.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            <span className="text-foreground">Next Reporting</span> es el motor que devuelve al equipo financiero
            algo que se creía perdido: <span className="text-foreground">tiempo</span>. Cada cuadrante demuestra
            cuán rápido se transforma un dato consolidado en decisión ejecutiva.
          </p>
        </div>

        {/* Métricas */}
        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden mb-24">
          {metrics.map((m) => (
            <div
              key={m.title}
              className="group relative bg-card p-8 lg:p-12 transition-colors duration-500 hover:bg-secondary cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-px velocity-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-heading text-5xl lg:text-6xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                {m.val}
              </div>
              <h3 className="font-heading text-xl font-semibold mt-4 mb-2">{m.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Bloque: en qué te ayuda Next Reporting */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            En qué te ayuda Next Reporting
          </div>
          <h3 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
            Un producto, muchos <span className="text-primary">momentos</span> del ciclo financiero.
          </h3>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Next Reporting no se limita a generar reportes. Facilita al cliente cada una de las etapas donde el
            equipo financiero pierde más tiempo — del cierre a la reunión con dirección.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {nextReportingHelps.map((h) => (
            <div
              key={h.title}
              className="glass-panel rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <h.icon size={20} className="text-primary" />
              </div>
              <h4 className="font-heading font-semibold text-base mb-2 tracking-tight">{h.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center">
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">
            DISPONIBLE HOY
          </div>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-3">
            Empieza por el módulo que ya cambia cierres enteros.
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Next Reporting es el primero de los cuatro productos del ecosistema Atebiz — y ya está en producción.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/productos"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
            >
              Explorar Next Reporting
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
            >
              Solicitar demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
