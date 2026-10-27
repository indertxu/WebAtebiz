import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/i18n-translations";
import { Wordmark } from "./ui";

export default function Footer() {
  const { t } = useI18n();
  const sites = [
    ["Next Reporting", PRODUCT_LINKS["next-reporting"].web],
    ["Next Data", PRODUCT_LINKS["next-data"].web],
  ];

  return (
    <footer className="mt-8 pb-10" style={{ borderTop: "1px solid var(--nx-line)" }}>
      <div className="nx-wrap pt-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="min-w-0">
            <Wordmark />
            <p className="nx-body text-[14.5px] mt-4 max-w-[34ch]">{t.footer.tagline}</p>
            <div className="mt-5 grid gap-1.5 font-mono text-[13px]">
              <span className="select-all" style={{ color: "var(--nx-fg-2)" }}>info@atebiz.com</span>
              <span className="select-all" style={{ color: "var(--nx-fg-2)" }}>sales@atebiz.com</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {sites.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="nx-pill nx-focus hover:!border-[var(--nx-line-2)]">
                  {name} <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {t.footer.columns.map((c) => (
            <div key={c.title}>
              <h4 className="font-mono text-[11.5px] uppercase tracking-[0.08em] nx-muted">{c.title}</h4>
              <ul className="mt-4 grid gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="nx-focus text-[14.5px] rounded transition-colors hover:text-[var(--nx-accent)]" style={{ color: "var(--nx-fg-2)" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[12px] nx-muted" style={{ borderTop: "1px solid var(--nx-line)" }}>
          <p>{t.footer.copyright}</p>
          <p>{t.footer.tagline2}</p>
        </div>
      </div>
    </footer>
  );
}
