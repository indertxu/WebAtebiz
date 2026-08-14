import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  FileText,
  FolderOpen,
  Shield,
  ScrollText,
  Lock,
  ChevronRight,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

/* ---------- i18n ---------- */

const I18N = {
  en: {
    tag: "Legal Hub",
    heroTitle: ["Legal and", "compliance documentation", "."],
    heroDesc:
      "All the contracts, policies and agreements that govern the use of the Atebiz platform. Browse, download and share every official document as a PDF.",
    categoryDocs: (n) => `${n} DOCUMENT${n !== 1 ? "S" : ""}`,
    backHub: "Back to Legal Hub",
    viewDoc: "View document",
    pdfBtn: "PDF",
    pages: (n) => `${n} pages`,
    updated: "June 2026",
    bottomTag: "QUESTIONS ABOUT A DOCUMENT?",
    bottomText: (email) => (
      <>
        Our legal team is available to clarify any clause or adapt terms to your
        organisation's needs. Write to us at{" "}
        <a href={`mailto:${email}`} className="text-primary hover:underline">
          {email}
        </a>
        .
      </>
    ),
    modalSubtitle: "ATEBIZ · OFFICIAL DOCUMENT",
    download: "Download",
    close: "Close",
    languageSwitch: "ES",
    languageSwitchAria: "Cambiar a español",
    categories: [
      {
        id: "contratos",
        title: "Contracts and Terms",
        subtitle: "Commercial conditions and professional services",
      },
      {
        id: "privacidad",
        title: "Privacy and Data",
        subtitle: "Personal data protection and cookies",
      },
      {
        id: "seguridad",
        title: "Security",
        subtitle: "Information security policies",
      },
    ],
    docs: {
      terms: {
        title: "Terms and Conditions",
        desc: "General contractual framework for the use of the Atebiz software.",
      },
      services: {
        title: "Professional Services",
        desc: "Specific conditions for consulting, implementation and training services.",
      },
      sla: {
        title: "Service Level Agreement (SLA)",
        desc: "Availability, performance and response time commitments.",
      },
      privacy: {
        title: "Privacy Notice",
        desc: "How we collect, use and protect our users' personal data.",
      },
      dpa: {
        title: "Data Processing Agreement (DPA)",
        desc: "Conditions for the processing of data on behalf of the customer (GDPR compliant).",
      },
      cookies: {
        title: "Cookie Policy",
        desc: "Use of cookies and similar technologies on atebiz.com.",
      },
      infosec: {
        title: "Information Security Policy",
        desc: "Technical and organisational controls to protect Atebiz systems and data.",
      },
    },
  },
  es: {
    tag: "Legal Hub",
    heroTitle: ["Documentación", "legal y de cumplimiento", "."],
    heroDesc:
      "Todos los contratos, políticas y acuerdos que rigen el uso de la plataforma Atebiz. Consulta, descarga y comparte cada documento oficial en formato PDF.",
    categoryDocs: (n) => `${n} DOCUMENTO${n !== 1 ? "S" : ""}`,
    backHub: "Volver al Legal Hub",
    viewDoc: "Ver documento",
    pdfBtn: "PDF",
    pages: (n) => `${n} pág.`,
    updated: "Junio 2026",
    bottomTag: "¿DUDAS SOBRE ALGÚN DOCUMENTO?",
    bottomText: (email) => (
      <>
        Nuestro equipo legal está disponible para aclarar cualquier cláusula o adaptar
        términos a las necesidades de tu organización. Escríbenos a{" "}
        <a href={`mailto:${email}`} className="text-primary hover:underline">
          {email}
        </a>
        .
      </>
    ),
    modalSubtitle: "ATEBIZ · DOCUMENTO OFICIAL",
    download: "Descargar",
    close: "Cerrar",
    languageSwitch: "EN",
    languageSwitchAria: "Switch to English",
    categories: [
      {
        id: "contratos",
        title: "Contratos y Términos",
        subtitle: "Condiciones comerciales y servicios profesionales",
      },
      {
        id: "privacidad",
        title: "Privacidad y Datos",
        subtitle: "Protección de datos personales y cookies",
      },
      {
        id: "seguridad",
        title: "Seguridad",
        subtitle: "Políticas de seguridad de la información",
      },
    ],
    docs: {
      terms: {
        title: "Términos y Condiciones",
        desc: "Marco contractual general para el uso del software Atebiz.",
      },
      services: {
        title: "Servicios Profesionales",
        desc: "Condiciones específicas para servicios de consultoría, implementación y formación.",
      },
      sla: {
        title: "Acuerdo de Nivel de Servicio (SLA)",
        desc: "Compromisos de disponibilidad, rendimiento y tiempos de respuesta.",
      },
      privacy: {
        title: "Política de Privacidad",
        desc: "Cómo recopilamos, usamos y protegemos los datos personales de nuestros usuarios.",
      },
      dpa: {
        title: "Acuerdo de Tratamiento de Datos (DPA)",
        desc: "Condiciones para el procesamiento de datos en nombre del cliente (compatible con RGPD).",
      },
      cookies: {
        title: "Política de Cookies",
        desc: "Uso de cookies y tecnologías similares en atebiz.com.",
      },
      infosec: {
        title: "Política de Seguridad de la Información",
        desc: "Controles técnicos y organizativos para proteger los sistemas y datos de Atebiz.",
      },
    },
  },
};

