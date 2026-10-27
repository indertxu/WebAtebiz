import React, { useCallback, useEffect, useState } from "react";
import { CountUp, DrawSpark, GrowBar } from "./fx";

/* ---------- Tema claro / oscuro ---------- */

const THEME_KEY = "atebiz_theme";

export function useTheme() {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d;
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {
        /* sin almacenamiento: el tema dura la sesión */
      }
      return next;
    });
  }, []);

  return { dark, toggle };
}

/* ---------- Marca ---------- */

export function Logo({ size = 32, className = "" }) {
  return <img src="/logo.png" alt="" width={size} height={size} className={`object-contain ${className}`} />;
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo size={34} />
      <span className="font-extrabold text-[19px] tracking-[-0.03em] leading-none" style={{ color: "var(--nx-fg)" }}>
        atebiz
      </span>
    </span>
  );
}

/* ---------- Tipografía y estructura ---------- */

export function Eyebrow({ tag, children, className = "" }) {
  return (
    <div className={`nx-eyebrow ${className}`}>
      {tag && <b>{tag}</b>}
      {children}
    </div>
  );
}

export function SectionHead({ tag, sub, title, desc, className = "", titleAs: T = "h2" }) {
  return (
    <div className={className}>
      <Eyebrow tag={tag}>{sub}</Eyebrow>
      <T className="nx-h2 mt-4 max-w-[20ch]">{title}</T>
      {desc && <p className="nx-lead mt-5">{desc}</p>}
    </div>
  );
}

/* ---------- Visuales de producto (paneles oscuros) ---------- */

function Spark({ points, color = "#34D399", fill = true, height = 56 }) {
  const w = 240;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pad = 4;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((p) => pad + (1 - (p - min) / (max - min || 1)) * (height - pad * 2));
  const d = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const last = { x: xs[xs.length - 1], y: ys[ys.length - 1] };
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }} aria-hidden="true">
      {fill && <path d={`${d} L${w},${height} L0,${height} Z`} fill={color} opacity="0.12" />}
      <path d={d} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="3.5" fill={color} />
    </svg>
  );
}

const NR_REVENUE = [4.9, 5.1, 5.0, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 6.2, 6.5, 6.89];

