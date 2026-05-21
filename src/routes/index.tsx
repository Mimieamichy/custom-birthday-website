import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { SceneCountdown } from "@/components/scenes/SceneCountdown";
import { SceneTeddy } from "@/components/scenes/SceneTeddy";
import { ScenePhotobook } from "@/components/scenes/ScenePhotobook";
import { SceneFinale } from "@/components/scenes/SceneFinale";
import { MusicToggle } from "@/components/MusicToggle";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio("https://cdn.pixabay.com/audio/2022/10/30/audio_347758af69.mp3");
    a.loop = true;
    a.volume = 0.45;
    audioRef.current = a;
    return () => a.pause();
  }, []);

  const start = () => {
    setStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  const next = () => setSceneIndex((i) => Math.min(i + 1, SCENES.length - 1));
  const prev = () => setSceneIndex((i) => Math.max(i - 1, 0));
  const restart = () => {
    setSceneIndex(0);
    audioRef.current?.play().catch(() => {});
  };

  const scene = SCENES[sceneIndex];
  const isLast = sceneIndex === SCENES.length - 1;

  return (
    <main className="fixed inset-0 overflow-hidden bg-background text-foreground">
      <MusicToggle />

      {!started ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#1a0a14] to-[#0f0610]"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            💝
          </motion.div>
          <h1
            className="font-display text-5xl md:text-7xl text-pink-100"
            style={{ textShadow: "0 0 30px rgba(255,140,180,0.8)" }}
          >
            A surprise for Ajebo
          </h1>
          <p className="mt-4 max-w-md text-pink-200/70">
            Turn your sound up. Press play and let it unfold.
          </p>
          <button
            onClick={start}
            className="mt-10 group relative rounded-full bg-gradient-to-r from-rose-600 to-pink-500 px-10 py-4 text-sm uppercase tracking-[0.3em] text-white shadow-glow hover:scale-105 transition"
          >
            ▶ Begin
          </button>
        </motion.div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {scene === "countdown" && <SceneCountdown onDone={next} />}
              {scene === "teddy" && <SceneTeddy onDone={next} />}
              {scene === "photobook" && <ScenePhotobook onDone={next} />}
              {scene === "finale" && <SceneFinale onDone={() => {}} />}
            </motion.div>
          </AnimatePresence>

          {/* Scene navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
            <button
              onClick={prev}
              disabled={sceneIndex === 0}
              className="glass-strong rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-pink-100 disabled:opacity-30 hover:bg-pink-500/10 transition"
            >
              ← Prev
            </button>
            <div className="flex gap-1.5">
              {SCENES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === sceneIndex ? "w-8 bg-pink-300" : "w-1.5 bg-pink-100/30"
                  }`}
                />
              ))}
            </div>
            {isLast ? (
              <button
                onClick={restart}
                className="glass-strong rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-pink-100 hover:bg-pink-500/10 transition"
              >
                ↻ Replay
              </button>
            ) : (
              <button
                onClick={next}
                className="glass-strong rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-pink-100 hover:bg-pink-500/10 transition"
              >
                Next →
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
