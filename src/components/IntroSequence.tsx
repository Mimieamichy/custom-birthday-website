import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const lines = ["In every heartbeat...", "there is a story.", "This one is ours."];

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep(step + 1), 1800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 1200);
    }, 1000);
    return () => clearTimeout(t);
  }, [step, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            className="absolute h-[60vh] w-[60vh] rounded-full bg-primary/10 blur-[100px]"
            animate={{ scale: [0.8, 1.2, 0.9], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative text-center px-6">
            <AnimatePresence mode="wait">
              {step < lines.length && (
                <motion.h1
                  key={step}
                  initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl md:text-7xl text-foreground text-glow tracking-tight"
                >
                  {lines[step]}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
