import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";
import img6 from "@/assets/memory-6.jpg";

const images = [img1, img2, img3, img4, img5, img6, img1, img2, img3, img4, img5, img6];

// Positions on a heart-shaped lattice (percentages of 600x600 box)
const heartPositions = [
  { x: 30, y: 18 }, { x: 50, y: 12 }, { x: 70, y: 18 },
  { x: 18, y: 32 }, { x: 38, y: 30 }, { x: 62, y: 30 }, { x: 82, y: 32 },
  { x: 28, y: 50 }, { x: 50, y: 48 }, { x: 72, y: 50 },
  { x: 40, y: 68 }, { x: 60, y: 68 },
];

export function HeartCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[600px]">
      {/* Glow behind heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-primary/30 blur-[80px]"
      />

      {/* Heart outline silhouette */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <defs>
          <radialGradient id="heartGlow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="oklch(0.65 0.24 18 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 18 / 0)" />
          </radialGradient>
        </defs>
        <path
          d="M50,88 C50,88 8,60 8,32 C8,18 18,8 32,8 C40,8 46,12 50,20 C54,12 60,8 68,8 C82,8 92,18 92,32 C92,60 50,88 50,88 Z"
          fill="url(#heartGlow)"
        />
      </motion.svg>

      {/* Photos animating into heart */}
      {heartPositions.map((pos, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            rotate: Math.random() * 180 - 90,
          }}
          animate={
            inView
              ? { opacity: 1, scale: 1, x: 0, y: 0, rotate: (i % 2 === 0 ? -1 : 1) * 4 }
              : {}
          }
          transition={{
            duration: 1.4,
            delay: 0.6 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="group relative h-14 w-14 overflow-hidden rounded-xl shadow-glow ring-1 ring-primary/40 md:h-20 md:w-20">
            <img
              src={images[i]}
              alt={`memory ${i + 1}`}
              loading="lazy"
              width={80}
              height={80}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-accent animate-sparkle"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: "0 0 10px oklch(0.82 0.12 8 / 0.9)",
          }}
        />
      ))}
    </div>
  );
}
