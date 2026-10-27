import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { EASE } from "./fx";

/* Marca de sección como en Next Reporting: línea vertical + chip "02 · Nombre ↓" */
export function SectionMark({ n }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const label = t.home.sections[n - 1];
  return (
    <div className="flex flex-col items-center gap-0 mb-10 pointer-events-none select-none" aria-hidden="true">
      <motion.span
        className="block w-px h-16 origin-top"
        style={{ background: "linear-gradient(transparent, var(--nx-accent))" }}
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.span
        className="inline-flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 font-semibold text-[13px]"
        style={{ background: "var(--nx-panel-solid, #0B2E24)", color: "#F0FDF7", boxShadow: "var(--nx-btn-shadow)" }}
        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      >
        <span className="w-6 h-6 rounded-full grid place-items-center font-mono text-[11px]" style={{ background: "#34D399", color: "#04261B" }}>
          {String(n).padStart(2, "0")}
        </span>
        {label}
        <ArrowDown size={13} />
      </motion.span>
    </div>
  );
}
