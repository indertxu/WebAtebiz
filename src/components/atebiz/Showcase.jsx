import React from "react";
import { Image } from "@/components/ui/image";
import { BarChart3, FileSpreadsheet, LineChart, ShieldCheck } from "lucide-react";

const items = [
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    title: "Reportes ejecutivos",
    desc: "Informes financieros claros listos para la junta directiva.",
    icon: FileSpreadsheet,
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    title: "Dashboards en vivo",
    desc: "KPIs y métricas actualizadas en tiempo real para decidir al instante.",
    icon: BarChart3,
  },
  {
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    title: "Análisis de tendencias",
    desc: "Visualiza la evolución de ingresos, costes y márgenes con precisión.",
    icon: LineChart,
  },
  {
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    title: "Auditoría y control",
    desc: "Trazabilidad total y validación algorítmica en cada cálculo.",
    icon: ShieldCheck,
  },
];

export default function Showcase() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            En acción
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Así se ve la <span className="text-primary">inteligencia financiera</span> en marcha.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Desde el reporte ejecutivo hasta el control de auditoría, así es lo que Atebiz pone en manos de tu equipo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group relative rounded-3xl overflow-hidden border border-border bg-card animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fittingType="fill"
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl glass-panel flex items-center justify-center">
                  <item.icon size={18} className="text-primary" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
