import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { StarField } from "@/components/StarField";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";
import img6 from "@/assets/memory-6.jpg";

const imgs = [img1, img2, img3, img4, img5, img6];

function buildHeartPositions(rings: number, perRing: number) {
  const pts: { x: number; y: number }[] = [];
  for (let r = 1; r <= rings; r++) {
    const scale = r / rings;
    const count = Math.max(6, Math.round(perRing * scale));
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      const nx = (hx / 17) * scale;
      const ny = (-hy / 15) * scale;
      pts.push({ x: 50 + nx * 38, y: 50 + ny * 38 });
    }
  }
  return pts;
}

export function SceneFinale({ onDone }: { onDone: () => void }) {
  const positions = useMemo(() => buildHeartPositions(4, 16), []);

  useEffect(() => {
    const t = setTimeout(onDone, 14000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050816] overflow-hidden">
      <StarField count={160} />

      {/* Blue glow behind heart */}
      <motion.div
        className="absolute h-[70vh] w-[70vh] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,191,255,0.35), transparent 60%)" }}
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative mx-auto aspect-square w-[min(78vh,92vw)]">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 800,
              rotate: Math.random() * 360 - 180,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: (Math.random() - 0.5) * 30,
            }}
            transition={{
              duration: 2.2,
              delay: 0.3 + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: i,
            }}
          >
            <div
              className="overflow-hidden rounded-md bg-white p-[3px]"
              style={{
                width: "clamp(38px, 8vw, 78px)",
                height: "clamp(48px, 10vw, 96px)",
                boxShadow:
                  "0 0 14px rgba(0,191,255,0.9), 0 0 30px rgba(0,122,255,0.5)",
              }}
            >
              <img
                src={imgs[i % imgs.length]}
                alt=""
                className="h-full w-full object-cover rounded-sm"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute top-10 left-0 right-0 text-center px-6 z-20"
      >
        <h2
          className="font-display text-3xl md:text-5xl text-blue-100"
          style={{ textShadow: "0 0 30px rgba(0,191,255,0.9)" }}
        >
          You are so loved, Ajebo 💙
        </h2>
      </motion.div>
    </div>
  );
}
