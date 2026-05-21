import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio("https://cdn.pixabay.com/audio/2022/10/30/audio_347758af69.mp3");
    a.loop = true;
    a.volume = 0.4;
    audioRef.current = a;
    return () => {
      a.pause();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="glass-strong fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-primary shadow-glow hover:bg-primary/20 transition-colors"
    >
      {playing ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {playing && (
        <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
      )}
    </motion.button>
  );
}
