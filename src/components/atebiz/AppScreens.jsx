import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3, Briefcase, CalendarDays, Database, FileText, Home, Layers, LifeBuoy, LineChart, Settings, Users,
} from "lucide-react";
import { CountUp, EASE, GrowBar } from "./fx";

/* ---------- Marco de aplicación (como "Así se ve, tal cual" de Next Reporting) ---------- */

const SIDEBAR = {
  "next-reporting": [Home, BarChart3, LineChart, Layers, FileText, Settings],
  "next-data": [Home, Database, Layers, LineChart, LifeBuoy, Settings],
  "next-management": [Home, Users, Briefcase, CalendarDays, LifeBuoy, Settings],
};

export function AppFrame({ product, crumbs, right, children, className = "" }) {
  const icons = SIDEBAR[product] || SIDEBAR["next-reporting"];
  return (
    <div className={`nx-panel !rounded-[22px] flex min-w-0 ${className}`}>
      <aside className="hidden sm:flex flex-col items-center gap-2 py-4 px-2.5 shrink-0" style={{ borderRight: "1px solid var(--nx-panel-block-line)" }} aria-hidden="true">
        <img src="/logo.png" alt="" width="26" height="26" className="mb-3" />
        {icons.map((Icon, i) => (
          <span
            key={i}
            className="w-9 h-9 grid place-items-center rounded-[10px]"
            style={i === 0 ? { background: "rgba(16,185,129,.18)", color: "#6EE7B7" } : { color: "var(--nx-panel-fg-3)" }}
          >
            <Icon size={16} />
          </span>
        ))}
      </aside>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3.5 text-[13px]" style={{ borderBottom: "1px solid var(--nx-panel-block-line)" }}>
          {crumbs.map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span style={{ color: "var(--nx-panel-fg-3)" }}>/</span>}
              <span className={i === crumbs.length - 1 ? "font-semibold" : ""} style={{ color: i === crumbs.length - 1 ? "var(--nx-panel-fg)" : "var(--nx-panel-fg-3)" }}>{c}</span>
            </React.Fragment>
          ))}
          <span className="ml-auto flex items-center gap-1.5">{right}</span>
        </div>
        <div className="p-3 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