/* ---------- Structure of documents (idiomas y ficheros por documento) ---------- */

const DOCS = {
  contratos: [
    { id: "terms",    icon: FileText, file: "Atebiz_Terms_and_Conditions.pdf",         pages: 16 },
    { id: "services", icon: FileText, file: "Atebiz_Professional_Services_Terms.pdf", pages: 11 },
    { id: "sla",      icon: FileText, file: "Atebiz_SLA.pdf",                          pages: 5 },
  ],
  privacidad: [
    { id: "privacy", icon: FileText, file: "Atebiz_Privacy_Notice.pdf", pages: 7 },
    { id: "dpa",     icon: FileText, file: "Atebiz_DPA.pdf",            pages: 11 },
    { id: "cookies", icon: FileText, file: "Atebiz_Cookies_Policy.pdf", pages: 6 },
  ],
  seguridad: [
    { id: "infosec", icon: FileText, file: "Atebiz_Information_Security_Policy.pdf", pages: 9 },
  ],
};

const CATEGORY_ICONS = {
  contratos: ScrollText,
  privacidad: Lock,
  seguridad: Shield,
};

const CATEGORY_ACCENTS = {
  contratos: "from-emerald-400/20 to-emerald-500/5",
  privacidad: "from-cyan-400/20 to-cyan-500/5",
  seguridad: "from-lime-400/20 to-lime-500/5",
};

// Ruta al PDF según idioma seleccionado
const getFilePath = (file, lang) =>
  lang === "es" ? `/legal/es/${file}` : `/legal/${file}`;

/* ---------- Component ---------- */