export function NextReportingVisual({ lang = "es", compact = false }) {
  const L = lang === "en"
    ? { rev: "Revenue", ebitda: "EBITDA", debt: "Net debt / EBITDA", chart: "Group revenue · last 12 months", ex: "Example" }
    : { rev: "Ingresos", ebitda: "EBITDA", debt: "Deuda neta / EBITDA", chart: "Ingresos del grupo · últimos 12 meses", ex: "Ejemplo" };
  return (
    <div className="nx-panel">
      <div className="nx-panel-bar">
        <span style={{ color: "var(--nx-panel-fg-3)", fontWeight: 500 }}>Next Reporting /</span> Grupo Norvia
        <span className="nx-panel-tag">{L.ex}</span>
      </div>
      <div className="p-4 sm:p-5 grid gap-3">
        <div className={`grid gap-2.5 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
          <div className="nx-pb">
            <div className="nx-lbl">{L.rev} · YTD</div>
            <div className="nx-big mt-1.5"><CountUp to={67.9} decimals={1} suffix=" M €" locale={lang === "en" ? "en-GB" : "es-ES"} /></div>
            <span className="nx-chip mt-2">+8,6 %</span>
          </div>
          <div className="nx-pb">
            <div className="nx-lbl">{L.ebitda} · YTD</div>
            <div className="nx-big mt-1.5"><CountUp to={12.7} decimals={1} suffix=" M €" locale={lang === "en" ? "en-GB" : "es-ES"} /></div>
            <span className="nx-chip mt-2">+13,0 %</span>
          </div>
          {!compact && (
            <div className="nx-pb col-span-2 sm:col-span-1">
              <div className="nx-lbl">{L.debt}</div>
              <div className="nx-big mt-1.5"><CountUp to={2.34} decimals={2} suffix="×" locale={lang === "en" ? "en-GB" : "es-ES"} /></div>
              <span className="nx-chip nx-chip-amber mt-2">−0,4</span>
            </div>
          )}
        </div>
        <div className="nx-pb">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[12.5px] font-semibold" style={{ color: "var(--nx-panel-fg)" }}>{L.chart}</span>
            <span className="nx-chip nx-chip-dim">dic · 6,89 M €</span>
          </div>
          <DrawSpark points={NR_REVENUE} height={compact ? 56 : 84} />
        </div>
      </div>
    </div>
  );
}

export function NextDataVisual({ lang = "es", compact = false }) {
  const L = lang === "en"
    ? {
        ex: "Live", rows: "rows", b: "As the ERP delivered it", s: "Clean and checked", g: "With the group's rules",
        aside: "set aside with reason", ready: "Ready for Konsolidator", src: "Sources",
      }
    : {
        ex: "En directo", rows: "filas", b: "Tal cual lo dio el ERP", s: "Limpio y comprobado", g: "Con las reglas del grupo",
        aside: "apartadas con motivo", ready: "Listo para Konsolidator", src: "Orígenes",
      };
  const layers = [
    { k: "BRONZE", t: L.b, v: "353.731", c: "#D89A6A", w: 100 },
    { k: "SILVER", t: L.s, v: "352.527", c: "#C9D6D1", w: 99.66, note: `1.204 ${L.aside}` },
    { k: "GOLD", t: L.g, v: "352.527", c: "#E9C25A", w: 99.66, note: L.ready },
  ];
  return (
    <div className="nx-panel">
      <div className="nx-panel-bar">
        <span style={{ color: "var(--nx-panel-fg-3)", fontWeight: 500 }}>Next Data /</span> {lang === "en" ? "Load" : "Carga"} · oct 2026
        <span className="nx-panel-tag nx-live">{L.ex}</span>
      </div>
      <div className="p-4 sm:p-5 grid gap-2.5">
        {!compact && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="nx-lbl mr-1">{L.src}</span>
            <span className="nx-chip nx-chip-dim">Business Central</span>
            <span className="nx-chip nx-chip-dim">PostgreSQL</span>
            <span className="nx-chip nx-chip-dim">Supabase</span>
          </div>
        )}
        {layers.map((l) => (
          <div key={l.k} className="nx-pb grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 min-w-0">
                <i className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.c }} />
                <span className="nx-lbl" style={{ color: "var(--nx-panel-fg-2)" }}>{l.k}</span>
                <span className="text-[12.5px] truncate" style={{ color: "var(--nx-panel-fg-3)" }}>{l.t}</span>
              </span>
              <span className="font-mono text-[13px] nx-num shrink-0" style={{ color: "var(--nx-panel-fg)" }}>
                {l.v} <span style={{ color: "var(--nx-panel-fg-3)" }}>{L.rows}</span>
              </span>
            </div>
            <GrowBar pct={l.w} color={l.c} />
            {l.note && !compact && (
              <span className="text-[12px]" style={{ color: "var(--nx-panel-fg-3)" }}>{l.note}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function NextManagementVisual({ lang = "es", compact = false }) {
  const L = lang === "en"
    ? {
        crumb: "Clients /", since: "Client since 2 Apr 2026", won: "Won deal", days: "Project · days", sold: "/ 45 sold",
        billed: "Billed", billedSub: "To September · Oct in progress", health: "Account health", renew: "Renewal 2 Apr 2027",
        typed: "Times anyone typed this client", trail: ["Contact", "Deal", "Proposal", "Handover", "Delivery", "Billing", "Account"],
      }
    : {
        crumb: "Clientes /", since: "Cliente desde 2 abr 2026", won: "Oportunidad ganada", days: "Proyecto · días", sold: "/ 45 vendidos",
        billed: "Facturado", billedSub: "Hasta septiembre · oct en curso", health: "Salud de la cuenta", renew: "Renovación 2 abr 2027",
        typed: "Veces que alguien tecleó este cliente", trail: ["Contacto", "Oportunidad", "Propuesta", "Traspaso", "Entrega", "Factura", "Cuenta"],
      };
  return (
    <div className="nx-panel">
      <div className="nx-panel-bar">
        <span style={{ color: "var(--nx-panel-fg-3)", fontWeight: 500 }}>{L.crumb}</span> Grupo Norvia
        <span className="nx-panel-tag">oct 2026</span>
      </div>
      <div className="p-4 sm:p-5 grid gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl grid place-items-center font-extrabold text-[15px] shrink-0" style={{ background: "linear-gradient(135deg,#10B981,#065F46)", color: "#F0FDF7" }}>GN</div>
          <div className="min-w-0">
            <div className="font-bold text-[16px] tracking-tight" style={{ color: "var(--nx-panel-fg)" }}>Grupo Norvia</div>
            <div className="text-[13px]" style={{ color: "var(--nx-panel-fg-3)" }}>{L.since}</div>
          </div>
        </div>
        {!compact && (
          <div className="grid grid-cols-7 gap-1" aria-hidden="true">
            {L.trail.map((s) => (
              <span key={s} className="relative pt-2.5 text-center font-mono text-[9.5px] leading-tight truncate" style={{ color: "var(--nx-panel-fg-3)" }}>
                <i className="absolute top-0 left-0 right-0 h-1 rounded" style={{ background: "#10B981" }} />
                <span className="hidden sm:inline">{s}</span>
              </span>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="nx-pb">
            <div className="nx-lbl">{L.won}</div>
            <div className="nx-big mt-1.5"><CountUp to={48750} suffix=" €" /></div>
          </div>
          <div className="nx-pb">
            <div className="nx-lbl">{L.days}</div>
            <div className="nx-big mt-1.5">31 <span className="text-[14px]" style={{ color: "var(--nx-panel-fg-3)" }}>{L.sold}</span></div>
            <GrowBar pct={68.9} className="mt-2" />
          </div>
          {!compact && (
            <>
              <div className="nx-pb">
                <div className="nx-lbl">{L.billed}</div>
                <div className="nx-big mt-1.5"><CountUp to={18050} suffix=" €" /></div>
                <div className="text-[12px] mt-1" style={{ color: "var(--nx-panel-fg-2)" }}>{L.billedSub}</div>
              </div>
              <div className="nx-pb">
                <div className="nx-lbl">{L.health}</div>
                <div className="nx-big mt-1.5">82<span className="text-[14px]" style={{ color: "var(--nx-panel-fg-3)" }}>/100</span></div>
                <div className="text-[12px] mt-1" style={{ color: "var(--nx-panel-fg-2)" }}>{L.renew}</div>
              </div>
            </>
          )}
        </div>
        {!compact && (
          <div className="flex items-center justify-between gap-3 pt-3 text-[13px]" style={{ borderTop: "1px dashed var(--nx-panel-block-line)", color: "var(--nx-panel-fg-2)" }}>
            <span>{L.typed}</span>
            <b className="font-mono font-medium" style={{ color: "#6EE7B7" }}>1</b>
          </div>
        )}
      </div>
    </div>
  );
}

export const PRODUCT_VISUALS = {
  "next-reporting": NextReportingVisual,
  "next-data": NextDataVisual,
  "next-management": NextManagementVisual,
};

export { Spark };
