import React from "react";
import { BarChart3, FileSpreadsheet, LineChart, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHead } from "./ui";

const ICONS = [FileSpreadsheet, BarChart3, LineChart, ShieldCheck];

function ReportMini({ lang }) {
  const rows = lang === "en"
    ? [["Revenue", "67.9", "62.5", "+8.6%"], ["Gross margin", "28.4", "25.9", "+9.7%"], ["EBITDA", "12.7", "11.3", "+13.0%"], ["Net result", "6.1", "6.2", "−2.1%"]]
    : [["Ingresos", "67,9", "62,5", "+8,6 %"], ["Margen bruto", "28,4", "25,9", "+9,7 %"], ["EBITDA", "12,7", "11,3", "+13,0 %"], ["Resultado neto", "6,1", "6,2", "−2,1 %"]];
  return (
    <table className="w-full text-[12.5px]" style={{ color: "var(--nx-panel-fg-2)" }}>
      <thead>
        <tr className="nx-lbl text-left">
          <th className="font-medium pb-2">M €</th>
          <th className="font-medium pb-2 text-right">2025</th>
          <th className="font-medium pb-2 text-right">2024</th>
          <th className="font-medium pb-2 text-right">Δ</th>
        </tr>
      </thead>
      <tbody className="font-mono nx-num">
        {rows.map((r) => (
          <tr key={r[0]} style={{ borderTop: "1px solid var(--nx-panel-block-line)" }}>
            <td className="py-2 font-sans" style={{ color: "var(--nx-panel-fg)" }}>{r[0]}</td>
            <td className="py-2 text-right">{r[1]}</td>
            <td className="py-2 text-right">{r[2]}</td>
            <td className="py-2 text-right" style={{ color: r[3].startsWith("−") ? "#FCA5A5" : "#6EE7B7" }}>{r[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DashMini({ lang }) {
  const bars = [
    ["Norvia Iberia", 38],
    ["Norvia UK", 27],
    ["Norvia Inc.", 19],
    ["Norvia DK", 11],
  ];
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="nx-pb !p-3"><div className="nx-lbl">EBITDA</div><div className="nx-big !text-[18px] mt-1">12,7 M €</div></div>
        <div className="nx-pb !p-3"><div className="nx-lbl">EBIT</div><div className="nx-big !text-[18px] mt-1">8,9 M €</div></div>
      </div>
      <div className="grid gap-2">
        <div className="nx-lbl">{lang === "en" ? "Contribution by company" : "Aportación por sociedad"}</div>
        {bars.map(([n, v]) => (
          <div key={n} className="grid grid-cols-[96px_minmax(0,1fr)_34px] items-center gap-2 text-[12px]" style={{ color: "var(--nx-panel-fg-2)" }}>
            <span className="truncate">{n}</span>
            <span className="nx-bar"><i style={{ width: `${(v / 40) * 100}%` }} /></span>
            <span className="font-mono text-right nx-num" style={{ color: "var(--nx-panel-fg)" }}>{v} %</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendMini() {
  const a = [30, 34, 33, 38, 36, 41, 40, 44, 43, 49, 53, 58];
  const b = [28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41];
  const w = 300;
  const h = 120;
  const toPath = (arr) =>
    arr.map((v, i) => `${i ? "L" : "M"}${((i / (arr.length - 1)) * w).toFixed(1)},${(h - 8 - ((v - 25) / 35) * (h - 16)).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[130px]" preserveAspectRatio="none" aria-hidden="true">
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke="rgba(255,255,255,.07)" />
      ))}
      <path d={`${toPath(a)} L${w},${h} L0,${h} Z`} fill="#34D399" opacity="0.12" />
      <path d={toPath(a)} fill="none" stroke="#34D399" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d={toPath(b)} fill="none" stroke="#82A69A" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function AuditMini({ lang }) {
  const items = lang === "en"
    ? [["ok", "Debits and credits balance per company"], ["ok", "ECB month rates loaded"], ["warn", "November missing in Norvia UK"], ["ok", "Every figure traced to its entry"]]
    : [["ok", "Debe y haber cuadran por sociedad"], ["ok", "Tipos del BCE del mes cargados"], ["warn", "Falta noviembre en Norvia UK"], ["ok", "Cada cifra enlazada a su asiento"]];
  return (
    <ul className="grid gap-2">
      {items.map(([s, txt]) => (
        <li key={txt} className="flex items-center gap-2.5 text-[13px] rounded-[10px] px-3 py-2.5" style={{ background: "var(--nx-panel-block)", border: "1px solid var(--nx-panel-block-line)", color: "var(--nx-panel-fg-2)" }}>
          <span
            className="w-5 h-5 shrink-0 rounded-full grid place-items-center text-[11px] font-bold"
            style={s === "ok" ? { background: "rgba(16,185,129,.2)", color: "#6EE7B7" } : { background: "rgba(245,158,11,.2)", color: "#FCD34D" }}
          >
            {s === "ok" ? "✓" : "!"}
          </span>
          {txt}
        </li>
      ))}
    </ul>
  );
}

const MINIS = [ReportMini, DashMini, TrendMini, AuditMini];

export default function Showcase() {
  const { t, lang } = useI18n();
  const s = t.showcase;

  return (
    <section className="py-16 lg:py-24">
      <div className="nx-wrap">
        <SectionHead
          tag={s.tag}
          title={
            <>
              {s.title1} <span className="nx-grad">{s.titleHighlight}</span> {s.title2}
            </>
          }
          desc={s.desc}
        />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {s.items.map((item, i) => {
            const Icon = ICONS[i];
            const Mini = MINIS[i];
            return (
              <article key={item.title} className="nx-card p-3 flex flex-col">
                <div className="nx-panel !rounded-[18px] !shadow-none flex-1">
                  <div className="nx-panel-bar">
                    <Icon size={15} style={{ color: "#6EE7B7" }} />
                    {item.title}
                    <span className="nx-panel-tag">{s.example}</span>
                  </div>
                  <div className="p-4">
                    <Mini lang={lang} />
                  </div>
                </div>
                <div className="px-3 pt-4 pb-2">
                  <h3 className="font-bold text-[17px] tracking-tight" style={{ color: "var(--nx-fg)" }}>{item.title}</h3>
                  <p className="nx-body text-[15px] mt-1">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
