import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { EmojiRain } from "@/components/EmojiRain";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";
import img6 from "@/assets/memory-6.jpg";

const imgs = [img1, img2, img3, img4, img5, img6];

// Parametric heart curve sampled into a tile grid.
// Returns positions in percent (centered around 50,50).
function buildHeartPositions(rings: number, perRing: number) {
  const pts: { x: number; y: number }[] = [];
  for (let r = 1; r <= rings; r++) {
    const scale = r / rings; // 0..1
    const count = Math.max(6, Math.round(perRing * scale));
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      // normalize (~ -17..17 for x, -12..15 for y) to percent (-1..1)
      const nx = (hx / 17) * scale;
      const ny = (-hy / 15) * scale; // flip y for screen
      pts.push({ x: 50 + nx * 42, y: 50 + ny * 42 });
    }
  }
  return pts;
}

export function SceneFinale({ onDone }: { onDone: () => void }) {
  const positions = useMemo(() => buildHeartPositions(4, 18), []);

  useEffect(() => {
    const t = setTimeout(onDone, 14000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1a0a14] via-[#28101e] to-[#1a0a14] overflow-hidden">
      <EmojiRain
        count={90}
        speed={8}
        emojis={["❤️", "💛", "💚", "💙", "💜", "🧡", "🩷", "🤍", "💖"]}
      />

      <motion.div
        className="absolute h-[80vh] w-[80vh] rounded-full bg-pink-500/15 blur-[120px]"
        animate={{ scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative mx-auto aspect-square w-[min(86vh,90vw)]">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: (Math.random() - 0.5) * 900,
              y: (Math.random() - 0.5) * 900,
              rotate: Math.random() * 360 - 180,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: (i % 2 === 0 ? -1 : 1) * 3,
            }}
            transition={{
              duration: 2.4,
              delay: 0.4 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="h-10 w-10 md:h-14 md:w-14 overflow-hidden rounded-lg ring-1 ring-pink-300/40 shadow-[0_0_18px_rgba(255,120,170,0.4)]">
              <img
                src={imgs[i % imgs.length]}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 2 }}
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
