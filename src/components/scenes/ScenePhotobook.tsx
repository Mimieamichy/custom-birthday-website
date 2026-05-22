import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StarField } from "@/components/StarField";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";

const spreads: { img: string; title: string; body: string }[] = [
  {
    img: img1,
    title: "A new day, a new dawn 🌅",
    body: "It's a new day and a new dawn. I praise God for preserving you throughout the past years. What should have broken you only gave you the strength to fight for tomorrow.",
  },
  {
    img: img2,
    title: "He has been so good 🙏",
    body: "He provided for you and protected you — even on the days you were reckless. He gave you hope that tomorrow would be better, healed you when your body was weary, and caused you to achieve things you only used to dream about. God is truly good.",
  },
  {
    img: img3,
    title: "A prayer for this year ✨",
    body: "I pray that this new year brings you upliftment and breakthroughs beyond human imagination, as well as the wisdom and knowledge to make good decisions and stay on the path destined for you.",
  },
  {
    img: img4,
    title: "My baby, keep going 💫",
    body: "You are destined for greatness, and the world is yet to experience your full impact. Keep going and keep striving. I love you beyond words.",
  },
  {
    img: img1,
    title: "Happy Birthday, Ajebo! 🌹",
    body: "Love you always,\nMami 🌹",
  },
];

export function ScenePhotobook({ onDone }: { onDone: () => void }) {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!opened || closing) return;
    const t = setTimeout(() => {
      if (page < spreads.length - 1) setPage(page + 1);
      else {
        setClosing(true);
        setTimeout(onDone, 2000);
      }
    }, 7500);
    return () => clearTimeout(t);
  }, [opened, page, closing, onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050816] overflow-hidden px-4">
      <StarField count={140} />

      {!opened ? (
        <motion.button
          onClick={() => setOpened(true)}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-10 h-[58vh] max-h-[520px] aspect-[3/4] rounded-md bg-white shadow-[0_20px_60px_rgba(255,150,200,0.25)] cursor-pointer flex flex-col items-center justify-end pb-10"
        >
          <div className="absolute top-10 flex gap-3 text-pink-300">
            <span>♥</span><span>♥</span><span>♥</span>
          </div>
          <svg viewBox="0 0 200 140" className="w-3/4">
            <motion.path
              d="M100 50 C100 50 78 32 64 42 C50 52 56 72 100 96 C144 72 150 52 136 42 C122 32 100 50 100 50 Z"
              fill="#ff5d7a"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ transformOrigin: "100px 65px" }}
            />
            <g>
              <ellipse cx="55" cy="115" rx="28" ry="20" fill="#ffe0d0" stroke="#ffb89a" strokeWidth="1.5" />
              {[0,1,2,3,4].map((f) => (
                <ellipse key={f} cx={35 + f * 10} cy={95 + f * 2} rx="5" ry="11" fill="#ffe0d0" stroke="#ffb89a" strokeWidth="1.5" />
              ))}
            </g>
            <g>
              <ellipse cx="145" cy="115" rx="28" ry="20" fill="#ffe0d0" stroke="#ffb89a" strokeWidth="1.5" />
              {[0,1,2,3,4].map((f) => (
                <ellipse key={f} cx={125 + f * 10} cy={95 + (4-f) * 2} rx="5" ry="11" fill="#ffe0d0" stroke="#ffb89a" strokeWidth="1.5" />
              ))}
            </g>
          </svg>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.35em] text-rose-400"
          >
            Tap to view content
          </motion.div>
        </motion.button>
      ) : (
        <AnimatePresence mode="wait">
          {!closing && (
            <motion.div
              key={page}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                if (page < spreads.length - 1) setPage(page + 1);
                else {
                  setClosing(true);
                  setTimeout(onDone, 2000);
                }
              }}
              className="relative z-10 w-full max-w-md cursor-pointer flex flex-col gap-3"
              style={{ perspective: 1500 }}
            >
              <div
                className="relative rounded-2xl px-5 py-5 text-center shadow-lg"
                style={{ background: "linear-gradient(180deg,#fdf5ea 0%, #f6e6d1 100%)" }}
              >
                <p
                  className="text-lg md:text-xl mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#c4634a" }}
                >
                  {spreads[page].title}
                </p>
                <p
                  className="text-[13px] md:text-sm leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#6b3a2a" }}
                >
                  {spreads[page].body}
                </p>
                <span className="absolute right-3 top-3 text-pink-400 text-xs">💕</span>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white p-2 shadow-[0_20px_60px_rgba(255,150,200,0.25)]">
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <img src={spreads[page].img} alt="" className="h-full w-full object-cover" />
                </div>
              </div>

              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-pink-200/60">
                Page {page + 1} / {spreads.length} · tap to turn
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
