import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { SceneCountdown } from "@/components/scenes/SceneCountdown";
import { SceneTeddy } from "@/components/scenes/SceneTeddy";
import { ScenePhotobook } from "@/components/scenes/ScenePhotobook";
import { SceneFinale } from "@/components/scenes/SceneFinale";
import { startBirthdaySong, stopBirthdaySong, setMuted as setSongMuted } from "@/lib/birthdaySong";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday, Ajebo — A Cinematic Surprise" },
      {
        name: "description",
        content:
          "A magical birthday presentation for Ajebo — emoji rainfall, a singing teddy bear, a memory photobook, and a heart of love.",
      },
      { property: "og:title", content: "Happy Birthday, Ajebo" },
      { property: "og:description", content: "A cinematic birthday surprise made just for you." },
    ],
  }),
});

const SCENES = ["countdown", "teddy", "photobook", "finale"] as const;

function Index() {
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [muted, setMuted] = useState(false);

  const start = () => {
    setStarted(true);
    startBirthdaySong();
  };

  const next = () => setSceneIndex((i) => Math.min(i + 1, SCENES.length - 1));
  const restart = () => {
    setSceneIndex(0);
    startBirthdaySong();
  };

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    setSongMuted(m);
  };

  const scene = SCENES[sceneIndex];
  const isLast = sceneIndex === SCENES.length - 1;

  return (
    <main className="fixed inset-0 overflow-hidden bg-background text-foreground">


      {started && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="glass-strong fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-pink-100 hover:bg-pink-500/20 transition"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M16.5 12l3.5-3.5-1.4-1.4L15.1 10.6 11.6 7.1V17l3.5-3.5 3.5 3.5 1.4-1.4z" />
              <path d="M3 9v6h4l5 5V4L7 9z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02z" />
            </svg>
          )}
        </button>
      )}

      {!started ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#1a0a14] to-[#0f0610]"
        >
          {/* ambient glow */}
          <motion.div
            className="absolute h-[60vw] w-[60vw] max-h-[420px] max-w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,90,170,0.35), transparent 65%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="relative z-10 text-6xl sm:text-7xl mb-6"
          >
            💝
          </motion.div>
          <h1
            className="relative z-10 font-display text-[2.6rem] leading-[1.05] sm:text-5xl md:text-7xl text-pink-100 px-2"
            style={{ textShadow: "0 0 30px rgba(255,140,180,0.8)" }}
          >
            A surprise for Ajebo
          </h1>
          <p className="relative z-10 mt-4 max-w-xs sm:max-w-md text-sm sm:text-base text-pink-200/70">
            Turn your sound up, sit back, and let it unfold.
          </p>

          {/* Non-conventional start "button" — a glowing heart you tap */}
          <motion.button
            onClick={start}
            aria-label="Begin the surprise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileTap={{ scale: 0.9 }}
            className="group relative z-10 mt-12 flex flex-col items-center cursor-pointer"
          >
            {/* pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-0 h-28 w-28 sm:h-32 sm:w-32 rounded-full border border-pink-400/40"
                animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                transition={{ duration: 2.6, delay: i * 0.85, repeat: Infinity, ease: "easeOut" }}
              />
            ))}

            {/* the heart */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-28 w-28 sm:h-32 sm:w-32 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_0_30px_rgba(255,80,160,0.9)]">
                <defs>
                  <radialGradient id="startHeart" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="#ffb6d5" />
                    <stop offset="60%" stopColor="#ff4d8d" />
                    <stop offset="100%" stopColor="#c41e5a" />
                  </radialGradient>
                </defs>
                <path
                  d="M50,86 C50,86 12,60 12,34 C12,20 22,12 34,12 C42,12 47,16 50,22 C53,16 58,12 66,12 C78,12 88,20 88,34 C88,60 50,86 50,86 Z"
                  fill="url(#startHeart)"
                  stroke="rgba(255,200,220,0.7)"
                  strokeWidth="0.8"
                />
              </svg>
              <span className="relative z-10 font-display italic text-white/95 text-base sm:text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                tap me
              </span>
            </motion.div>

            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 text-[10px] uppercase tracking-[0.45em] text-pink-200/80"
            >
              ♥ begin ♥
            </motion.span>
          </motion.button>
        </motion.div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {scene === "countdown" && <SceneCountdown onDone={next} />}
              {scene === "teddy" && <SceneTeddy onDone={next} />}
              {scene === "photobook" && <ScenePhotobook onDone={next} />}
              {scene === "finale" && <SceneFinale onDone={() => {}} />}
            </motion.div>
          </AnimatePresence>

          {/* Subtle progress dots — no nav buttons, let users enjoy */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5">
            {SCENES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  i === sceneIndex ? "w-8 bg-pink-300" : "w-1.5 bg-pink-100/30"
                }`}
              />
            ))}
            {isLast && (
              <button
                onClick={restart}
                className="ml-4 glass-strong rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-pink-100 hover:bg-pink-500/10 transition"
              >
                ↻ Replay
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
