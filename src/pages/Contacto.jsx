import React, { useState } from "react";
import { Mail, Check, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { LOGO_DATA_URI } from "@/lib/logo-data";
import { useI18n } from "@/lib/i18n";

// EmailJS config — se lee del .env
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* --------- HTML builders --------- */

// Email 1: aviso interno al admin (info@atebiz.com) con los datos del formulario
function buildAdminHtml({ name, email, message, fecha }) {
  return [
    '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#020e07;font-family:Arial,sans-serif;color:#e5f5ec;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#020e07;padding:40px 20px;"><tr><td align="center">',
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a1a12;border:1px solid #1a3d2b;border-radius:20px;overflow:hidden;">',
    '<tr><td style="padding:32px 40px 20px 40px;border-bottom:1px solid #1a3d2b;">',
    '<table width="100%" cellpadding="0" cellspacing="0"><tr>',
    '<td><div style="font-size:11px;letter-spacing:0.15em;color:#00ff85;text-transform:uppercase;">NUEVO CONTACTO</div>',
    '<div style="font-size:22px;font-weight:700;color:#ffffff;margin-top:6px;">Mensaje recibido en atebiz.com</div></td>',
    '<td align="right" style="vertical-align:top;"><img src="' + LOGO_DATA_URI + '" alt="Atebiz" width="48" height="48" style="display:block;border:0;width:48px;height:48px;" /></td>',
    '</tr></table></td></tr>',
    '<tr><td style="padding:28px 40px 8px 40px;">',
    '<div style="font-size:10px;letter-spacing:0.15em;color:#00ff85;text-transform:uppercase;margin-bottom:12px;">DATOS DEL CONTACTO</div>',
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d2419;border:1px solid #1a3d2b;border-radius:14px;">',
    '<tr><td style="padding:16px 20px;border-bottom:1px solid #1a3d2b;"><div style="font-size:11px;color:#7fa895;margin-bottom:4px;">Nombre</div><div style="font-size:15px;color:#ffffff;font-weight:600;">' + name + '</div></td></tr>',
    '<tr><td style="padding:16px 20px;border-bottom:1px solid #1a3d2b;"><div style="font-size:11px;color:#7fa895;margin-bottom:4px;">Email</div><div style="font-size:15px;color:#00ff85;font-weight:600;"><a href="mailto:' + email + '" style="color:#00ff85;text-decoration:none;">' + email + '</a></div></td></tr>',
    '<tr><td style="padding:16px 20px;"><div style="font-size:11px;color:#7fa895;margin-bottom:4px;">Fecha</div><div style="font-size:15px;color:#ffffff;">' + fecha + '</div></td></tr>',
    '</table></td></tr>',
    '<tr><td style="padding:24px 40px 8px 40px;">',
    '<div style="font-size:10px;letter-spacing:0.15em;color:#00ff85;text-transform:uppercase;margin-bottom:12px;">MENSAJE</div>',
    '<div style="background:#0d2419;border:1px solid #1a3d2b;border-left:3px solid #00ff85;border-radius:14px;padding:18px 22px;font-size:15px;line-height:1.6;color:#e5f5ec;white-space:pre-wrap;">' + message + '</div>',
    '</td></tr>',
    '<tr><td style="padding:28px 40px;">',
    '<a href="mailto:' + email + '" style="display:inline-block;background:#00ff85;color:#020e07;font-weight:600;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;">Responder a ' + name + ' →</a>',
    '</td></tr>',
    '<tr><td style="padding:20px 40px 32px 40px;border-top:1px solid #1a3d2b;">',
    '<div style="font-size:10px;letter-spacing:0.1em;color:#5a7d6b;">ATEBIZ · SISTEMA DE CONTACTO · atebiz.com</div>',
    '</td></tr></table></td></tr></table></body></html>',
  ].join('');
}

// Email 2: confirmación al cliente con mensaje de bienvenida
function buildClientHtml({ name, email, message, fecha }) {
  return [
    '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#020e07;font-family:Arial,sans-serif;color:#e5f5ec;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#020e07;padding:40px 20px;"><tr><td align="center">',
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0a1a12;border:1px solid #1a3d2b;border-radius:20px;overflow:hidden;">',

    // Header con logo
    '<tr><td style="padding:40px 40px 0 40px;">',
    '<table width="100%" cellpadding="0" cellspacing="0"><tr><td>',
    '<img src="' + LOGO_DATA_URI + '" alt="Atebiz" width="44" height="44" style="display:inline-block;vertical-align:middle;border:0;width:44px;height:44px;" />',
    '<span style="display:inline-block;color:#ffffff;font-size:22px;font-weight:700;margin-left:12px;vertical-align:middle;">atebiz</span>',
    '</td></tr></table>',
    '<div style="height:1px;background:linear-gradient(90deg,transparent,#00ff85,transparent);margin-top:28px;opacity:0.5;"></div>',
    '</td></tr>',

    // Título + bienvenida
    '<tr><td style="padding:36px 40px 8px 40px;">',
    '<div style="font-size:11px;letter-spacing:0.15em;color:#00ff85;text-transform:uppercase;margin-bottom:14px;">CONFIRMACIÓN RECIBIDA</div>',
    '<h1 style="margin:0;font-size:30px;line-height:1.15;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">Estimado/a <span style="color:#00ff85;">' + name + '</span>,</h1>',
    '</td></tr>',
    '<tr><td style="padding:20px 40px 8px 40px;">',
    '<p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#b8d0c3;">Gracias por ponerte en contacto con <span style="color:#ffffff;">Atebiz</span>. Hemos recibido correctamente tu mensaje y ya está en manos de nuestro equipo.</p>',
    '<p style="margin:0;font-size:15px;line-height:1.65;color:#b8d0c3;">Un especialista revisará tu solicitud y te contactará por email en un plazo máximo de <strong style="color:#ffffff;">24 horas laborables</strong>. Si tu consulta es urgente, puedes responder directamente a este correo.</p>',
    '</td></tr>',

    // Resumen del mensaje
    '<tr><td style="padding:28px 40px 8px 40px;">',
    '<div style="font-size:10px;letter-spacing:0.15em;color:#00ff85;text-transform:uppercase;margin-bottom:12px;">RESUMEN DE TU MENSAJE</div>',
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d2419;border:1px solid #1a3d2b;border-radius:14px;">',
    '<tr><td style="padding:16px 20px;border-bottom:1px solid #1a3d2b;"><div style="font-size:11px;color:#7fa895;margin-bottom:4px;">Enviado por</div><div style="font-size:14px;color:#ffffff;font-weight:600;">' + name + ' · ' + email + '</div></td></tr>',
    '<tr><td style="padding:16px 20px;border-bottom:1px solid #1a3d2b;"><div style="font-size:11px;color:#7fa895;margin-bottom:4px;">Fecha de recepción</div><div style="font-size:14px;color:#ffffff;">' + fecha + ' (hora de Madrid)</div></td></tr>',
    '<tr><td style="padding:16px 20px;"><div style="font-size:11px;color:#7fa895;margin-bottom:6px;">Mensaje</div><div style="font-size:14px;line-height:1.55;color:#e5f5ec;white-space:pre-wrap;">' + message + '</div></td></tr>',
    '</table></td></tr>',

    // Qué pasa ahora — timeline
    '<tr><td style="padding:28px 40px 8px 40px;">',
    '<div style="font-size:10px;letter-spacing:0.15em;color:#00ff85;text-transform:uppercase;margin-bottom:14px;">QUÉ PASA AHORA</div>',
    '<table width="100%" cellpadding="0" cellspacing="0">',
    '<tr><td style="padding:0 0 14px 0;vertical-align:top;"><table cellpadding="0" cellspacing="0"><tr>',
    '<td style="width:28px;vertical-align:top;"><div style="width:22px;height:22px;border-radius:50%;background:#00ff85;color:#020e07;font-weight:700;font-size:12px;text-align:center;line-height:22px;">1</div></td>',
    '<td style="padding-left:12px;color:#b8d0c3;font-size:14px;line-height:1.55;">Un miembro del equipo Atebiz revisa tu mensaje y prepara una respuesta a medida.</td>',
    '</tr></table></td></tr>',
    '<tr><td style="padding:0 0 14px 0;vertical-align:top;"><table cellpadding="0" cellspacing="0"><tr>',
    '<td style="width:28px;vertical-align:top;"><div style="width:22px;height:22px;border-radius:50%;background:#00ff85;color:#020e07;font-weight:700;font-size:12px;text-align:center;line-height:22px;">2</div></td>',
    '<td style="padding-left:12px;color:#b8d0c3;font-size:14px;line-height:1.55;">Te contactamos por email en menos de 24 horas laborables desde <span style="color:#ffffff;">info@atebiz.com</span>.</td>',
    '</tr></table></td></tr>',
    '<tr><td style="vertical-align:top;"><table cellpadding="0" cellspacing="0"><tr>',
    '<td style="width:28px;vertical-align:top;"><div style="width:22px;height:22px;border-radius:50%;background:#00ff85;color:#020e07;font-weight:700;font-size:12px;text-align:center;line-height:22px;">3</div></td>',
    '<td style="padding-left:12px;color:#b8d0c3;font-size:14px;line-height:1.55;">Coordinamos una llamada o email según tu preferencia para resolver tu consulta.</td>',
    '</tr></table></td></tr>',
    '</table></td></tr>',

    // Separador
    '<tr><td style="padding:32px 40px 0 40px;"><div style="height:1px;background:#1a3d2b;"></div></td></tr>',

    // Firma
    '<tr><td style="padding:24px 40px 8px 40px;">',
    '<p style="margin:0 0 6px 0;font-size:15px;color:#e5f5ec;line-height:1.55;">Un cordial saludo,</p>',
    '<p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">El equipo de Atebiz</p>',
    '<p style="margin:4px 0 0 0;font-size:13px;color:#7fa895;">Inteligencia financiera a la velocidad del pensamiento.</p>',
    '</td></tr>',

    // Footer
    '<tr><td style="padding:28px 40px 36px 40px;">',
    '<div style="border-top:1px solid #1a3d2b;padding-top:20px;">',
    '<div style="font-size:10px;letter-spacing:0.1em;color:#5a7d6b;line-height:1.6;">ATEBIZ · atebiz.com<br>info@atebiz.com · sales@atebiz.com</div>',
    '<div style="font-size:11px;color:#5a7d6b;margin-top:12px;line-height:1.5;">Este correo se envía automáticamente al completar el formulario de contacto en atebiz.com. Si no reconoces esta solicitud, ignora este mensaje.</div>',
    '</div></td></tr>',

    '</table></td></tr></table></body></html>',
  ].join('');
}

export default function Contacto() {
  const { t } = useI18n();
  const tr = t.contacto;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(tr.errorConfig);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const now = new Date();
    const fecha = now.toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Madrid",
    });

    const data = {
      name: form.name || "Sin nombre",
      email: form.email,
      message: form.message,
      fecha,
    };

    try {
      // 1) Aviso interno a info@atebiz.com — con los datos del formulario
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: "info@atebiz.com",
          email_subject: tr.subjectAdmin(data.name),
          message_html: buildAdminHtml(data),
        },
        { publicKey: PUBLIC_KEY }
      );

      // 2) Confirmación al cliente — con mensaje de bienvenida
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: form.email,
          email_subject: tr.subjectUser,
          message_html: buildClientHtml(data),
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(err?.text || tr.errorGeneric);
    }
  };

  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            {tr.tag}
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
            {tr.title1} <span className="text-primary text-glow">{tr.titleHighlight}</span>{tr.title2}
          </h1>
          <p className="text-muted-foreground text-lg">
            {tr.desc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {tr.contacts.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="glass-panel glass-panel-hover rounded-2xl p-7 group block focus-ring"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Mail size={20} className="text-primary" />
              </div>
              <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
              <div className="font-heading font-semibold text-lg mb-2 break-all">{c.email}</div>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </a>
          ))}
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-2xl tracking-tight mb-6">{tr.formTitle}</h2>
          {status === "sent" ? (
            <div className="flex flex-col items-start gap-3 px-4 py-6">
              <div className="flex items-center gap-3 text-primary">
                <Check size={20} />
                <span className="text-sm font-medium">{tr.sentTitle}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {tr.sentDesc1} <span className="text-foreground">{form.email}</span>{tr.sentDesc2}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">{tr.nombre}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors focus-ring"
                  placeholder={tr.nombrePh}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">{tr.email}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors focus-ring"
                  placeholder={tr.emailPh}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">{tr.mensaje}</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors focus-ring resize-none"
                  placeholder={tr.mensajePh}
                />
              </div>
              {status === "error" && (
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all focus-ring disabled:opacity-60"
              >
                {status === "sending" ? tr.enviando : tr.enviar}
                {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
