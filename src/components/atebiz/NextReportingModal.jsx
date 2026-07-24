import React, { useEffect } from "react";
import { X, ArrowRight, Zap, LayoutTemplate, Download, Database, FileBarChart, Clock } from "lucide-react";
import { Image } from "@/components/ui/image";

const IMG = "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/22243a142_generated_6a6a3eef.png";

const features = [
  { icon: Zap, title: "Reportes en 4.2 segundos", desc: "De los datos al reporte ejecutivo en menos de cinco segundos." },
  { icon: LayoutTemplate, title: "Plantillas adaptativas", desc: "Se ajustan automáticamente a tu estructura contable y sector." },
  { icon: Download, title: "Exportación multi-formato", desc: "PDF, Excel y presentación lista para la junta directiva." },
  { icon: FileBarChart, title: "Visualización ejecutiva", desc: "KPIs y tendencias claras para decidir sin rodeos." },
  { icon: Database, title: "Datos consolidados", desc: "Una sola fuente de verdad desde todos tus orígenes." },
  { icon: Clock, title: "Siempre al día", desc: "Reportes en vivo que se actualizan al instante." },
];

const steps = [
  { n: "01", title: "Conecta tus datos", desc: "Vincula tu ERP, banca y contabilidad en segundos." },
  { n: "02", title: "Genera el reporte", desc: "Next Reporting construye el informe ejecutivo automáticamente." },
  { n: "03", title: "Exporta y decide", desc: "Descarga o comparte y toma decisiones al momento." },
];

export default function NextReportingModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative glass-panel rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar animate-modal-enter"
        style={{ animationDelay: "0.15s" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors focus-ring"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[16/7] overflow-hidden animate-content-rise" style={{ animationDelay: "0.3s" }}>
          <Image src={IMG} alt="Next Reporting" fittingType="fill" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Disponible
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">Next Reporting</h2>
            <p className="text-muted-foreground mt-1">Reportes financieros a la velocidad del pensamiento.</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 animate-content-rise" style={{ animationDelay: "0.42s" }}>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Next Reporting convierte tus datos financieros dispersos en reportes ejecutivos claros y listos para
            decidir, en cuestión de segundos. Plantillas inteligentes que se adaptan a tu negocio y exportación
            inmediata en el formato que necesites.
          </p>

          <h3 className="font-heading font-semibold text-lg mb-4">Qué hace</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm mb-1">{f.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-heading font-semibold text-lg mb-4">Cómo funciona</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border p-5">
                <div className="font-heading text-2xl font-bold text-primary mb-2">{s.n}</div>
                <h4 className="font-heading font-semibold text-sm mb-1">{s.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="https://web-reporting-zmdp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring w-full sm:w-fit justify-center"
          >
            Acceder a Next Reporting
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}