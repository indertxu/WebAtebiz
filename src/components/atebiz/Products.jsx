import React, { useState, useRef, useEffect } from "react";
import { Lock, ArrowRight, Check, MousePointerClick } from "lucide-react";
import { Image } from "@/components/ui/image";
import NextReportingFullscreen from "./NextReportingFullscreen";

const products = [
  {
    name: "Next Reporting",
    available: true,
    description:
      "Genera reportes financieros ejecutivos en segundos con plantillas inteligentes que se adaptan a tu estructura contable. El único módulo de Atebiz disponible hoy.",
    img: "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/22243a142_generated_6a6a3eef.png",
    features: ["Reportes en 4.2 segundos", "Plantillas adaptativas", "Exportación multi-formato"],
  },
  {
    name: "Dataworkhouse",
    available: false,
    description: "Almacén de datos financieros unificado. Toda tu información contable en una única fuente confiable.",
    img: "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/de56168b5_generated_c36a29ac.png",
    features: ["Fuente única de verdad", "Modelo de datos financiero", "Integración multi-origen"],
  },
  {
    name: "Next Management",
    available: false,
    description: "Reporting de gestión y control presupuestario con visión ejecutiva integrada.",
    img: "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/df54ffa7f_generated_c05ad054.png",
    features: ["Control presupuestario", "Reporting de gestión", "Cuadros de mando"],
  },
  {
    name: "Planning Financiero",
    available: false,
    description: "Presupuestación, forecasting y planificación financiera a largo plazo, con escenarios dinámicos.",
    img: "https://media.base44.com/images/public/6a61c4e27f96d740c2107076/9d6e82ee0_generated_d7e4c5ec.png",
    features: ["Presupuesto anual", "Rolling forecast", "Escenarios y simulaciones"],
  },
];

/* -------- hooks & helpers -------- */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...(rest.style || {}) }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * useReactiveHover
 * Trackea el ratón dentro del elemento y actualiza vars CSS que los hijos usan
 * para reaccionar en vivo:
 *   --px / --py  posición del cursor en px (relativa al elemento)
 *   --mx / --my  posición en %  (para radial gradients)
 *   --dx / --dy  desviación desde el centro en -0.5..0.5 (para parallax/tilt)
 *   --rx / --ry  rotación 3D en deg (tilt-3d)
 *   --dist       distancia normalizada al centro 0..1 (para chromatic aberration)
 *
 * Los "orbiters" (elementos como el badge "Pulsa click", el glow, etc.) tienen
 * su propia posición interpolada con lag magnético — un requestAnimationFrame
 * loop persigue al cursor sin re-renderizar React.
 */
function useReactiveHover(elRef, { maxTilt = 10 } = {}) {
  const stateRef = useRef({
    target: { x: 0, y: 0 },   // cursor target (px, relativo al elemento)
    magnetic: { x: 0, y: 0 }, // posición seguida con lag para el badge magnético
    active: false,
    raf: null,
  });

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const s = stateRef.current;

    const setVars = (px, py, w, h) => {
      const dx = px / w - 0.5;
      const dy = py / h - 0.5;
      const dist = Math.min(1, Math.hypot(dx, dy) * 2);
      el.style.setProperty("--px", `${px}px`);
      el.style.setProperty("--py", `${py}px`);
      el.style.setProperty("--mx", `${(px / w) * 100}%`);
      el.style.setProperty("--my", `${(py / h) * 100}%`);
      el.style.setProperty("--dx", dx.toFixed(3));
      el.style.setProperty("--dy", dy.toFixed(3));
      el.style.setProperty("--rx", `${dx * maxTilt}deg`);
      el.style.setProperty("--ry", `${-dy * maxTilt}deg`);
      el.style.setProperty("--dist", dist.toFixed(3));
    };

    const setMagnetic = (mx, my) => {
      el.style.setProperty("--mag-x", `${mx}px`);
      el.style.setProperty("--mag-y", `${my}px`);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      s.target.x = px;
      s.target.y = py;
      setVars(px, py, rect.width, rect.height);
      if (!s.active) {
        s.active = true;
        s.magnetic.x = px;
        s.magnetic.y = py;
        setMagnetic(px, py);
      }
      startLoop();
    };

    const onLeave = () => {
      const rect = el.getBoundingClientRect();
      // Volver todo al centro suavemente
      s.target.x = rect.width / 2;
      s.target.y = rect.height / 2;
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
      el.style.setProperty("--dist", `0`);
      startLoop();
      // Al cabo de un rato paramos
      setTimeout(() => { s.active = false; }, 600);
    };

    const startLoop = () => {
      if (s.raf) return;
      const tick = () => {
        // Interpolación suave hacia el target (lag magnético)
        const lag = 0.18;
        s.magnetic.x += (s.target.x - s.magnetic.x) * lag;
        s.magnetic.y += (s.target.y - s.magnetic.y) * lag;
        setMagnetic(s.magnetic.x, s.magnetic.y);
        const dx = Math.abs(s.target.x - s.magnetic.x);
        const dy = Math.abs(s.target.y - s.magnetic.y);
        if (dx > 0.3 || dy > 0.3) {
          s.raf = requestAnimationFrame(tick);
        } else {
          s.raf = null;
        }
      };
      s.raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, [elRef, maxTilt]);
}

