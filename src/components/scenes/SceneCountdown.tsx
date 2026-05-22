import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MatrixRain } from "@/components/MatrixRain";

export function SceneCountdown({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0); // 0,1,2 -> 1,2,3 ; 3 -> HAPPY, 4 BIRTHDAY, 5 TO YOU, 6 AJEBO
  const seq = ["1", "2", "3", "HAPPY", "BIRTHDAY", "TO", "YOU", "AJEBO"];

  useEffect(() => {
    if (step < seq.length) {
      const t = setTimeout(() => setStep(step + 1), 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [step, onDone, seq.length]);

  const current = seq[step];
  const isNum = step < 3;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
      <MatrixRain columns={32} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={step}
            initial={{ scale: 0.4, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.6, opacity: 0, filter: "blur(14px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 px-6 text-center font-extrabold tracking-tight"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              color: "#ff6fb5",
              fontSize: isNum ? "clamp(8rem, 28vw, 22rem)" : "clamp(4rem, 16vw, 14rem)",
              textShadow:
                "0 0 30px rgba(255,80,160,0.95), 0 0 60px rgba(255,60,140,0.7), 0 0 100px rgba(255,40,120,0.5)",
              WebkitTextStroke: "2px rgba(255,180,210,0.6)",
            }}
          >
            {current}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
