import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./fx";

/*
  El cubo Atebiz en SVG, con cada cara como un producto:
  - arriba (flecha de tendencia) → Next Reporting
  - derecha (barras)             → Next Data
  - izquierda (N)                → Next Management
  Las caras llegan volando y se ensamblan; la activa se separa del cubo.
*/

export const FACE_TO_PRODUCT = { top: "next-reporting", right: "next-data", left: "next-management" };
export const PRODUCT_TO_FACE = { "next-reporting": "top", "next-data": "right", "next-management": "left" };

const FACES = {
  top: {
    points: "300,52 498,152 300,252 102,152",
    fill: "#8BEFC0",
    from: { x: 0, y: -170 },
    pop: { x: 0, y: -22 },
    delay: 0.15,
  },
  left: {
    points: "90,186 280,282 280,528 90,432",
    fill: "#16B07E",
    from: { x: -190, y: 90 },
    pop: { x: -19, y: 11 },
    delay: 0.32,
  },
  right: {
    points: "320,282 510,186 510,432 320,528",
    fill: "#0C6E4F",
    from: { x: 190, y: 90 },
    pop: { x: 19, y: 11 },
    delay: 0.49,
  },
};

const BARS = [
  { x: 20, h: 22 },
  { x: 43, h: 40 },
  { x: 66, h: 62 },
];

export default function Cube({ active, onFace, className = "", label, faceLabels }) {
  const reduce = useReducedMotion();
  const [assembled, setAssembled] = useState(!!reduce);
  useEffect(() => {
    const id = setTimeout(() => setAssembled(true), 1300);
    return () => clearTimeout(id);
  }, []);

  const face = (key, content) => {
    const f = FACES[key];
    const isActive = active === key;
    return (
      <motion.g
        key={key}
        initial={reduce ? false : { opacity: 0, x: f.from.x, y: f.from.y }}
        animate={{
          opacity: 1,
          x: isActive ? f.pop.x : 0,
          y: isActive ? f.pop.y : 0,
        }}
        transition={{
          opacity: { duration: 0.5, delay: reduce ? 0 : f.delay },
          x: { type: "spring", stiffness: 120, damping: 16, delay: assembled ? 0 : f.delay },
          y: { type: "spring", stiffness: 120, damping: 16, delay: assembled ? 0 : f.delay },
        }}
        style={{ cursor: onFace ? "pointer" : "default" }}
        onMouseEnter={onFace ? () => onFace(key) : undefined}
        onFocus={onFace ? () => onFace(key) : undefined}
        tabIndex={onFace ? 0 : undefined}
        role={onFace ? "button" : undefined}
        aria-label={onFace && faceLabels ? faceLabels[key] : undefined}
      >
        <polygon
          points={f.points}
          fill={f.fill}
          stroke={f.fill}
          strokeWidth="26"
          strokeLinejoin="round"
          style={{
            filter: isActive ? "drop-shadow(0 18px 30px rgba(16,185,129,.45))" : "none",
            transition: "filter .4s",
          }}
        />
        {content}
      </motion.g>
    );
  };

  const drawDelay = reduce ? 0 : 0.95;

  return (
    <svg viewBox="40 0 520 580" className={className} role="img" aria-label={label}>
      <defs>
        <radialGradient id="cubeGlow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#34D399" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="300" rx="260" ry="250" fill="url(#cubeGlow)" />
      <ellipse cx="300" cy="556" rx="170" ry="16" fill="#064E3B" opacity="0.18" />

      {face(
        "top",
        <motion.g
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ hidden: {}, show: { transition: { delayChildren: drawDelay } } }}
        >
          <motion.path
            d="M168,156 L262,134 L280,174 L398,150"
            fill="none"
            stroke="#0C6E4F"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease: EASE } } }}
          />
          <motion.path
            d="M392,128 L440,141 L402,172 Z"
            fill="#0C6E4F"
            stroke="#0C6E4F"
            strokeWidth="6"
            strokeLinejoin="round"
            variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { delay: 0.75, type: "spring", stiffness: 420, damping: 16 } } }}
            style={{ transformOrigin: "418px 147px" }}
          />
        </motion.g>
      )}

      {face(
        "left",
        <g transform="matrix(1.9,0.96,0,2.46,90,186)">
          <motion.path
            d="M30,74 L30,28 L66,76 L66,30"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="11"
            strokeLinejoin="miter"
            strokeLinecap="butt"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: drawDelay + 0.15, duration: 1, ease: EASE }}
          />
        </g>
      )}

      {face(
        "right",
        <g transform="matrix(1.9,-0.96,0,2.46,320,282)">
          {BARS.map((b, i) => (
            <motion.rect
              key={b.x}
              x={b.x}
              width="13"
              rx="3"
              fill="#FFFFFF"
              initial={reduce ? false : { y: 80, height: 0 }}
              animate={{ y: 80 - b.h, height: b.h }}
              transition={{ delay: drawDelay + 0.3 + i * 0.12, duration: 0.8, ease: EASE }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
