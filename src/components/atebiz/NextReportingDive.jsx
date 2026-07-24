import React, { useEffect } from "react";
import { Image } from "@/components/ui/image";

const IMG =
  "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/22243a142_generated_6a6a3eef.png";

/**
 * NextReportingDive
 * 5-second cinematic warp through the green tunnel image, then flash & fade-to-black
 * before handing off to the modal.
 *
 * Timeline (see index.css keyframes):
 *   0.0s → 1.5s  Slow acceleration, tunnel begins zooming, streaks fade in
 *   1.5s → 3.7s  Hyperspace: heavy motion blur, speed lines, chromatic edges
 *   3.7s → 4.2s  Bright green→white flash as we punch through the end
 *   4.2s → 5.0s  Fade to black holds, modal handoff on complete
 */
export default function NextReportingDive({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 5000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[120] bg-black overflow-hidden">
      {/* Layer 1 — Tunnel image, hyperspace zoom + motion blur */}
      <div className="absolute inset-0 will-change-transform animate-dive-zoom origin-center">
        <Image src={IMG} alt="" fittingType="fill" className="w-full h-full" />
      </div>

      {/* Layer 2 — Chromatic aberration echoes (subtle green/cyan doubles) */}
      <div
        className="absolute inset-0 mix-blend-screen animate-dive-chroma pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,255,180,0.25) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(0,200,255,0.15) 0%, transparent 55%)",
        }}
      />

      {/* Layer 3 — Warp speed streaks (repeating conic + radial mask) */}
      <div
        className="absolute left-1/2 top-1/2 w-[220vmax] h-[220vmax] animate-dive-streaks pointer-events-none mix-blend-screen will-change-transform"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, transparent 0deg, rgba(0,255,133,0.55) 0.4deg, transparent 1.2deg, transparent 3deg, rgba(180,255,220,0.35) 3.2deg, transparent 4deg)",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 3%, black 12%, black 55%, transparent 75%)",
          maskImage:
            "radial-gradient(circle at center, transparent 3%, black 12%, black 55%, transparent 75%)",
          filter: "blur(1.5px)",
        }}
      />

      {/* Layer 4 — Deepening vignette for tunnel depth */}
      <div
        className="absolute inset-0 animate-dive-vignette pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Layer 5 — Central end-of-tunnel light (grows into the flash) */}
      <div
        className="absolute left-1/2 top-1/2 w-[35vmax] h-[35vmax] rounded-full animate-dive-glow pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(220,255,235,1) 0%, rgba(0,255,133,0.9) 25%, rgba(0,255,133,0.3) 55%, transparent 75%)",
          filter: "blur(30px)",
        }}
      />

      {/* Layer 6 — Full-screen flash (green→white punch-through) */}
      <div
        className="absolute inset-0 animate-dive-flash pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(180,255,220,1) 30%, rgba(0,255,133,0.8) 60%, rgba(0,80,50,0.4) 100%)",
        }}
      />

      {/* Layer 7 — Final fade to pure black, holds until handoff */}
      <div className="absolute inset-0 bg-black animate-dive-fade pointer-events-none" />
    </div>
  );
}
