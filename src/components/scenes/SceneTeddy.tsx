import { motion } from "framer-motion";
import { useEffect } from "react";
import { StarField } from "@/components/StarField";
import { startBirthdaySong, stopBirthdaySong } from "@/lib/birthdaySong";
import { pauseBgMusic, resumeBgMusic } from "@/lib/bgMusic";

const LETTERS = "HAPPY BIRTHDAY".split("");
const CANDLE_COLORS = [
  "#4dabf7", "#3bc9db", "#38d9a9", "#6bcf7f", "#4dabf7",
  "#9775fa", "#748ffc",
  "#4dabf7", "#3bc9db", "#38d9a9", "#6bcf7f", "#4dabf7", "#9775fa", "#748ffc",
];

export function SceneTeddy({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    pauseBgMusic();
    startBirthdaySong();
    const t = setTimeout(onDone, 11000);
    return () => {
      clearTimeout(t);
      stopBirthdaySong();
      resumeBgMusic();
    };
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050816] overflow-hidden">
      <StarField count={150} />

      {/* HAPPY BIRTHDAY arched candle letters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-2 flex items-end gap-[2px] sm:gap-1 md:gap-2 px-2"
      >
        {LETTERS.map((ch, i) => {
          const color = CANDLE_COLORS[i % CANDLE_COLORS.length];
          // arch effect
          const mid = (LETTERS.length - 1) / 2;
          const arc = -Math.pow((i - mid) / mid, 2) * 30 + 10;
          if (ch === " ") return <span key={i} className="w-3 md:w-5" />;
          return (
            <div
              key={i}
              className="relative flex flex-col items-center"
              style={{ transform: `translateY(${arc}px)` }}
            >
              {/* flame */}
              <span
                className="block h-3 w-2 rounded-full"
                style={{
                  background: "radial-gradient(circle, #a8f7ff 0%, #4db8ff 60%, transparent 100%)",
                  boxShadow: "0 0 12px #00d7ff, 0 0 24px #2e9dff",
                  animation: `candleFlicker ${0.6 + Math.random() * 0.6}s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
              {/* candle body letter */}
              <div
                className="relative flex h-7 w-5 items-center justify-center rounded-sm sm:h-10 sm:w-7 md:h-14 md:w-10 font-extrabold text-white text-[11px] sm:text-lg md:text-2xl"
                style={{
                  background: `linear-gradient(180deg, ${color} 0%, ${color}dd 60%, ${color}88 100%)`,
                  boxShadow: `0 0 14px ${color}99, inset 0 -6px 8px rgba(0,0,0,0.25)`,
                  textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {ch}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Cute white cat playing guitar */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative animate-sway"
      >
        <svg viewBox="0 0 220 240" className="h-[38vh] md:h-[46vh] w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {/* ears */}
          <path d="M70 60 L80 25 L100 55 Z" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          <path d="M150 60 L140 25 L120 55 Z" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          <path d="M78 50 L84 35 L94 52 Z" fill="#b6e1ff" />
          <path d="M142 50 L136 35 L126 52 Z" fill="#b6e1ff" />

          {/* head */}
          <circle cx="110" cy="80" r="48" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          {/* eyes closed/happy */}
          <path d="M88 78 Q94 72 100 78" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M120 78 Q126 72 132 78" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* cheeks */}
          <circle cx="86" cy="92" r="5" fill="#b6e1ff" opacity="0.7" />
          <circle cx="134" cy="92" r="5" fill="#b6e1ff" opacity="0.7" />
          {/* nose */}
          <path d="M107 88 L113 88 L110 92 Z" fill="#8ab6ff" />
          {/* mouth */}
          <path d="M104 95 Q110 100 116 95" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* whiskers */}
          <line x1="70" y1="92" x2="85" y2="93" stroke="#bbb" strokeWidth="1" />
          <line x1="70" y1="98" x2="85" y2="97" stroke="#bbb" strokeWidth="1" />
          <line x1="135" y1="93" x2="150" y2="92" stroke="#bbb" strokeWidth="1" />
          <line x1="135" y1="97" x2="150" y2="98" stroke="#bbb" strokeWidth="1" />

          {/* body */}
          <ellipse cx="110" cy="170" rx="48" ry="50" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          <ellipse cx="110" cy="180" rx="30" ry="34" fill="#fafafa" />

          {/* guitar */}
          <g transform="translate(110 175)">
            <ellipse cx="0" cy="0" rx="36" ry="28" fill="#d2691e" stroke="#5c2e0e" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="28" ry="20" fill="#e6873b" />
            <circle cx="0" cy="0" r="6" fill="#2a1505" />
            <rect x="32" y="-4" width="42" height="8" rx="2" fill="#3a1a0a" />
            <rect x="70" y="-7" width="7" height="14" rx="2" fill="#1a0a05" />
            <line x1="-15" y1="-2" x2="72" y2="-2" stroke="#f0e0c0" strokeWidth="0.6" />
            <line x1="-15" y1="0" x2="72" y2="0" stroke="#f0e0c0" strokeWidth="0.6" />
            <line x1="-15" y1="2" x2="72" y2="2" stroke="#f0e0c0" strokeWidth="0.6" />
          </g>

          {/* paw on neck */}
          <ellipse cx="168" cy="170" rx="10" ry="14" fill="#fff" stroke="#ddd" strokeWidth="1.5" transform="rotate(35 168 170)" />
          {/* paw strumming */}
          <g className="animate-strum" style={{ transformOrigin: "78px 150px" }}>
            <ellipse cx="80" cy="178" rx="10" ry="14" fill="#fff" stroke="#ddd" strokeWidth="1.5" transform="rotate(-25 80 178)" />
          </g>

          {/* feet */}
          <ellipse cx="88" cy="218" rx="14" ry="9" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
          <ellipse cx="132" cy="218" rx="14" ry="9" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* floating notes */}
      {["♪", "♫", "♩", "♬", "♪"].map((n, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl text-pink-200/80"
          initial={{ y: "50vh", x: `${30 + i * 10}vw`, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ duration: 6, delay: i * 1.1, repeat: Infinity, ease: "easeOut" }}
        >
          {n}
        </motion.span>
      ))}
    </div>
  );
}
