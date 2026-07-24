/**
 * Atebiz — Analytics de visitas
 * Recibe POST del banner de cookies y añade una fila a la hoja.
 *
 * INSTRUCCIONES:
 * 1. Abre tu Google Sheet (la que ya tienes).
 * 2. Menú Extensiones → Apps Script → borra todo el código de ejemplo.
 * 3. Pega este archivo entero.
 * 4. Guarda (💾 icono disquete o Ctrl+S). Ponle nombre "Atebiz Analytics".
 * 5. Menú Implementar (Deploy) → Nueva implementación.
 * 6. Tipo: "Aplicación web" (Web app).
 * 7. Descripción: "Atebiz cookie tracking v1".
 * 8. Ejecutar como: "Yo mismo" (Me).
 * 9. Quién tiene acceso: "Cualquier persona" (Anyone).
 * 10. Pulsa "Implementar". Autoriza los permisos si te los pide.
 * 11. Copia la URL que sale (algo tipo https://script.google.com/macros/s/AKfy…/exec).
 * 12. Pégala en el archivo .env de tu proyecto en:
 *     VITE_ANALYTICS_URL=https://script.google.com/macros/s/AKfy…/exec
 * 13. Reinicia Vite (Ctrl+C → npm run dev).
 */

// ID de la hoja de destino (la parte de la URL entre /d/ y /edit)
const SHEET_ID = "1-Fm_gtaXrn8yl5VHF0sPt-5LhSyXW20875j4cdfFq40";
// Nombre exacto de la pestaña donde se apuntan las visitas
const SHEET_NAME = "Visitas";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Si la pestaña no existe, la creamos con cabecera
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Fecha (ISO)",
        "Consentimiento",
        "IP",
        "País",
        "Región",
        "Ciudad",
        "Código postal",
        "Proveedor (ISP)",
        "Latitud",
        "Longitud",
        "User Agent",
        "Idioma",
        "Idiomas",
        "Zona horaria",
        "Pantalla",
        "Viewport",
        "Prof. color",
        "Plataforma",
        "Cookies habilitadas",
        "Página",
        "Referrer",
      ]);
      sheet.setFrozenRows(1);
      const header = sheet.getRange(1, 1, 1, sheet.getLastColumn());
      header.setFontWeight("bold").setBackground("#020e07").setFontColor("#00ff85");
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.fecha || new Date().toISOString(),
      data.consent || "",
      data.ip || "",
      data.country || "",
      data.region || "",
      data.city || "",
      data.postal || "",
      data.isp || "",
      data.latitude || "",
      data.longitude || "",
      data.userAgent || "",
      data.language || "",
      data.languages || "",
      data.timezone || "",
      data.screen || "",
      data.viewport || "",
      data.colorDepth || "",
      data.platform || "",
      data.cookieEnabled ? "Sí" : "No",
      data.pageUrl || "",
      data.referrer || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Endpoint GET simple — útil para comprobar que el Web App está desplegado
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "Atebiz Analytics", timestamp: new Date().toISOString() })
  ).setMimeType(ContentService.MimeType.JSON);
}
