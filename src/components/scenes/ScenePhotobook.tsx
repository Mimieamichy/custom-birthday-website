import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img3 from "@/assets/memory-3.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";

const spreads = [
  { img: img1, title: "Chapter One", text: "From the first day I met you, the world had more color. Today I just want to celebrate you." },
  { img: img2, title: "Your Light", text: "You laugh, and somehow everything around you gets warmer. Never lose that magic." },
  { img: img3, title: "Adventures", text: "Every memory with you feels like a movie scene worth replaying a hundred times." },
  { img: img4, title: "Dreams", text: "May this year bring you everything your heart has been quietly whispering for." },
  { img: img5, title: "Always", text: "Happy birthday, Ajebo. You are loved, today and every day after." },
];

export function ScenePhotobook({ onDone }: { onDone: () => void }) {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [closing, setClosing] = useState(false);
  const x = useMotionValue(0);
  const coverRotate = useTransform(x, [0, 240], [0, -160]);
  const coverOpacity = useTransform(x, [0, 200, 240], [1, 0.5, 0]);

  const handleDragEnd = () => {
    if (x.get() > 120) {
      animate(x, 260, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
      setTimeout(() => setOpened(true), 500);
    } else {
      animate(x, 0, { duration: 0.4 });
    }
  };

  const next = () => {
    if (page < spreads.length - 1) setPage(page + 1);
    else {
      setClosing(true);
      setTimeout(onDone, 1800);
    }
  };

  useEffect(() => {
    if (!opened) return;
    const t = setInterval(() => {
      setPage((p) => {
        if (p < spreads.length - 1) return p + 1;
        clearInterval(t);
        setClosing(true);
        setTimeout(onDone, 1800);
        return p;
      });
    }, 4200);
    return () => clearInterval(t);
  }, [opened, onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a0a14] via-[#28101e] to-[#0f0610] px-6">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-pink-200/70">
        Our Memory Book
      </div>

      <AnimatePresence>
        {closing && (
          <motion.div
            initial={{ rotateY: 0, opacity: 1 }}
            animate={{ rotateY: -180, opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-gradient-to-br from-rose-900 to-pink-950"
            style={{ transformStyle: "preserve-3d" }}
          />
        )}
      </AnimatePresence>

      {!opened ? (
        <div className="relative" style={{ perspective: 1200 }}>
          <div className="relative h-[60vh] max-h-[520px] aspect-[3/4] rounded-r-lg bg-pink-100/5">
            {/* book back (peek) */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-800 to-pink-900 shadow-elegant" />
            <div className="absolute inset-4 rounded-md bg-[#f5e6d3]/95 flex items-center justify-center p-6 text-center">
              <p className="font-display italic text-rose-900 text-2xl">Open to begin…</p>
            </div>

            {/* draggable cover */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 260 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              style={{
                x,
                rotateY: coverRotate,
                opacity: coverOpacity,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 rounded-lg cursor-grab active:cursor-grabbing bg-gradient-to-br from-rose-700 via-rose-800 to-pink-950 shadow-glow ring-1 ring-pink-300/30 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="absolute inset-3 rounded-md ring-1 ring-pink-200/20" />
              <span className="text-5xl mb-4">💝</span>
              <h2 className="font-display text-3xl md:text-4xl text-pink-50">
                For Ajebo
              </h2>
              <p className="mt-3 font-display italic text-pink-200/90">A little book of you</p>
              <motion.div
                animate={{ x: [0, 18, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-pink-100/80"
              >
                Slide to view content →
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-5xl" style={{ perspective: 1500 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-elegant bg-[#f5e6d3]"
              style={{ transformStyle: "preserve-3d", minHeight: "60vh" }}
            >
              <div className="relative overflow-hidden">
                <img src={spreads[page].img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-10 md:p-14 bg-[#f5e6d3] text-rose-950">
                <p className="text-[10px] uppercase tracking-[0.4em] text-rose-700">
                  Page {page + 1} / {spreads.length}
                </p>
                <h3 className="mt-3 font-display text-4xl md:text-5xl">{spreads[page].title}</h3>
                <p className="mt-6 font-display italic text-lg md:text-xl leading-relaxed text-rose-900/90">
                  {spreads[page].text}
                </p>
                <button
                  onClick={next}
                  className="mt-8 self-start rounded-full bg-rose-800 px-6 py-2 text-sm text-pink-50 hover:bg-rose-700 transition"
                >
                  {page === spreads.length - 1 ? "Close book ♥" : "Next page →"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
