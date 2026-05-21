import { motion } from "framer-motion";
import { useEffect } from "react";
import { EmojiRain } from "@/components/EmojiRain";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";
import img6 from "@/assets/memory-6.jpg";

// Heart-shaped lattice positions (percent within 600x600 box)
const heartPositions = [
  { x: 30, y: 18 }, { x: 50, y: 12 }, { x: 70, y: 18 },
  { x: 18, y: 32 }, { x: 38, y: 30 }, { x: 62, y: 30 }, { x: 82, y: 32 },
  { x: 28, y: 50 }, { x: 50, y: 48 }, { x: 72, y: 50 },
  { x: 40, y: 68 }, { x: 60, y: 68 },
];
const imgs = [img1, img2, img3, img4, img5, img6, img1, img2, img3, img4, img5, img6];

export function SceneFinale({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 9000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1a0a14] via-[#28101e] to-[#1a0a14] overflow-hidden">
      <EmojiRain
        count={80}
        emojis={["❤️", "💛", "💚", "💙", "💜", "🧡", "🩷", "🤍", "💖"]}
      />

      <motion.div
        className="absolute h-[80vh] w-[80vh] rounded-full bg-pink-500/15 blur-[120px]"
        animate={{ scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative mx-auto aspect-square w-[min(86vh,86vw)]">
        {/* heart glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <radialGradient id="finaleHeart" cx="50%" cy="40%">
                <stop offset="0%" stopColor="rgba(255,120,170,0.6)" />
                <stop offset="100%" stopColor="rgba(255,80,140,0)" />
              </radialGradient>
            </defs>
            <path
              d="M50,88 C50,88 8,60 8,32 C8,18 18,8 32,8 C40,8 46,12 50,20 C54,12 60,8 68,8 C82,8 92,18 92,32 C92,60 50,88 50,88 Z"
              fill="url(#finaleHeart)"
            />
          </svg>
        </motion.div>

        {heartPositions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 800,
              rotate: Math.random() * 360 - 180,
              borderRadius: "50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: (i % 2 === 0 ? -1 : 1) * 4,
              borderRadius: "18%",
            }}
            transition={{
              duration: 1.6,
              delay: 0.4 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="h-16 w-16 md:h-24 md:w-24 overflow-hidden shadow-glow ring-1 ring-pink-300/50 rounded-2xl">
              <img src={imgs[i]} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1.4 }}
        className="absolute bottom-12 left-0 right-0 text-center px-6"
      >
        <h2
          className="font-display text-4xl md:text-6xl text-pink-100"
          style={{ textShadow: "0 0 30px rgba(255,140,180,0.9)" }}
        >
          You are so loved, Ajebo 💖
        </h2>
        <p className="mt-3 text-sm tracking-[0.4em] uppercase text-pink-200/70">
          Happy Birthday
        </p>
      </motion.div>
    </div>
  );
}
