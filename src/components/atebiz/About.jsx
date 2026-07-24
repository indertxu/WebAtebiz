import React from "react";
import { Link } from "react-router-dom";
import { Shield, Zap, LineChart, Lock, MapPin, Building2, Globe, Users, BarChart3, Database, Target, Briefcase, ArrowRight } from "lucide-react";

const highlights = [
  { icon: MapPin, title: "Nacida en Valencia", desc: "Atebiz fue fundada en Valencia, donde arrancó nuestra visión." },
  { icon: Building2, title: "Sede en Madrid", desc: "Nuestras oficinas principales se encuentran en Madrid." },
  { icon: Globe, title: "Partner: Konsolidator", desc: "Alianza tecnológica con Konsolidator, líder danés de consolidación financiera." },
  { icon: Users, title: "+30 años de experiencia", desc: "Un equipo directivo con más de tres décadas en el mercado financiero." },
];

const values = [
  { icon: Zap, title: "Velocidad", desc: "Procesamos millones de registros en segundos, no en horas." },
  { icon: LineChart, title: "Claridad", desc: "Visualizaciones que convierten complejidad en decisión." },
  { icon: Shield, title: "Confianza", desc: "Precisión institucional con auditoría en cada cálculo." },
  { icon: Lock, title: "Seguridad", desc: "Cifrado de nivel bancario y cumplimiento normativo." },
];

const productLine = [
  {
    icon: BarChart3,
    name: "Next Reporting",
    status: "Disponible",
    desc: "Análisis y reporting financiero con IA. Los reportes y auditorías que antes tardaban días ahora salen en segundos.",
  },
  {
    icon: Database,
    name: "Dataworkhouse",
    status: "Próximamente",
    desc: "Almacén de datos financieros con una claridad de números exquisita. Una única fuente de verdad para todo el grupo.",
  },
  {
    icon: Target,
    name: "Planning Financiero",
    status: "Próximamente",
    desc: "Presupuestos, forecasting y escenarios diseñados a la medida de cada cliente y su modelo de negocio.",
  },
  {
    icon: Briefcase,
    name: "Next Management",
    status: "Próximamente",
    desc: "Reporting de gestión y cuadros de mando para ayudar al equipo directivo en la toma de decisiones diaria.",
  },
];

export default function About() {
  return (
    <section id="empresa" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            Sobre Atebiz
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            Construimos la infraestructura de la <span className="text-primary">inteligencia financiera</span> moderna.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Atebiz nació en Valencia de una convicción simple: el análisis financiero no debería ser lento ni opaco.
            Desde aquellos primeros días, hemos crecido hasta establecer nuestras oficinas principales en Madrid,
            donde hoy coordinamos operaciones a nivel internacional.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            De la mano de nuestro partner tecnológico Konsolidator, con sede en Dinamarca y referente europeo en
            consolidación financiera, combinamos ingeniería de primer nivel con un equipo directivo que acumula más
            de 30 años de experiencia en el mercado financiero.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            No somos un único producto: somos una compañía de software financiero que desarrolla un ecosistema
            completo para el CFO moderno — reporting, datos, planificación y gestión — unificado bajo la misma
            marca y el mismo motor.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div key={h.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <h.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="glass-panel glass-panel-hover rounded-2xl p-6 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <v.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Nueva sección: qué vendemos --- */}
      <div className="relative max-w-7xl mx-auto px-6 mt-24 lg:mt-32">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            Qué ofrecemos
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Un ecosistema completo para el <span className="text-primary">CFO moderno</span>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Atebiz vende software financiero especializado. Cuatro productos que resuelven una parte crítica
            del ciclo financiero: reporting, datos, planificación y gestión. Todos comparten la misma filosofía
            de velocidad y claridad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {productLine.map((p) => (
            <div
              key={p.name}
              className="glass-panel rounded-2xl p-7 flex gap-5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <p.icon size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-heading font-semibold text-lg tracking-tight">{p.name}</h3>
                  <span
                    className={`mono text-[10px] px-2.5 py-0.5 rounded-full ${
                      p.status === "Disponible"
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground border border-border"
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/productos"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring"
          >
            Ver todos los productos
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all focus-ring"
          >
            Hablar con el equipo
          </Link>
        </div>
      </div>
    </section>
  );
}