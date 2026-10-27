/**
 * Traducciones ES/EN de la web Atebiz.
 *
 * Los textos originales siguen en ./i18n-legacy.js (Velocidad, Contacto,
 * cookies, etc.). Aquí se sobrescriben solo las secciones que cambian con el
 * rediseño y se añade la familia Next completa: Next Reporting, Next Data y
 * Next Management.
 */
import { TRANSLATIONS as LEGACY } from "./i18n-legacy";

export const PRODUCT_LINKS = {
  "next-reporting": { web: "https://nextreporting.atebiz.com/", app: "https://nextreport.atebiz.com/" },
  "next-data": { web: "https://nextdata.atebiz.com/" },
  "next-management": { web: null },
};

/* ------------------------------------------------------------------ ES */

const esProducts = [
  {
    key: "next-reporting",
    name: "Next Reporting",
    status: "Disponible",
    category: "Reporting financiero",
    audience: "Direcciones financieras de grupos",
    headline: "El cierre del grupo, en horas y no en días.",
    desc:
      "Recibe la contabilidad de cada sociedad, la cuadra, la pasa a la divisa del grupo y te la devuelve en informes, KPIs y presentaciones para dirección. Sin un Excel de por medio.",
    features: ["Del consolidado al asiento", "Tipos de cambio del BCE, solos", "Presentaciones listas para el consejo"],
    cta: "Ver Next Reporting",
  },
  {
    key: "next-data",
    name: "Next Data",
    status: "Disponible",
    category: "Data warehouse financiero",
    audience: "Equipos de finanzas y de datos",
    headline: "Cada sociedad, cada ERP, un solo mayor.",
    desc:
      "Lee tus ERPs, guarda una historia limpia de cada apunte y entrega a Konsolidator datos listos para consolidar: cuadrados, conciliados y trazables. En tu propia nube.",
    features: ["Bronze, silver y gold en tu nube", "Conectores de solo lectura", "Mapeos propuestos con IA"],
    cta: "Ver Next Data",
  },
  {
    key: "next-management",
    name: "Next Management",
    status: "Demo bajo petición",
    category: "Gestión de firmas de servicios",
    audience: "Consultoras y firmas de servicios",
    headline: "Cada oportunidad, proyecto y cliente. En un solo sitio.",
    desc:
      "Ventas, entrega, facturación y customer success en un solo espacio de trabajo, para firmas que venden el tiempo de su gente. Un registro por cliente, del primer contacto a la próxima renovación.",
    features: ["Embudos de venta y propuestas con IA", "Días reservados que llegan a Outlook", "Facturación por periodo, con cortes"],
    cta: "Pide una demo",
  },
];

