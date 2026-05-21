import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { SceneCountdown } from "@/components/scenes/SceneCountdown";
import { SceneTeddy } from "@/components/scenes/SceneTeddy";
import { ScenePhotobook } from "@/components/scenes/ScenePhotobook";
import { SceneFinale } from "@/components/scenes/SceneFinale";

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

// Multiple fallbacks so at least one plays
const SONG_SOURCES = [
  "https://cdn.pixabay.com/audio/2022/10/30/audio_347758af69.mp3",
  "https://cdn.pixabay.com/audio/2023/05/15/audio_56e3d6df88.mp3",
  "https://cdn.pixabay.com/audio/2022/08/02/audio_2dde668d05.mp3",
];

function Index() {
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const start = () => {
    setStarted(true);
    const a = audioRef.current;
    if (a) {
      a.muted = false;
      a.volume = 0.5;
      a.play().catch((err) => console.warn("audio play blocked", err));
    }
  };

  const next = () => setSceneIndex((i) => Math.min(i + 1, SCENES.length - 1));
  const restart = () => {
    setSceneIndex(0);
    audioRef.current?.play().catch(() => {});
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
    if (!a.muted) a.play().catch(() => {});
  };

  const scene = SCENES[sceneIndex];
  const isLast = sceneIndex === SCENES.length - 1;

  return (
    <main className="fixed inset-0 overflow-hidden bg-background text-foreground">
      {/* Single audio element with multiple sources for reliability */}
      <audio ref={audioRef} loop preload="auto" playsInline crossOrigin="anonymous">
        {SONG_SOURCES.map((src) => (
          <source key={src} src={src} type="audio/mpeg" />
        ))}
      </audio>

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
            Turn your sound up, sit back, and let it unfold.
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
