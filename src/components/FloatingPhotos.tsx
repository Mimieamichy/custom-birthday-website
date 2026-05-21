import { motion } from "framer-motion";
import img1 from "@/assets/memory-1.jpg";
import img2 from "@/assets/memory-2.jpg";
import img4 from "@/assets/memory-4.jpg";
import img5 from "@/assets/memory-5.jpg";

const photos = [
  { src: img1, top: "10%", left: "8%", rotate: -8, delay: 0, size: "w-44 h-56" },
  { src: img2, top: "20%", right: "10%", rotate: 6, delay: 0.2, size: "w-40 h-52" },
  { src: img4, bottom: "20%", left: "14%", rotate: 5, delay: 0.4, size: "w-48 h-60" },
  { src: img5, bottom: "12%", right: "8%", rotate: -7, delay: 0.6, size: "w-44 h-56" },
];

export function FloatingPhotos() {
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-5xl">
      {photos.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 80, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${p.size} animate-float-soft`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          <div className="glass-strong relative h-full w-full overflow-hidden rounded-2xl p-2 shadow-elegant">
            <img
              src={p.src}
              alt=""
              loading="lazy"
              className="h-full w-full rounded-xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/30" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
