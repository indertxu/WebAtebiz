import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { EASE } from "./fx";

/* Dock flotante como el de Next Reporting: paso actual, puntos y siguiente sección */
export default function ProgressDock({ ids }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const names = t.home.sections;
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
      const line = window.innerHeight * 0.45;
      let idx = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setCurrent(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  const go = (i) => {
    const el = document.getElementById(ids[i]);
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };
  const last = current >= ids.length - 1;
  const R = 15;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label={t.home.step(current + 1, ids.length)}
          className="fixed z-40 left-1/2"
          style={{ bottom: "calc(16px + env(safe-area-inset-bottom, 0px))", x: "-50%" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div
            className="flex items-center gap-2 sm:gap-3 rounded-[18px] p-1.5 sm:p-2 pl-2"
            style={{
              background: "rgba(7,34,25,.92)",
              border: "1px solid rgba(167,243,208,.18)",
              boxShadow: "0 24px 50px -20px rgba(0,0,0,.55)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              color: "#F0FDF7",
            }}
          >
            <span className="relative w-10 h-10 grid place-items-center shrink-0">
              <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="3" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r={R}
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
              <span className="font-mono text-[11px]">{String(current + 1).padStart(2, "0")}</span>
            </span>

            <div className="min-w-0 hidden sm:block w-[160px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "#82A69A" }}>
                {t.home.step(current + 1, ids.length)}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="font-bold text-[14px] truncate"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {names[current]}
                </motion.div>
              </AnimatePresence>
            </div>

            {!last && (
              <div className="hidden xl:block min-w-0 w-[170px] pl-3" style={{ borderLeft: "1px solid rgba(255,255,255,.1)" }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: "#82A69A" }}>{t.home.nextLabel}</div>
                <div className="font-semibold text-[13px] truncate" style={{ color: "#B4D1C6" }}>{names[current + 1]}</div>
              </div>
            )}
            <div className="hidden md:flex items-center gap-1.5 px-1">
              {ids.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={names[i]}
                  aria-current={i === current ? "step" : undefined}
                  className="nx-focus h-2 rounded-full transition-all duration-300"
                  style={{ width: i === current ? 22 : 8, background: i <= current ? "#34D399" : "rgba(255,255,255,.18)" }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(last ? 0 : current + 1)}
              aria-label={t.home.next}
              className="nx-focus w-10 h-10 grid place-items-center rounded-[12px] shrink-0"
              style={{ border: "1px solid rgba(255,255,255,.12)" }}
            >
              <ArrowDown size={16} style={{ transform: last ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
            </button>

            <Link
              to="/contacto"
              className="nx-focus inline-flex items-center gap-1.5 rounded-[12px] px-3.5 h-10 font-semibold text-[14px] whitespace-nowrap"
              style={{ background: "linear-gradient(135deg,#34D399,#A3E635)", color: "#04261B" }}
            >
              {t.navbar.hablar}
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