function Kpi({ label, value, d = 1, suffix = " M €", delta, down = false, locale, delay = 0 }) {
  return (
    <div className="nx-pb !p-3 sm:!p-3.5 min-w-0">
      <div className="nx-lbl truncate">{label}</div>
      <div className="nx-big !text-[clamp(16px,1.7vw,22px)] mt-1.5 whitespace-nowrap">
        <CountUp to={value} decimals={d} suffix={suffix} locale={locale} duration={1.6} />
      </div>
      <motion.span
        className={`nx-chip mt-2 ${down ? "nx-chip-amber" : ""}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + delay, duration: 0.4 }}
      >
        {down ? "▼" : "▲"} {delta}
      </motion.span>
    </div>
  );
}

/* Gráfico de área de 12 meses con dos series */
function AreaChart({ a, b, months, height = 170 }) {
  const reduce = useReducedMotion();
  const w = 600;
  const max = Math.max(...a, ...b) * 1.08;
  const min = Math.min(...a, ...b) * 0.9;
  const pt = (arr) => arr.map((v, i) => [(i / (arr.length - 1)) * w, height - ((v - min) / (max - min)) * height]);
  const path = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const pa = pt(a);
  const pb = pt(b);
  const last = pa[pa.length - 1];
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }} aria-hidden="true">
        {[0.25, 0.5, 0.75].map((y) => (
          <line key={y} x1="0" x2={w} y1={height * y} y2={height * y} stroke="rgba(255,255,255,.06)" />
        ))}
        <motion.path
          d={`${path(pa)} L${w},${height} L0,${height} Z`}
          fill="url(#nrArea)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <defs>
          <linearGradient id="nrArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={path(pb)}
          fill="none"
          stroke="#82A69A"
          strokeWidth="1.6"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.path
          d={path(pa)}
          fill="none"
          stroke="#34D399"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
        />
        <motion.circle
          cx={last[0] - 4}
          cy={last[1]}
          r="5"
          fill="#34D399"
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 380, damping: 14 }}
        />
      </svg>
      <div className="grid grid-cols-12 mt-1.5 font-mono text-[9.5px] sm:text-[10px]" style={{ color: "var(--nx-panel-fg-3)" }}>
        {months.map((m) => (
          <span key={m} className="text-center">{m}</span>
        ))}
      </div>
    </div>
  );
}

const MONTHS = {
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/* ---------- Next Reporting · el mes del grupo ---------- */

export function ReportingScreen({ lang = "es" }) {
  const en = lang === "en";
  const locale = en ? "en-GB" : "es-ES";
  const L = en
    ? { home: "Home", rev: "Revenue", net: "Net result", chart: "Revenue · 12 months", contrib: "Contribution by company", period: "Dec 2025" }
    : { home: "Inicio", rev: "Ingresos", net: "Resultado neto", chart: "Ingresos · 12 meses", contrib: "Aportación por sociedad", period: "dic 2025" };
  const companies = [["Norvia Iberia", 38], ["Norvia UK", 27], ["Norvia Inc.", 19], ["Norvia DK", 11], ["Norvia Holding", 5]];
  return (
    <AppFrame
      product="next-reporting"
      crumbs={["Grupo Norvia", L.home]}
      right={
        <>
          <span className="nx-chip nx-chip-dim">{L.period}</span>
          <span className="nx-chip nx-chip-dim hidden md:inline-flex">Consolidado</span>
          <span className="nx-chip nx-chip-dim hidden md:inline-flex">EUR</span>
        </>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Kpi label={L.rev} value={67.9} delta="8,6 %" locale={locale} />
        <Kpi label="EBITDA" value={12.7} delta="13,0 %" locale={locale} delay={0.08} />
        <Kpi label="EBIT" value={8.9} delta="9,4 %" locale={locale} delay={0.16} />
        <Kpi label={L.net} value={6.1} delta="2,1 %" down locale={locale} delay={0.24} />
      </div>
      <div className="grid md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-2.5 mt-2.5">
        <div className="nx-pb">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[13px] font-semibold" style={{ color: "var(--nx-panel-fg)" }}>{L.chart}</span>
            <span className="flex items-center gap-3 font-mono text-[10.5px]" style={{ color: "var(--nx-panel-fg-3)" }}>
              <span className="flex items-center gap-1.5"><i className="w-3 h-0.5 rounded" style={{ background: "#34D399" }} />2025</span>
              <span className="flex items-center gap-1.5"><i className="w-3 h-0.5 rounded" style={{ background: "#82A69A" }} />2024</span>
            </span>
          </div>
          <AreaChart
            a={[4.9, 5.1, 5.0, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 6.2, 6.5, 6.89]}
            b={[4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.0, 5.3, 5.2, 5.5, 5.7, 6.1]}
            months={MONTHS[en ? "en" : "es"]}
          />
        </div>
        <div className="nx-pb grid gap-2.5 content-start">
          <span className="text-[13px] font-semibold" style={{ color: "var(--nx-panel-fg)" }}>{L.contrib}</span>
          {companies.map(([n, v], i) => (
            <div key={n} className="grid gap-1">
              <div className="flex justify-between text-[12px]" style={{ color: "var(--nx-panel-fg-2)" }}>
                <span className="truncate">{n}</span>
                <span className="font-mono" style={{ color: "var(--nx-panel-fg)" }}>{v} %</span>
              </div>
              <GrowBar pct={(v / 40) * 100} delay={0.4 + i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ---------- Next Data · cierre de octubre ---------- */

const IC = ["HOLD", "IBE", "UK", "MEX", "RET", "INC"];
const IC_BAD = new Set(["1-3", "3-1", "2-4", "4-2"]);

export function DataScreen({ lang = "es" }) {
  const en = lang === "en";
  const L = en
    ? { crumb: "October close", ready: "Ready for the close", of: "companies", ic: "Intercompany · who matches whom", ok: "Matches", rev: "Review", trail: "Data trail", sent: "Sent to Konsolidator", pending: "mapping pending" }
    : { crumb: "Cierre de octubre", ready: "Listas para el cierre", of: "sociedades", ic: "Intercompañía · quién cuadra con quién", ok: "Cuadra", rev: "Revisar", trail: "Rastro del dato", sent: "Enviado a Konsolidator", pending: "mapeo pendiente" };
  const trail = en
    ? [["Consolidated · Revenue", "€67.9M"], ["Norvia Iberia", "€25.8M"], ["7050000 · Sales", "€1.2M"], ["Entry 184223", "€12,500"]]
    : [["Consolidado · Ingresos", "67,9 M €"], ["Norvia Iberia", "25,8 M €"], ["7050000 · Ventas", "1,2 M €"], ["Asiento 184223", "12.500 €"]];
  return (
    <AppFrame
      product="next-data"
      crumbs={["Grupo Norvia", L.crumb]}
      right={<span className="nx-chip nx-live">gold · oct 2026</span>}
    >
      <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-2.5">
        <div className="nx-pb grid gap-2.5 content-start">
          <div className="nx-lbl">{L.ready}</div>
          <div className="nx-big">
            <CountUp to={6} duration={1.2} /> <span className="text-[15px]" style={{ color: "var(--nx-panel-fg-3)" }}>/ 8 {L.of}</span>
          </div>
          <GrowBar pct={75} delay={0.3} />
          <ul className="grid gap-1.5 mt-1 text-[12.5px]" style={{ color: "var(--nx-panel-fg-2)" }}>
            {[["Norvia Iberia", true], ["Norvia UK", true], ["Norvia México", false], ["Norvia Retail", true]].map(([n, ok]) => (
              <li key={n} className="flex items-center justify-between gap-2">
                <span>{n}</span>
                <span className={`nx-chip ${ok ? "" : "nx-chip-amber"}`}>{ok ? "✓" : L.pending}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="nx-pb">
          <div className="text-[12.5px] font-semibold mb-2.5" style={{ color: "var(--nx-panel-fg)" }}>{L.ic}</div>
          <div className="grid gap-1" style={{ gridTemplateColumns: `34px repeat(${IC.length}, minmax(0,1fr))` }}>
            <span />
            {IC.map((c) => (
              <span key={c} className="font-mono text-[9px] text-center" style={{ color: "var(--nx-panel-fg-3)" }}>{c}</span>
            ))}
            {IC.map((r, i) => (
              <React.Fragment key={r}>
                <span className="font-mono text-[9px] self-center" style={{ color: "var(--nx-panel-fg-3)" }}>{r}</span>
                {IC.map((c, j) => {
                  const self = i === j;
                  const bad = IC_BAD.has(`${i}-${j}`);
                  return (
                    <motion.span
                      key={c}
                      className="aspect-square rounded-[5px]"
                      style={{ background: self ? "rgba(255,255,255,.04)" : bad ? "rgba(245,158,11,.55)" : "rgba(16,185,129,.45)" }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i + j) * 0.04, duration: 0.35 }}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="flex gap-4 mt-2.5 font-mono text-[10px]" style={{ color: "var(--nx-panel-fg-3)" }}>
            <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: "rgba(16,185,129,.6)" }} />{L.ok}</span>
            <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-sm" style={{ background: "rgba(245,158,11,.7)" }} />{L.rev}</span>
          </div>
        </div>
      </div>
      <div className="nx-pb mt-2.5">
        <div className="text-[12.5px] font-semibold mb-2.5" style={{ color: "var(--nx-panel-fg)" }}>{L.trail}</div>
        <div className="grid sm:grid-cols-4 gap-2">
          {trail.map(([k, v], i) => (
            <motion.div
              key={k}
              className="rounded-[10px] px-3 py-2.5 relative"
              style={{ background: i === trail.length - 1 ? "rgba(16,185,129,.16)" : "rgba(255,255,255,.04)", border: "1px solid var(--nx-panel-block-line)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.45, ease: EASE }}
            >
              <div className="text-[11.5px] truncate" style={{ color: "var(--nx-panel-fg-3)" }}>{k}</div>
              <div className="font-mono text-[14px] mt-0.5" style={{ color: "var(--nx-panel-fg)" }}>{v}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 mt-3 text-[12px]" style={{ color: "var(--nx-panel-fg-2)" }}>
          <span>{L.sent}</span>
          <span className="font-mono" style={{ color: "#6EE7B7" }}>8 · 307.272</span>
        </div>
      </div>
    </AppFrame>
  );
}

/* ---------- Next Management · embudo y cliente ---------- */

export function ManagementScreen({ lang = "es" }) {
  const en = lang === "en";
  const L = en
    ? {
        crumb: ["Sales", "Consulting pipeline"],
        cols: [["Qualification", "3 · €61,000"], ["Proposal", "2 · €76,750"], ["Negotiation", "1 · €54,000"], ["Won", "Mar · 1"]],
        client: "Client · Grupo Norvia", days: "Days delivered", billing: "Billing · October", impl: "Reporting implementation", train: "User training", adj: "Adjustment · kick-off not billable", base: "Base to invoice", forecast: "Weighted forecast",
      }
    : {
        crumb: ["Ventas", "Embudo consultoría"],
        cols: [["Calificación", "3 · 61.000 €"], ["Propuesta", "2 · 76.750 €"], ["Negociación", "1 · 54.000 €"], ["Ganada", "mar · 1"]],
        client: "Cliente · Grupo Norvia", days: "Días entregados", billing: "Facturación · octubre", impl: "Implantación de reporting", train: "Formación a usuarios", adj: "Ajuste · arranque no facturable", base: "Base a facturar", forecast: "Previsión ponderada",
      };
  const deals = [
    [["Lumen Retail", "22.000 €"], ["Arvo Salud", "39.000 €"]],
    [["Grupo Norvia", "48.750 € · 60 %", true], ["Teral Logística", "28.000 €"]],
    [["Basa Energía", "54.000 € · 80 %"]],
    [["Cima Seguros", "31.500 €"]],
  ];
  return (
    <AppFrame product="next-management" crumbs={L.crumb} right={<span className="nx-chip nx-chip-dim">{L.forecast} · 29.250 €</span>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {L.cols.map(([t, s], i) => (
          <div key={t} className="nx-pb !p-2.5 grid gap-2 content-start">
            <div>
              <div className="text-[12.5px] font-semibold" style={{ color: "var(--nx-panel-fg)" }}>{t}</div>
              <div className="font-mono text-[10.5px]" style={{ color: "var(--nx-panel-fg-3)" }}>{s}</div>
            </div>
            {deals[i].map(([n, v, hl], k) => (
              <motion.div
                key={n}
                className="rounded-[9px] px-2.5 py-2 text-[11.5px]"
                style={{
                  background: hl ? "rgba(16,185,129,.16)" : "rgba(255,255,255,.05)",
                  border: `1px solid ${hl ? "#34D399" : "var(--nx-panel-block-line)"}`,
                  color: "var(--nx-panel-fg-2)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 + k * 0.08, duration: 0.4, ease: EASE }}
              >
                <b className="block font-semibold text-[12px]" style={{ color: "var(--nx-panel-fg)" }}>{n}</b>
                {v}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2.5 mt-2.5">
        <div className="nx-pb grid gap-2 content-start">
          <div className="nx-lbl">{L.client}</div>
          <div className="nx-big">
            <CountUp to={31} duration={1.4} /> <span className="text-[15px]" style={{ color: "var(--nx-panel-fg-3)" }}>/ 45</span>
          </div>
          <div className="text-[12px]" style={{ color: "var(--nx-panel-fg-2)" }}>{L.days}</div>
          <GrowBar pct={68.9} delay={0.4} />
        </div>
        <div className="nx-pb">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[12.5px] font-semibold" style={{ color: "var(--nx-panel-fg)" }}>{L.billing}</span>
            <span className="nx-chip nx-chip-amber">{en ? "Cut-off 31 Oct" : "Corte 31 oct"}</span>
          </div>
          <table className="w-full text-[12px]" style={{ color: "var(--nx-panel-fg-2)" }}>
            <tbody className="font-mono">
              {[[L.impl, "11", "10.450 €"], [L.train, "1", "950 €"], [L.adj, "−0,5", "−475 €"]].map(([c, d, v]) => (
                <tr key={c} style={{ borderTop: "1px solid var(--nx-panel-block-line)" }}>
                  <td className="py-1.5 font-sans truncate max-w-[180px]">{c}</td>
                  <td className="py-1.5 text-right">{d}</td>
                  <td className="py-1.5 text-right">{v}</td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid var(--nx-panel-block-line)", color: "var(--nx-panel-fg)" }}>
                <td className="py-1.5 font-sans font-semibold">{L.base}</td>
                <td className="py-1.5 text-right">11,5</td>
                <td className="py-1.5 text-right font-semibold">10.925 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppFrame>
  );
}

export const APP_SCREENS = {
  "next-reporting": ReportingScreen,
  "next-data": DataScreen,
  "next-management": ManagementScreen,
};
