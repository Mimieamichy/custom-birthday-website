import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { EmojiRain } from "@/components/EmojiRain";

export function SceneCountdown({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0); // 0,1,2 -> 1,2,3 then 3 -> burst

  useEffect(() => {
    if (step < 4) {
      const t = setTimeout(() => setStep(step + 1), step === 3 ? 2800 : 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 200);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1a0a14] via-[#2a0f1c] to-[#1a0a14]">
      <EmojiRain count={70} emojis={["💖", "💕", "🌸", "💗", "🩷"]} />

      <motion.div
        className="absolute h-[70vh] w-[70vh] rounded-full bg-pink-400/15 blur-[120px]"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {step < 3 && (
          <motion.div
            key={step}
            initial={{ scale: 0.2, opacity: 0, filter: "blur(30px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 2.5, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[18rem] text-pink-200 text-glow leading-none"
            style={{ textShadow: "0 0 60px rgba(255,120,170,0.9), 0 0 120px rgba(255,80,140,0.6)" }}
          >
            {step + 1}
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            key="burst"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 px-8 text-center"
          >
            {/* Burst rays */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1 origin-left rounded-full bg-pink-300/70"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 400, opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, delay: 0.1, repeat: Infinity, repeatDelay: 0.6 }}
                style={{
                  transform: `translate(-50%,-50%) rotate(${i * 20}deg)`,
                  boxShadow: "0 0 20px rgba(255,150,200,0.8)",
                }}
              />
            ))}
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="font-display text-6xl md:text-9xl text-pink-100"
              style={{ textShadow: "0 0 40px rgba(255,120,180,1), 0 0 90px rgba(255,80,150,0.7)" }}
            >
              Happy Birthday
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 font-display italic text-4xl md:text-6xl text-pink-200"
              style={{ textShadow: "0 0 30px rgba(255,140,180,0.8)" }}
            >
              to you, Ajebo 🎉
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
