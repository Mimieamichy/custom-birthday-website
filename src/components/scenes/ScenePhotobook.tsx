import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StarField } from "@/components/StarField";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";
import img6 from "@/assets/memory-6.jpg";

const spreads = [
  { imgs: [img1, img2], title: "Happy Birthday Sayang" },
  { imgs: [img3, img4], title: "My Favorite Person" },
  { imgs: [img5, img6], title: "Every Moment With You" },
  { imgs: [img2, img5], title: "You Light Up My World" },
  { imgs: [img1, img4], title: "Forever & Always" },
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
    }, 5500);
    return () => clearTimeout(t);
  }, [opened, page, closing, onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050816] overflow-hidden px-4">
      <StarField count={140} />

      {!opened ? (
        // White card cover with two hands holding a heart
        <motion.button
          onClick={() => setOpened(true)}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-10 h-[58vh] max-h-[520px] aspect-[3/4] rounded-md bg-white shadow-[0_20px_60px_rgba(255,150,200,0.25)] cursor-pointer flex flex-col items-center justify-end pb-10"
        >
          {/* tiny hearts at top */}
          <div className="absolute top-10 flex gap-3 text-pink-300">
            <span>♥</span><span>♥</span><span>♥</span>
          </div>

          {/* hands holding heart */}
          <svg viewBox="0 0 200 140" className="w-3/4">
            {/* heart */}
            <motion.path
              d="M100 50 C100 50 78 32 64 42 C50 52 56 72 100 96 C144 72 150 52 136 42 C122 32 100 50 100 50 Z"
              fill="#ff5d7a"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ transformOrigin: "100px 65px" }}
            />
            {/* left hand */}
            <g>
              <ellipse cx="55" cy="115" rx="28" ry="20" fill="#ffe0d0" stroke="#ffb89a" strokeWidth="1.5" />
              {[0,1,2,3,4].map((f) => (
                <ellipse key={f} cx={35 + f * 10} cy={95 + f * 2} rx="5" ry="11" fill="#ffe0d0" stroke="#ffb89a" strokeWidth="1.5" />
              ))}
            </g>
            {/* right hand */}
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
              className="relative z-10 w-full max-w-md cursor-pointer flex flex-col gap-4"
              style={{ perspective: 1500 }}
            >
              {/* Cream message card */}
              <div
                className="rounded-2xl px-6 py-6 text-center shadow-lg"
                style={{ background: "linear-gradient(180deg,#fdf5ea 0%, #f6e6d1 100%)" }}
              >
                <p
                  className="text-xl md:text-2xl"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "#c4634a",
                  }}
                >
                  {spreads[page].title} <span className="text-orange-500">♥</span>
                </p>
                <span className="absolute right-4 top-4 text-pink-400 text-sm">💕</span>
              </div>

              {/* Two photos side by side */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden bg-white p-2 shadow-[0_20px_60px_rgba(255,150,200,0.25)]">
                {spreads[page].imgs.map((src, i) => (
                  <div key={i} className="aspect-[3/4] overflow-hidden rounded-lg">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
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
