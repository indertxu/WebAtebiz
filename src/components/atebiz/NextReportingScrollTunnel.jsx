import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Image } from "@/components/ui/image";

const IMG =
  "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/22243a142_generated_6a6a3eef.png";

/**
 * NextReportingScrollTunnel
 * Túnel controlado por la rueda del ratón.
 * Recibe `depth` de 0 a 1. Interpola todas las capas para simular el viaje.
 *
 * Timeline por depth (aprox):
 *   0.00 – 0.10 → entrada suave (opacity fade-in, scale 1 → 1.5)
 *   0.10 – 0.55 → viaje por el túnel (scale 1.5 → 8, streaks intensifican)
 *   0.55 – 0.80 → hyperspace / punch-through (scale 8 → 30, brightness sube)
 *   0.80 – 0.95 → flash blanco-verde
 *   0.95 – 1.00 → fade a negro absoluto → suelta la presentación
 */
export default function NextReportingScrollTunnel({ depth = 0 }) {
  // Interpolaciones
  const scale = 1 + depth * depth * 40; // curva cuadrática — acelera al final
  const blur = depth < 0.55 ? depth * 8 : (1 - Math.min(1, (depth - 0.55) / 0.3)) * 12;
  const brightness = 1 + depth * depth * 6;
  const imgOpacity = depth < 0.85 ? 1 : Math.max(0, 1 - (depth - 0.85) / 0.1);

  const streakScale = 0.05 + depth * depth * 25;
  const streakRotate = depth * 540;
  const streakOpacity = depth < 0.1 ? depth * 4 : Math.min(1, 0.4 + depth * 0.9) * (depth < 0.9 ? 1 : (1 - depth) * 10);

  const glowScale = 0.2 + depth * depth * 25;
  const glowOpacity = depth < 0.1 ? depth * 5 : depth < 0.85 ? 0.5 + depth * 0.5 : Math.max(0, 1 - (depth - 0.85) / 0.1);

  const vignetteOpacity = depth < 0.7 ? 0.3 + depth * 0.6 : Math.max(0, 0.72 - (depth - 0.7) * 4);

  const chromaOpacity = depth < 0.7 ? depth * 1.2 : Math.max(0, 1 - (depth - 0.7) * 5);

  const flashOpacity = depth < 0.7 ? 0 : depth < 0.9 ? (depth - 0.7) / 0.2 : Math.max(0, 1 - (depth - 0.9) / 0.08);
  const blackOpacity = depth < 0.85 ? 0 : Math.min(1, (depth - 0.85) / 0.15);

  // Fade in/out global del overlay
  const overlayOpacity = depth < 0.05 ? depth / 0.05 : 1;

  return (
    <div
      className="fixed inset-0 z-[115] overflow-hidden pointer-events-none"
      style={{ opacity: overlayOpacity, background: "#000" }}
    >
      {/* Layer 1 — Túnel: imagen escalada con motion blur y brightness */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${scale})`,
          filter: `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(2)})`,
          opacity: imgOpacity,
          transition: "transform 120ms linear, filter 120ms linear, opacity 120ms linear",
        }}
      >
        <Image src={IMG} alt="" fittingType="fill" className="w-full h-full" />
      </div>

      {/* Layer 2 — Aberración cromática (verde/cian) */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: chromaOpacity,
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,255,180,0.3) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(0,200,255,0.2) 0%, transparent 55%)",
          transition: "opacity 120ms linear",
        }}
      />

      {/* Layer 3 — Warp streaks (líneas radiales) */}
      <div
        className="absolute left-1/2 top-1/2 mix-blend-screen will-change-transform"
        style={{
          width: "220vmax",
          height: "220vmax",
          background:
            "repeating-conic-gradient(from 0deg, transparent 0deg, rgba(0,255,133,0.55) 0.4deg, transparent 1.2deg, transparent 3deg, rgba(180,255,220,0.35) 3.2deg, transparent 4deg)",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 3%, black 12%, black 55%, transparent 75%)",
          maskImage:
            "radial-gradient(circle at center, transparent 3%, black 12%, black 55%, transparent 75%)",
          filter: "blur(1.5px)",
          transform: `translate(-50%, -50%) scale(${streakScale.toFixed(3)}) rotate(${streakRotate.toFixed(1)}deg)`,
          opacity: streakOpacity,
          transition: "transform 120ms linear, opacity 120ms linear",
        }}
      />

      {/* Layer 4 — Viñeta radial */}
      <div
        className="absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.95) 100%)",
          transition: "opacity 120ms linear",
        }}
      />

      {/* Layer 5 — Luz central (crece con depth) */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full will-change-transform"
        style={{
          width: "35vmax",
          height: "35vmax",
          background:
            "radial-gradient(circle, rgba(220,255,235,1) 0%, rgba(0,255,133,0.9) 25%, rgba(0,255,133,0.3) 55%, transparent 75%)",
          filter: "blur(30px)",
          transform: `translate(-50%, -50%) scale(${glowScale.toFixed(3)})`,
          opacity: glowOpacity,
          transition: "transform 120ms linear, opacity 120ms linear",
        }}
      />

      {/* Layer 6 — Flash blanco-verde */}
      <div
        className="absolute inset-0"
        style={{
          opacity: flashOpacity,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(180,255,220,1) 30%, rgba(0,255,133,0.8) 60%, rgba(0,80,50,0.4) 100%)",
          transition: "opacity 120ms linear",
        }}
      />

      {/* Layer 7 — Negro final */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: blackOpacity,
          transition: "opacity 120ms linear",
        }}
      />

      {/* Progress bar + hints */}
      <div className="absolute inset-x-0 bottom-0 pb-8 flex flex-col items-center gap-4 pointer-events-none">
        {/* Barra de progreso */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-emerald-300 to-primary transition-all duration-100 ease-linear"
            style={{
              width: `${Math.round(depth * 100)}%`,
              boxShadow: "0 0 12px rgba(0,255,133,0.9)",
            }}
          />
        </div>
        {/* Hint según profundidad */}
        <div
          className="mono text-xs tracking-[0.2em] uppercase text-primary/90 flex items-center gap-2"
          style={{ opacity: depth < 0.85 ? 1 - depth * 0.5 : 0 }}
        >
          {depth < 0.15 && (
            <>
              <ChevronUp size={14} className="animate-bounce" />
              <span>Scroll para entrar en Next Reporting</span>
            </>
          )}
          {depth >= 0.15 && depth < 0.6 && (
            <>
              <ChevronUp size={14} />
              <span>Sigue subiendo · scroll abajo para salir</span>
            </>
          )}
          {depth >= 0.6 && depth < 0.85 && (
            <>
              <ChevronUp size={14} />
              <span>Casi al final del túnel...</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
