/**
 * consent.js — gestión del consentimiento de cookies y envío
 * de información de visita a Google Sheets vía Apps Script.
 *
 * Estados posibles:
 *   "all"       → el usuario aceptó todas las cookies (recogemos IP + info).
 *   "necessary" → solo cookies estrictamente necesarias.
 *   "rejected"  → rechazadas.
 */

const STORAGE_KEY = "atebiz_cookie_consent_v1";
const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL;

export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveConsent(status) {
  const record = {
    status,             // "all" | "necessary" | "rejected"
    date: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {}
  return record;
}

export function clearConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

/**
 * Recoge información del visitante y la envía a la hoja.
 * Solo se llama si el usuario aceptó "all".
 */
export async function trackVisit(consentStatus) {
  if (!ANALYTICS_URL) {
    console.warn("[Atebiz] VITE_ANALYTICS_URL no configurada — no se envía la visita.");
    return;
  }

  // Datos siempre disponibles (sin red)
  const basic = {
    source: "atebiz_web",   // marca para que el Apps Script sepa que es de esta web
    consent: consentStatus,
    fecha: new Date().toISOString(),
    pageUrl: window.location.href,
    referrer: document.referrer || "(directo)",
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: (navigator.languages || []).join(", "),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    colorDepth: window.screen.colorDepth,
    platform: navigator.platform || "",
    cookieEnabled: navigator.cookieEnabled,
  };

  // Datos de IP/geo — solo si el usuario aceptó todo
  let geo = {
    ip: "", country: "", region: "", city: "", isp: "",
  };
  if (consentStatus === "all") {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        geo = {
          ip: data.ip || "",
          country: data.country_name || "",
          region: data.region || "",
          city: data.city || "",
          isp: data.org || "",
          postal: data.postal || "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
        };
      }
    } catch (err) {
      console.warn("[Atebiz] No se pudo obtener geo IP:", err);
    }
  }

  const payload = { ...basic, ...geo };

  // POST al Apps Script (mode: no-cors porque Google no devuelve CORS headers)
  try {
    await fetch(ANALYTICS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[Atebiz] No se pudo enviar la visita:", err);
  }
}
