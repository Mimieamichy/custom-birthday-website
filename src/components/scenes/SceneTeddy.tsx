import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SceneTeddy({ onDone }: { onDone: () => void }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 2000);
    const t2 = setTimeout(onDone, 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#2a0f1c] via-[#3a1428] to-[#1a0a14] overflow-hidden">
      {/* notes floating */}
      {["🎵", "🎶", "🎵", "🎶", "💕", "🎵"].map((n, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl"
          initial={{ y: "60vh", x: `${20 + i * 12}vw`, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
        >
          {n}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative animate-sway"
      >
        <svg viewBox="0 0 240 280" className="h-[44vh] md:h-[52vh] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          <defs>
            <radialGradient id="fur" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#c8956d" />
              <stop offset="100%" stopColor="#8b5a3c" />
            </radialGradient>
            <radialGradient id="bellyG" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#e8c4a0" />
              <stop offset="100%" stopColor="#b8855a" />
            </radialGradient>
          </defs>

          {/* ears */}
          <circle cx="70" cy="55" r="22" fill="url(#fur)" />
          <circle cx="70" cy="55" r="11" fill="#e8b890" />
          <circle cx="170" cy="55" r="22" fill="url(#fur)" />
          <circle cx="170" cy="55" r="11" fill="#e8b890" />

          {/* head */}
          <circle cx="120" cy="90" r="58" fill="url(#fur)" />
          {/* muzzle */}
          <ellipse cx="120" cy="108" rx="28" ry="22" fill="#e8c4a0" />
          {/* eyes */}
          <circle cx="100" cy="85" r="6" fill="#1a0a05" />
          <circle cx="140" cy="85" r="6" fill="#1a0a05" />
          <circle cx="102" cy="83" r="2" fill="#fff" />
          <circle cx="142" cy="83" r="2" fill="#fff" />
          {/* nose */}
          <ellipse cx="120" cy="102" rx="6" ry="4.5" fill="#1a0a05" />
          {/* mouth (smile) */}
          <path d="M110 115 Q120 122 130 115" stroke="#1a0a05" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* cheek blush */}
          <circle cx="88" cy="105" r="6" fill="#ff8aa8" opacity="0.5" />
          <circle cx="152" cy="105" r="6" fill="#ff8aa8" opacity="0.5" />

          {/* body */}
          <ellipse cx="120" cy="195" rx="58" ry="58" fill="url(#fur)" />
          <ellipse cx="120" cy="200" rx="36" ry="40" fill="url(#bellyG)" />

          {/* legs */}
          <ellipse cx="92" cy="252" rx="20" ry="18" fill="url(#fur)" />
          <ellipse cx="148" cy="252" rx="20" ry="18" fill="url(#fur)" />
          <ellipse cx="92" cy="254" rx="10" ry="7" fill="#e8c4a0" />
          <ellipse cx="148" cy="254" rx="10" ry="7" fill="#e8c4a0" />

          {/* guitar */}
          <g transform="translate(120 200)">
            <ellipse cx="0" cy="0" rx="42" ry="32" fill="#8b3a1a" stroke="#3a1a0a" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="34" ry="24" fill="#a0481f" />
            <circle cx="0" cy="0" r="8" fill="#1a0a05" />
            <rect x="38" y="-5" width="48" height="10" rx="2" fill="#3a1a0a" />
            <rect x="82" y="-9" width="8" height="18" rx="2" fill="#1a0a05" />
            {/* strings */}
            <line x1="-18" y1="-3" x2="84" y2="-3" stroke="#f0e0c0" strokeWidth="0.8" />
            <line x1="-18" y1="0" x2="84" y2="0" stroke="#f0e0c0" strokeWidth="0.8" />
            <line x1="-18" y1="3" x2="84" y2="3" stroke="#f0e0c0" strokeWidth="0.8" />
          </g>

          {/* left arm holding neck */}
          <ellipse cx="180" cy="190" rx="14" ry="22" fill="url(#fur)" transform="rotate(40 180 190)" />

          {/* right arm strumming */}
          <g className="animate-strum" style={{ transformOrigin: "70px 170px" }}>
            <ellipse cx="80" cy="200" rx="13" ry="22" fill="url(#fur)" transform="rotate(-30 80 200)" />
          </g>

          {/* bow tie */}
          <path d="M105 145 L120 152 L135 145 L135 160 L120 152 L105 160 Z" fill="#ff4d7a" />
          <circle cx="120" cy="152" r="3" fill="#c9355c" />
        </svg>
      </motion.div>

      {showText && (
        <motion.h2
          initial={{ opacity: 0, y: 30, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-5xl md:text-7xl text-pink-100 text-center"
          style={{ textShadow: "0 0 30px rgba(255,140,180,0.9), 0 0 60px rgba(255,90,150,0.5)" }}
        >
          ♪ Happy Birthday to U ♪
        </motion.h2>
      )}
    </div>
  );
}