const es = {
  ...LEGACY.es,
  navbar: {
    ...LEGACY.es.navbar,
    tema: "Cambiar tema",
    hablar: "Hablar con el equipo",
  },
  hero: {
    badge: "Atebiz",
    pill2: "Software financiero · Familia Next",
    title1: "Inteligencia financiera",
    titleHighlight: "a la velocidad del pensamiento.",
    lead: "Software para equipos que no quieren depender de hojas de cálculo rotas.",
    desc:
      "Atebiz es una compañía de software financiero que desarrolla un ecosistema de productos para equipos de finanzas exigentes: reporting, datos y gestión, con la velocidad y la precisión de un motor institucional.",
    verProductos: "Ver productos",
    hablarEquipo: "Hablar con el equipo",
    note: "Te respondemos en menos de 24 h. Sin compromiso.",
    stats: LEGACY.es.hero.stats,
    panel: {
      title: "Familia Next",
      tag: "en producción",
      erps: "Tus ERPs",
      erpsSub: "Business Central · SQL",
      konso: "Konsolidator",
      konsoSub: "Consolidación",
      board: "Dirección y consejo",
      boardSub: "Informes · KPIs · .pptx",
      firm: "Tu firma de servicios",
      firmSub: "Ventas · entrega · facturación",
      nd: "Apuntes limpios y comprobados",
      nr: "Ingresos del grupo · YTD",
      nm: "Días vendidos / entregados",
    },
  },
  ecosystem: {
    tag: "La familia Next",
    title: "Tres productos. Una misma forma de trabajar.",
    desc:
      "Cada producto resuelve una parte crítica del ciclo: los datos de cada sociedad, el reporting del grupo y la operación de las firmas que venden horas. Todos comparten diseño, seguridad y equipo.",
    products: esProducts,
    flowTitle: "Cómo encajan",
    flow:
      "Next Data lee los ERPs y prepara los datos. Konsolidator consolida. Next Reporting lo convierte en informes para dirección. Next Management lleva la operación de las firmas de servicios, del primer contacto a la factura.",
    verDetalle: "Ver en detalle",
    paraQuien: "Para",
  },
  showcase: {
    tag: "En acción",
    title1: "Así se ve la",
    titleHighlight: "inteligencia financiera",
    title2: "en marcha.",
    desc:
      "Desde el reporte ejecutivo hasta el control de auditoría, así es lo que Atebiz pone en manos de tu equipo.",
    items: LEGACY.es.showcase.items,
    example: "Ejemplo",
  },
  cta: {
    ...LEGACY.es.cta,
    pillars: [
      LEGACY.es.cta.pillars[0],
      { title: "Un solo ecosistema", desc: "Reporting, datos y gestión con el mismo diseño, la misma seguridad y el mismo equipo detrás." },
      LEGACY.es.cta.pillars[2],
    ],
  },
  about: {
    ...LEGACY.es.about,
    p3:
      "No somos un único producto: somos una compañía de software financiero que desarrolla la familia Next (reporting, datos y gestión) bajo la misma marca, el mismo diseño y la misma exigencia.",
    ofrecemosDesc:
      "Atebiz vende software financiero especializado. Tres productos que resuelven una parte crítica del ciclo: reporting, datos y gestión. Todos comparten la misma filosofía de velocidad y claridad.",
    productLine: esProducts.map((p) => ({ name: p.name, status: p.status, desc: p.desc })),
    verFicha: "Ver ficha",
  },
  velocity: {
    ...LEGACY.es.velocity,
    ctaDesc: "Next Reporting fue el primer producto de la familia Next y ya cierra meses de grupos enteros. Next Data y Next Management siguen el mismo camino.",
  },
  productsPage: {
    tag: "Productos",
    title: "La familia Next, por dentro.",
    desc:
      "Tres productos con el mismo diseño, la misma seguridad y el mismo equipo detrás. Elige el que encaja con tu equipo, o combínalos.",
    jump: "Ir a",
    demo: "Pide una demo",
    web: "Ver la web del producto",
    app: "Entrar al producto",
    detail: {
      "next-reporting": {
        blocksTitle: "Las tres preguntas de cada cierre",
        blocks: [
          { title: "Cómo vamos", desc: "Ingresos, EBITDA, EBIT y resultado contra el mes anterior o el año pasado. Del grupo, de un holding o de una sociedad." },
          { title: "Qué no cuadra", desc: "La sociedad que no ha cargado, el archivo repetido, el debe que no casa con el haber o la cuenta sin mapear. Antes de que llegue al informe." },
          { title: "De dónde sale", desc: "Toca cualquier importe y baja a la cuenta local y al asiento: fecha, número, concepto, contraparte y dimensiones." },
        ],
        listTitle: "Lo que pasa en cada carga",
        list: [
          "Una sola versión vigente por sociedad, escenario y mes: volver a cargar sustituye, nunca suma.",
          "Debe y haber cuadran por sociedad, con avisos de meses que faltan y archivos repetidos.",
          "Tipos de cambio del BCE: cierre para el balance, medio y medio acumulado para resultados.",
          "Queda registrado quién cargó, cuándo, desde qué archivo y con qué resultado.",
        ],
        chipsTitle: "Por dónde entran los datos",
        chips: ["Konsolidator", "Excel o CSV", "API", "Data Warehouse"],
        plans: "Tres planes, Base, Pro y Enterprise, según de dónde entren tus datos. Los informes son los mismos en todos.",
      },
      "next-data": {
        blocksTitle: "Tres capas. Ningún dato se pierde por el camino.",
        flow: [
          { title: "Bronze · Tal como lo dio el ERP", desc: "Guarda exactamente lo que entregó cada ERP, con la fecha de cada carga. Cualquier cifra pasada se puede reconstruir." },
          { title: "Silver · Limpio y comprobado", desc: "Tipos, duplicados, debe igual a haber, cada fila contada. Lo que no encaja se aparta con su motivo; nunca se borra en silencio." },
          { title: "Gold · Con las reglas de tu grupo", desc: "Mapeo de sociedades, plan de cuentas, dimensiones, contraparte y divisa. Konsolidator, las pantallas de análisis y cualquier BI leen de gold." },
        ],
        listTitle: "Por qué un warehouse",
        list: [
          "El cierre deja de empezar exportando balances de cada ERP a mano.",
          "Las diferencias intercompañía aparecen antes, entre ERPs, hasta el asiento.",
          "La historia no se pierde cuando el ERP purga o sobrescribe.",
          "La IA propone mapeos y explica descuadres; nada entra sin que una persona lo confirme.",
        ],
        chipsTitle: "Conectores",
        chips: ["Business Central", "PostgreSQL", "Supabase", "Otras bases SQL"],
        chipsMore: ["SAP Business One", "Sage", "Odoo", "a3ERP", "Holded", "NetSuite"],
        chipsMoreLabel: "En el catálogo",
        plans: "El warehouse vive en el proyecto de nube de tu empresa, Google Cloud o Microsoft Fabric, en la UE por defecto.",
      },
      "next-management": {
        problem:
          "En una firma de servicios el mismo cliente se teclea cuatro veces: en el CRM cuando es una oportunidad, en una hoja de cálculo cuando pasa a proyecto, en el fichero de horas cada semana y otra vez en la factura. Nadie ve la foto completa, y el dinero se escapa por los huecos.",
        blocksTitle: "Un cliente recorre toda la firma sin volver a teclearse",
        flow: [
          { title: "Contacto y empresa", desc: "Se capturan, se importan o se recortan desde LinkedIn." },
          { title: "Oportunidad", desc: "Avanza por el embudo de ventas propio de la firma, con su probabilidad y su previsión." },
          { title: "Propuesta", desc: "Se genera desde el catálogo de productos y la plantilla de la firma, con ayuda de IA en el texto." },
          { title: "Traspaso", desc: "La oportunidad ganada se convierte en cliente, productos y proyectos, con los días que se vendieron." },
          { title: "Entrega", desc: "Los consultores reservan sus días en el calendario y aparecen en su Outlook." },
          { title: "Facturación", desc: "Se construye con esos días por periodo, con fechas de corte y ajustes." },
          { title: "Customer success", desc: "Sigue la salud de la cuenta, renovaciones, ventas adicionales y tickets de soporte." },
        ],
        listTitle: "Lo que incluye",
        list: [
          "Embudos de venta configurables, previsión y propuestas con ayuda de IA.",
          "Traspaso de venta a entrega con los días y productos vendidos.",
          "Reserva de tiempo sincronizada con Outlook y Teams.",
          "Facturación por periodo, con cortes y ajustes.",
          "Mostrador de tickets compartido, alimentado por tu buzón de soporte.",
          "Customer success: salud, renovaciones y ventas adicionales.",
          "Niveles de seguridad y acceso a páginas por departamento.",
          "Alojado en la UE, Microsoft 365 con mínimo privilegio.",
        ],
        chipsTitle: "Módulos",
        chips: ["Inicio", "Contactos y empresas", "Ventas", "Marketing", "Clientes", "Customer success", "Proyectos", "Calendario", "Tickets y tareas", "Dirección", "Configuración"],
        chipsMoreLabel: "Funciona con",
        chipsMore: ["Calendario de Outlook", "Correo de Outlook", "Teams", "LinkedIn", "Excel y CSV", "IA"],
        plans: "Sustituye el mosaico habitual de CRM, hojas de cálculo para horas y facturación, buzón compartido y calendario.",
      },
    },
  },
  footer: {
    ...LEGACY.es.footer,
    columns: [
      {
        title: "Productos",
        links: [
          { label: "Next Reporting", to: "/productos#next-reporting" },
          { label: "Next Data", to: "/productos#next-data" },
          { label: "Next Management", to: "/productos#next-management" },
          { label: "Velocidad", to: "/velocidad" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { label: "Sobre nosotros", to: "/empresa" },
          { label: "Contacto", to: "/contacto" },
          { label: "Precios", to: "/contacto" },
        ],
      },
      LEGACY.es.footer.columns[2],
    ],
  },
};

/* ------------------------------------------------------------------ EN */

const enProducts = [
  {
    key: "next-reporting",
    name: "Next Reporting",
    status: "Available",
    category: "Financial reporting",
    audience: "Group finance teams",
    headline: "Close the group in hours, not days.",
    desc:
      "It takes each company's accounts, balances them, converts them to the group currency and hands them back as reports, KPIs and board presentations. No spreadsheet in between.",
    features: ["From consolidated figure to journal entry", "ECB exchange rates, automatically", "Board-ready presentations"],
    cta: "See Next Reporting",
  },
  {
    key: "next-data",
    name: "Next Data",
    status: "Available",
    category: "Financial data warehouse",
    audience: "Finance and data teams",
    headline: "Every company, every ERP, one ledger.",
    desc:
      "It reads your ERPs, keeps a clean history of every entry and hands Konsolidator data ready to consolidate: balanced, reconciled and traceable. In your own cloud.",
    features: ["Bronze, silver and gold in your cloud", "Read-only connectors", "AI-proposed mappings"],
    cta: "See Next Data",
  },
  {
    key: "next-management",
    name: "Next Management",
    status: "Demo on request",
    category: "Services firm operations",
    audience: "Consultancies and services firms",
    headline: "Every deal, project and client. One place.",
    desc:
      "Sales, delivery, billing and customer success in one workspace, built for firms that sell their people's time. One record per client, from the first contact to the next renewal.",
    features: ["Sales pipelines and AI-assisted proposals", "Booked days that land in Outlook", "Billing per period, with cut-offs"],
    cta: "Book a demo",
  },
];

const en = {
  ...LEGACY.en,
  navbar: {
    ...LEGACY.en.navbar,
    tema: "Toggle theme",
    hablar: "Talk to our team",
  },
  hero: {
    badge: "Atebiz",
    pill2: "Financial software · The Next family",
    title1: "Financial intelligence",
    titleHighlight: "at the speed of thought.",
    lead: "Software for teams that no longer want to depend on broken spreadsheets.",
    desc:
      "Atebiz is a financial software company building an ecosystem of products for demanding finance teams: reporting, data and management, with the speed and precision of an institutional engine.",
    verProductos: "See products",
    hablarEquipo: "Talk to our team",
    note: "We reply in under 24 h. No commitment.",
    stats: LEGACY.en.hero.stats,
    panel: {
      title: "The Next family",
      tag: "in production",
      erps: "Your ERPs",
      erpsSub: "Business Central · SQL",
      konso: "Konsolidator",
      konsoSub: "Consolidation",
      board: "Management and board",
      boardSub: "Reports · KPIs · .pptx",
      firm: "Your services firm",
      firmSub: "Sales · delivery · billing",
      nd: "Clean, checked entries",
      nr: "Group revenue · YTD",
      nm: "Days sold / delivered",
    },
  },
  ecosystem: {
    tag: "The Next family",
    title: "Three products. One way of working.",
    desc:
      "Each product solves a critical part of the cycle: every company's data, the group's reporting and the day-to-day running of firms that sell hours. All share design, security and team.",
    products: enProducts,
    flowTitle: "How they fit",
    flow:
      "Next Data reads the ERPs and prepares the data. Konsolidator consolidates. Next Reporting turns it into reports for management. Next Management runs services firms, from the first contact to the invoice.",
    verDetalle: "See in detail",
    paraQuien: "For",
  },
  showcase: {
    tag: "In action",
    title1: "This is what",
    titleHighlight: "financial intelligence",
    title2: "in motion looks like.",
    desc: "From executive reports to audit control, this is what Atebiz puts in your team's hands.",
    items: LEGACY.en.showcase.items,
    example: "Example",
  },
  cta: {
    ...LEGACY.en.cta,
    pillars: [
      LEGACY.en.cta.pillars[0],
      { title: "One single ecosystem", desc: "Reporting, data and management with the same design, the same security and the same team behind them." },
      LEGACY.en.cta.pillars[2],
    ],
  },
  about: {
    ...LEGACY.en.about,
    p3:
      "We are not a single product: we are a financial software company building the Next family (reporting, data and management) under the same brand, the same design and the same standards.",
    ofrecemosDesc:
      "Atebiz builds specialized financial software. Three products that solve a critical part of the cycle: reporting, data and management. All share the same philosophy of speed and clarity.",
    productLine: enProducts.map((p) => ({ name: p.name, status: p.status, desc: p.desc })),
    verFicha: "See product",
  },
  velocity: {
    ...LEGACY.en.velocity,
    ctaDesc: "Next Reporting was the first product in the Next family and already closes whole groups' months. Next Data and Next Management follow the same path.",
  },
  productsPage: {
    tag: "Products",
    title: "The Next family, inside.",
    desc:
      "Three products with the same design, the same security and the same team behind them. Pick the one that fits your team, or combine them.",
    jump: "Jump to",
    demo: "Book a demo",
    web: "Visit the product site",
    app: "Open the product",
    detail: {
      "next-reporting": {
        blocksTitle: "The three questions of every close",
        blocks: [
          { title: "How are we doing", desc: "Revenue, EBITDA, EBIT and net result against last month or last year. For the group, a holding or a single company." },
          { title: "What doesn't add up", desc: "The company that hasn't loaded, the duplicated file, the debit that doesn't match the credit, the unmapped account. Before it reaches the report." },
          { title: "Where it comes from", desc: "Click any amount and drill down to the local account and the journal entry: date, number, description, counterparty and dimensions." },
        ],
        listTitle: "What happens on every load",
        list: [
          "One current version per company, scenario and month: reloading replaces, never adds.",
          "Debits and credits balance per company, with alerts for missing months and duplicated files.",
          "ECB exchange rates: closing for the balance sheet, average and cumulative average for P&L.",
          "Who loaded, when, from which file and with what result is all recorded.",
        ],
        chipsTitle: "Where the data comes in",
        chips: ["Konsolidator", "Excel or CSV", "API", "Data Warehouse"],
        plans: "Three plans, Base, Pro and Enterprise, depending on where your data comes from. The reports are the same in all of them.",
      },
      "next-data": {
        blocksTitle: "Three layers. No data lost along the way.",
        flow: [
          { title: "Bronze · As the ERP delivered it", desc: "Stores exactly what each ERP delivered, with the date of every load. Any past figure can be rebuilt." },
          { title: "Silver · Clean and checked", desc: "Types, duplicates, debits equal credits, every row counted. What doesn't fit is set aside with its reason; nothing is silently deleted." },
          { title: "Gold · With your group's rules", desc: "Company mapping, chart of accounts, dimensions, counterparty and currency. Konsolidator, the analysis screens and any BI read from gold." },
        ],
        listTitle: "Why a warehouse",
        list: [
          "The close no longer starts by exporting balances from every ERP by hand.",
          "Intercompany differences show up earlier, across ERPs, down to the entry.",
          "History isn't lost when the ERP purges or overwrites.",
          "AI proposes mappings and explains mismatches; nothing goes in without a person confirming it.",
        ],
        chipsTitle: "Connectors",
        chips: ["Business Central", "PostgreSQL", "Supabase", "Other SQL databases"],
        chipsMore: ["SAP Business One", "Sage", "Odoo", "a3ERP", "Holded", "NetSuite"],
        chipsMoreLabel: "In the catalogue",
        plans: "The warehouse lives in your company's own cloud project, Google Cloud or Microsoft Fabric, in the EU by default.",
      },
      "next-management": {
        problem:
          "In a services firm the same client is typed in four times: in the CRM when it is a deal, in a spreadsheet when it becomes a project, in the hours file every week, and again on the invoice. Nobody sees the whole picture, and money leaks in the gaps.",
        blocksTitle: "One client goes through the whole firm without being retyped",
        flow: [
          { title: "Contact and company", desc: "Captured, imported or clipped from LinkedIn." },
          { title: "Deal", desc: "Moves through the firm's own sales pipeline, with its probability and forecast." },
          { title: "Proposal", desc: "Generated from the product catalogue and the firm's template, with AI help on the text." },
          { title: "Handover", desc: "The won deal becomes a client, its products and its projects, with the days that were sold." },
          { title: "Delivery", desc: "Consultants book their days in the calendar, and they land in their Outlook." },
          { title: "Billing", desc: "Built from those days per period, with cut-off dates and adjustments." },
          { title: "Customer success", desc: "Follows the account's health, renewals, upsells and support tickets." },
        ],
        listTitle: "What's included",
        list: [
          "Configurable sales pipelines, forecast and AI-assisted proposals.",
          "Handover from sale to delivery with the days and products sold.",
          "Time booking synced with Outlook and Teams.",
          "Billing per period, with cut-offs and adjustments.",
          "Shared ticket desk fed by your support mailbox.",
          "Customer success: health, renewals and upsells.",
          "Security levels and page access per department.",
          "Hosted in the EU, Microsoft 365 with least privilege.",
        ],
        chipsTitle: "Modules",
        chips: ["Home", "Contacts & Companies", "Sales", "Marketing", "Clients", "Customer success", "Projects", "Calendar", "Tickets & Tasks", "Management", "Settings"],
        chipsMoreLabel: "Works with",
        chipsMore: ["Outlook calendar", "Outlook e-mail", "Teams", "LinkedIn", "Excel and CSV", "AI"],
        plans: "It replaces the usual patchwork of a CRM, spreadsheets for hours and billing, a shared inbox and a calendar.",
      },
    },
  },
  footer: {
    ...LEGACY.en.footer,
    columns: [
      {
        title: "Products",
        links: [
          { label: "Next Reporting", to: "/productos#next-reporting" },
          { label: "Next Data", to: "/productos#next-data" },
          { label: "Next Management", to: "/productos#next-management" },
          { label: "Speed", to: "/velocidad" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About us", to: "/empresa" },
          { label: "Contact", to: "/contacto" },
          { label: "Pricing", to: "/contacto" },
        ],
      },
      LEGACY.en.footer.columns[2],
    ],
  },
};

export const TRANSLATIONS = { es, en };