export default function LegalHub() {
  // Sincronizamos el idioma inicial de los PDFs con el idioma global de la web,
  // pero cada tarjeta mantiene después su propio toggle interno independiente.
  const { lang: globalLang } = useI18n();
  const [openCategory, setOpenCategory] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  const t = I18N[globalLang] || I18N.es;
  const lang = globalLang;

  return (
    <section className="relative pt-40 pb-24 overflow-hidden min-h-screen">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,133,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-medium text-primary/80 tracking-[0.15em] uppercase mb-4 mono">
            {t.tag}
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-5">
            {t.heroTitle[0]}{" "}
            <span className="text-primary text-glow">{t.heroTitle[1]}</span>
            {t.heroTitle[2]}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.heroDesc}
          </p>
        </div>

        {/* Categories grid */}
        {!openCategory && (
          <div className="grid md:grid-cols-3 gap-6">
            {t.categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id];
              const accent = CATEGORY_ACCENTS[cat.id];
              const docCount = DOCS[cat.id].length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setOpenCategory(cat.id)}
                  className="group relative glass-panel rounded-3xl p-8 text-left hover:-translate-y-1 transition-all duration-500 focus-ring overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2 tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {cat.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="mono text-xs text-primary/80">
                        {t.categoryDocs(docCount)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Opened category — documents list */}
        {openCategory && (
          <CategoryDetail
            t={t}
            lang={lang}
            categoryId={openCategory}
            onBack={() => setOpenCategory(null)}
            onPreview={setPreviewDoc}
          />
        )}

        {/* Bottom note */}
        <div className="mt-20 glass-panel rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-center">
          <div className="mono text-xs text-primary/80 tracking-wider uppercase mb-3">
            {t.bottomTag}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t.bottomText("info@atebiz.com")}
          </p>
        </div>
      </div>

      {previewDoc && <PreviewModal t={t} doc={previewDoc} onClose={() => setPreviewDoc(null)} />}
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function CategoryDetail({ t, lang, categoryId, onBack, onPreview }) {
  const category = t.categories.find((c) => c.id === categoryId);
  const docs = DOCS[categoryId];
  return (
    <div className="animate-fade-up">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 focus-ring rounded-md"
      >
        <ArrowLeft size={16} />
        {t.backHub}
      </button>

      <div className="flex items-start gap-5 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <FolderOpen className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-3xl tracking-tight mb-1">
            {category.title}
          </h2>
          <p className="text-muted-foreground">{category.subtitle}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <DocCard
            key={doc.id}
            doc={doc}
            t={t}
            initialLang={lang}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Tarjeta individual de documento con su PROPIO toggle ES/EN.
 * Cada tarjeta recuerda el idioma seleccionado independientemente.
 */
function DocCard({ doc, t, initialLang, onPreview }) {
  const [cardLang, setCardLang] = useState(initialLang);
  const meta = t.docs[doc.id];
  const filePath = getFilePath(doc.file, cardLang);

  return (
    <div className="group glass-panel rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5">
      {/* Header con icono y toggle idioma */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-lg leading-tight tracking-tight mb-1">
              {meta.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mono flex-wrap">
              <span>PDF</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{t.pages(doc.pages)}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{t.updated}</span>
            </div>
          </div>
        </div>

        {/* Toggle idioma dentro de la tarjeta */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-full border border-primary/25 bg-background/40 shrink-0">
          <button
            onClick={() => setCardLang("es")}
            aria-label="Ver en castellano"
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold mono tracking-wider transition-all focus-ring ${
              cardLang === "es"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🇪🇸 ES
          </button>
          <button
            onClick={() => setCardLang("en")}
            aria-label="View in English"
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold mono tracking-wider transition-all focus-ring ${
              cardLang === "en"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {meta.desc}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onPreview({ ...doc, ...meta, file: filePath })}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 text-sm text-foreground hover:border-primary hover:bg-primary/10 transition-all focus-ring"
        >
          {t.viewDoc}
        </button>
        <a
          href={filePath}
          download
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:glow-emerald transition-all focus-ring"
        >
          <Download size={15} />
          {t.pdfBtn}
        </a>
      </div>
    </div>
  );
}

function PreviewModal({ t, doc, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[85vh] bg-card rounded-3xl border border-border overflow-hidden flex flex-col animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-heading font-semibold text-base truncate">
                {doc.title}
              </div>
              <div className="mono text-[10px] text-muted-foreground tracking-wider">
                {t.modalSubtitle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={doc.file}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:glow-emerald transition-all focus-ring"
            >
              <Download size={14} />
              {t.download}
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors focus-ring"
              aria-label={t.close}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-secondary/30">
          <iframe src={doc.file} title={doc.title} className="w-full h-full border-0" />
        </div>
      </div>
    </div>
  );
}
