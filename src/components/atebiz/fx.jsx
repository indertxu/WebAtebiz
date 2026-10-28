import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

/* ---------- Revelado al entrar en pantalla ---------- */

export function Reveal({ as = "div", delay = 0, y = 22, className = "", style, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Hijos que entran en cascada */
export function Stagger({ as = "div", className = "", gap = 0.08, onMount = false, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  const trigger = onMount ? { animate: "show" } : { whileInView: "show" };
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      {...trigger}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE } },
};

export function StaggerItem({ as = "div", className = "", children, ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp className={className} variants={itemVariants} {...rest}>
      {children}
    </Comp>
  );
}

/* ---------- Números ---------- */

function formatNumber(n, { decimals = 0, locale = "es-ES" } = {}) {
  return n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/* Cuenta desde 0 hasta `to` al entrar en pantalla */
export function CountUp({ to, from = 0, decimals = 0, duration = 1.6, prefix = "", suffix = "", locale = "es-ES", className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : from);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setVal(to);
      return;
    }
    const controls = animate(from, to, { duration, ease: EASE, onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {formatNumber(val, { decimals, locale })}
      {suffix}
    </span>
  );
}

/* Cifra "en vivo" que sube poco a poco, como un contador de carga */
export function LiveNumber({ start, step = [1, 9], every = 900, decimals = 0, suffix = "", locale = "es-ES", className = "", style }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(start);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px" });

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => {
      setVal((v) => v + step[0] + Math.random() * (step[1] - step[0]));
    }, every);
    return () => clearInterval(id);
  }, [reduce, inView, step, every]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {formatNumber(decimals ? val : Math.round(val), { decimals, locale })}
      {suffix}
    </span>
  );
}

/* ---------- Texto tecleado ---------- */

export function Typewriter({ text, speed = 42, delay = 500, className = "", cursorClassName = "" }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    let timer;
    const start = setTimeout(function tick() {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed + Math.random() * 30);
    }, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, delay, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span aria-hidden="true" className={`nx-caret ${cursorClassName}`} />
    </span>
  );
}

/* ---------- Gráficos que se dibujan ---------- */

export function DrawSpark({ points, height = 56, color = "#34D399", fill = true, delay = 0.2, className = "" }) {
  const w = 240;
  const reduce = useReducedMotion();
  const { d, area, last } = useMemo(() => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const pad = 5;
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map((p) => pad + (1 - (p - min) / (max - min || 1)) * (height - pad * 2));
    const path = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
    return { d: path, area: `${path} L${w},${height} L0,${height} Z`, last: { x: xs[xs.length - 1], y: ys[ys.length - 1] } };
  }, [points, height]);

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      style={{ height }}
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true }}
    >
      {fill && (
        <motion.path
          d={area}
          fill={color}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 0.13, transition: { delay: delay + 0.9, duration: 0.8 } } }}
        />
      )}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { delay, duration: 1.4, ease: EASE } } }}
      />
      <motion.circle
        cx={last.x}
        cy={last.y}
        r="3.5"
        fill={color}
        variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: delay + 1.3, type: "spring", stiffness: 400, damping: 14 } } }}
      />
    </motion.svg>
  );
}

/* Barra que crece al entrar en pantalla */
export function GrowBar({ pct, color, delay = 0.1, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <div className={`nx-bar ${className}`}>
      <motion.i
        style={{ background: color, display: "block", height: "100%", borderRadius: "inherit", transformOrigin: "left" }}
        initial={reduce ? false : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </div>
  );
}

/* ---------- Marquesina infinita ---------- */

export function Marquee({ items, speed = 38, className = "", renderItem }) {
  const doubled = [...items, ...items];
  return (
    <div className={`nx-marquee ${className}`}>
      <div className="nx-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((it, i) => (
          <span key={i} aria-hidden={i >= items.length}>
            {renderItem ? renderItem(it) : it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Brillo que sigue al ratón ---------- */

export function useSpotlight() {
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return { onMouseMove };
}

/* Botón magnético: se desplaza ligeramente hacia el cursor */
export function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  if (reduce) return <span className={`inline-flex ${className}`}>{children}</span>;
  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      animate={pos}
      transition={{ type: "spring", stiffness: 300, damping: 18, mass: 0.4 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );
}

/* Titular que escribe, borra y escribe la siguiente frase (como Next Reporting) */
export function RotatingTypewriter({ texts, typeSpeed = 48, deleteSpeed = 24, hold = 2600, startDelay = 700, className = "" }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(reduce ? texts[0].length : 0);
  const [phase, setPhase] = useState(reduce ? "hold" : "wait");

  useEffect(() => {
    if (reduce) return;
    let timer;
    const full = texts[i];
    if (phase === "wait") timer = setTimeout(() => setPhase("type"), startDelay);
    else if (phase === "type") {
      if (n < full.length) timer = setTimeout(() => setN(n + 1), typeSpeed + Math.random() * 28);
      else timer = setTimeout(() => setPhase("delete"), hold);
    } else if (phase === "delete") {
      if (n > 0) timer = setTimeout(() => setN(n - 1), deleteSpeed);
      else {
        setI((i + 1) % texts.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(timer);
  }, [phase, n, i, texts, typeSpeed, deleteSpeed, hold, startDelay, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{texts[0]}</span>
      <span aria-hidden="true">{texts[i].slice(0, n)}</span>
      <span aria-hidden="true" className="nx-caret" />
    </span>
  );
}