function SplitWord({ text, baseDelay = 0 }) {
  return (
    <span aria-label={text} className="inline-flex">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="char-rise"
          style={{ animationDelay: `${baseDelay + i * 40}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function Products() {
  const [active, setActive] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [hoveringImg, setHoveringImg] = useState(false);
  const product = products[active];
  const isNextReporting = product.name === "Next Reporting";

  const imgWrapRef = useRef(null);
  useReactiveHover(imgWrapRef, { maxTilt: 10 });

  return (
    <section id="productos" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mb-12 max-w-2xl">
          <div className="text-xs font-medium text-primary/80 tracking-wide uppercase mb-4">
            Cockpit de utilidad
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Elige un producto. <span className="text-primary">Next Reporting</span> ya está disponible.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Selector */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0">
            {products.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.name}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all duration-500 focus-ring shrink-0 lg:w-full hover:-translate-y-0.5 ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[0_0_30px_-8px_rgba(0,255,133,0.35)]"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-semibold text-sm truncate">{p.name}</div>
                    {p.available ? (
                      <div className="flex items-center gap-1 text-xs text-primary mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                        Disponible
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Lock size={11} />
                        Próximamente
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <Reveal className="glass-panel cursor-glow rounded-3xl p-6 sm:p-8 flex flex-col group">
            <div
              ref={imgWrapRef}
              className={`reactive-stage tilt-3d relative aspect-video rounded-2xl overflow-hidden mb-6 bg-secondary ${
                isNextReporting ? "cursor-none" : ""
              }`}
              onMouseEnter={() => setHoveringImg(true)}
              onMouseLeave={() => setHoveringImg(false)}
              onClick={isNextReporting ? () => setShowFullscreen(true) : undefined}
            >
              {/* --- Capa 1: la imagen, con parallax opuesto y ligero zoom ---
                  El transform usa --dx/--dy para desplazarse en dirección opuesta al cursor,
                  creando sensación de profundidad. */}
              <div
                className="absolute inset-0 will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: hoveringImg
                    ? "translate3d(calc(var(--dx, 0) * -20px), calc(var(--dy, 0) * -20px), 0) scale(1.08)"
                    : "translate3d(0, 0, 0) scale(1)",
                }}
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  fittingType="fill"
                  className={`w-full h-full ${
                    product.available ? "" : "grayscale opacity-50"
                  }`}
                />
              </div>

              {/* --- Capa 2: aberración cromática — un fantasma verde de la imagen,
                       desplazado en la misma dirección que el cursor. Aparece solo con hover
                       y se intensifica con --dist (distancia al centro). */}
              {product.available && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500"
                  style={{
                    opacity: hoveringImg ? "calc(var(--dist, 0) * 0.7)" : "0",
                    transform:
                      "translate3d(calc(var(--dx, 0) * 12px), calc(var(--dy, 0) * 12px), 0)",
                  }}
                >
                  <Image
                    src={product.img}
                    alt=""
                    fittingType="fill"
                    className="w-full h-full"
                    style={{
                      filter: "hue-rotate(90deg) saturate(2) brightness(1.2)",
                    }}
                  />
                </div>
              )}

              {/* --- Capa 3: viñeta base --- */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />

              {/* --- Capa 4: radial glow que sigue al cursor (verde intenso) --- */}
              {product.available && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500"
                  style={{
                    opacity: hoveringImg ? 1 : 0,
                    background:
                      "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(0,255,133,0.55), rgba(0,255,133,0.15) 30%, transparent 60%)",
                  }}
                />
              )}

              {/* --- Capa 5: scanline horizontal siguiendo la Y del cursor --- */}
              {product.available && (
                <div
                  className="absolute left-0 right-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: hoveringImg ? 0.8 : 0,
                    top: "var(--py, 50%)",
                    height: "1px",
                    transform: "translateY(-0.5px)",
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,255,133,0.9) 20%, rgba(180,255,220,1) 50%, rgba(0,255,133,0.9) 80%, transparent)",
                    boxShadow: "0 0 20px rgba(0,255,133,0.7), 0 0 40px rgba(0,255,133,0.35)",
                  }}
                />
              )}

              {/* --- Capa 6: scanline vertical siguiendo la X del cursor --- */}
              {product.available && (
                <div
                  className="absolute top-0 bottom-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    opacity: hoveringImg ? 0.5 : 0,
                    left: "var(--px, 50%)",
                    width: "1px",
                    transform: "translateX(-0.5px)",
                    background:
                      "linear-gradient(180deg, transparent, rgba(0,255,133,0.7) 30%, rgba(0,255,133,0.7) 70%, transparent)",
                    boxShadow: "0 0 12px rgba(0,255,133,0.5)",
                  }}
                />
              )}

              {/* --- Capa 7: rings expansivos desde la posición del cursor --- */}
              {product.available && hoveringImg && (
                <>
                  <span
                    className="absolute w-32 h-32 rounded-full border border-primary/60 pointer-events-none ring-expand"
                    style={{
                      left: "var(--px, 50%)",
                      top: "var(--py, 50%)",
                      animationDelay: "0ms",
                    }}
                  />
                  <span
                    className="absolute w-32 h-32 rounded-full border border-primary/40 pointer-events-none ring-expand"
                    style={{
                      left: "var(--px, 50%)",
                      top: "var(--py, 50%)",
                      animationDelay: "700ms",
                    }}
                  />
                  <span
                    className="absolute w-32 h-32 rounded-full border border-primary/25 pointer-events-none ring-expand"
                    style={{
                      left: "var(--px, 50%)",
                      top: "var(--py, 50%)",
                      animationDelay: "1400ms",
                    }}
                  />
                </>
              )}

              {/* --- Capa 8: "cursor lens" — punto brillante que sigue al ratón con lag magnético --- */}
              {product.available && (
                <div
                  className="absolute w-16 h-16 rounded-full pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: hoveringImg ? 1 : 0,
                    left: "var(--mag-x, 50%)",
                    top: "var(--mag-y, 50%)",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(220,255,235,0.9) 0%, rgba(0,255,133,0.6) 30%, rgba(0,255,133,0.2) 55%, transparent 75%)",
                    filter: "blur(6px)",
                    mixBlendMode: "screen",
                  }}
                />
              )}

              {/* --- Capa 9: badge "Scroll para entrar" magnético que persigue al cursor --- */}
              {isNextReporting && (
                <div
                  className={`absolute pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    hoveringImg ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                  style={{
                    left: "var(--mag-x, 50%)",
                    top: "var(--mag-y, 50%)",
                    transform: "translate(-50%, calc(-50% + 64px))",
                  }}
                >
                  {/* Aura cónica giratoria detrás del badge */}
                  <div
                    className="absolute -inset-5 rounded-full opacity-80 animate-spin-slow blur-md"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(0,255,133,0) 0deg, rgba(0,255,133,0.6) 90deg, rgba(0,255,133,0) 200deg, rgba(0,255,133,0.4) 300deg, rgba(0,255,133,0) 360deg)",
                    }}
                  />
                  <div className="relative glass-panel glow-emerald rounded-full pl-4 pr-5 py-2.5 flex items-center gap-2 border border-primary/40 overflow-hidden whitespace-nowrap">
                    <span className="shimmer-sweep" />
                    <MousePointerClick size={16} className="text-primary" />
                    <span className="font-heading font-semibold text-sm text-primary tracking-wide">
                      {hoveringImg ? <SplitWord text="Click aquí" baseDelay={80} /> : "Click aquí"}
                    </span>
                  </div>
                </div>
              )}

              {/* --- Capa 10: bordes brillantes que se activan según la esquina más cercana --- */}
              {product.available && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
                  style={{
                    opacity: hoveringImg ? 1 : 0,
                    boxShadow:
                      "inset 0 0 0 1px rgba(0,255,133,0.35), inset 0 0 40px rgba(0,255,133,0.15)",
                  }}
                />
              )}

              {!product.available && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2">
                    <Lock size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Próximamente</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-heading font-bold text-2xl tracking-tight">{product.name}</h3>
              {product.available ? (
                <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Check size={12} /> Disponible
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  <Lock size={12} /> Próximamente
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{product.description}</p>

            <ul className="grid sm:grid-cols-3 gap-3 mb-8">
              {product.features.map((f, idx) => (
                <Reveal
                  as="li"
                  key={f}
                  delay={idx * 100}
                  className={`text-xs rounded-xl px-4 py-3 border transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/60 ${
                    product.available
                      ? "border-primary/20 bg-primary/5 text-foreground"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {f}
                </Reveal>
              ))}
            </ul>

            {product.available ? (
              <a
                href="https://web-reporting-zmdp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:glow-emerald transition-all duration-500 focus-ring w-fit overflow-hidden"
              >
                <span className="shimmer-sweep opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative">Probar Next Reporting</span>
                <ArrowRight size={18} className="relative group-hover/btn:translate-x-1 transition-transform" />
              </a>
            ) : (
              <div className="text-sm text-muted-foreground">
                Este módulo estará disponible próximamente. Mantente atento a los próximos anuncios.
              </div>
            )}
          </Reveal>
        </div>
      </div>

      {/* Presentación fullscreen — se abre al hacer click en la imagen del producto */}
      <NextReportingFullscreen
        open={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        revealDelay={0}
      />
    </section>
  );
}
