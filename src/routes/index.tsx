import { useState } from "react";
import { motion } from "framer-motion";
import { IntroSequence } from "@/components/IntroSequence";
import { Particles, FloatingHearts } from "@/components/Particles";
import { HeartCollage } from "@/components/HeartCollage";
import { FloatingPhotos } from "@/components/FloatingPhotos";
import { MusicToggle } from "@/components/MusicToggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Our Story — A Love Letter in Motion" },
      {
        name: "description",
        content:
          "An immersive cinematic love story. Glowing hearts, floating memories, and a personal message — designed to be felt.",
      },
      { property: "og:title", content: "Our Story — A Love Letter in Motion" },
      {
        property: "og:description",
        content: "A cinematic, emotional digital memory. Press play.",
      },
    ],
  }),
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}
      <MusicToggle />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <Particles count={50} />
        <FloatingHearts count={10} />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introDone ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
            A Cinematic Memory
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={introDone ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl leading-[1.05] text-foreground md:text-8xl lg:text-9xl"
          >
            <span className="text-glow">Forever</span>
            <span className="block italic text-accent text-glow-soft">in motion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 1, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Scroll gently. This is a love letter written in light, sound, and memory —
            made to be felt, not read.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <div className="flex h-12 w-7 items-start justify-center rounded-full border border-foreground/20 p-1.5">
              <motion.span
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-2 w-1 rounded-full bg-primary"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* HEART REVEAL */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-accent">Chapter One</p>
            <h2 className="font-display text-5xl md:text-7xl text-foreground">
              The first <span className="italic text-glow text-primary">heartbeat</span>.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground leading-relaxed">
              Every story has a moment where everything changes. A glance. A pause.
              A breath held just a little too long. This one began with yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-72 md:w-96"
          >
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-[80px] animate-glow-pulse" />
            <svg viewBox="0 0 100 100" className="relative h-full w-full animate-heart-pulse">
              <defs>
                <linearGradient id="heartFill" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.26 18)" />
                  <stop offset="100%" stopColor="oklch(0.82 0.16 8)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#heartFill)"
                d="M50,88 C50,88 8,60 8,32 C8,18 18,8 32,8 C40,8 46,12 50,20 C54,12 60,8 68,8 C82,8 92,18 92,32 C92,60 50,88 50,88 Z"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* PERSONAL MESSAGE */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-32">
        <Particles count={25} />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong relative mx-auto max-w-3xl rounded-3xl p-10 md:p-16 shadow-elegant"
        >
          <div className="absolute -top-px left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mb-6 text-center text-xs uppercase tracking-[0.4em] text-accent">
            A message for you
          </p>
          <blockquote className="font-display text-3xl leading-snug text-foreground md:text-5xl text-center italic">
            “If I had to write your name in the stars,
            <br />
            I would still run out of <span className="text-glow text-primary not-italic">sky</span>.”
          </blockquote>
          <p className="mt-10 text-center text-sm tracking-[0.3em] uppercase text-muted-foreground">
            — Always, &nbsp; ♥
          </p>
        </motion.div>
      </section>

      {/* FLOATING PHOTOS */}
      <section className="relative px-6 py-32">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-accent">Chapter Two</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-display text-5xl md:text-7xl text-foreground"
          >
            Frozen <span className="italic text-glow-soft text-accent">moments</span>.
          </motion.h2>
        </div>
        <FloatingPhotos />
      </section>

      {/* HEART COLLAGE — centerpiece */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-32">
        <Particles count={40} />
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-3 text-xs uppercase tracking-[0.4em] text-accent"
          >
            All of it
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mb-16 font-display text-5xl md:text-7xl text-foreground"
          >
            A heart made of <span className="italic text-glow text-primary">us</span>.
          </motion.h2>
          <HeartCollage />
        </div>
      </section>

      {/* ENDING */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-32">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <FloatingHearts count={8} />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl text-foreground text-glow"
          >
            And the story
            <br />
            <span className="italic text-accent">continues...</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mx-auto mt-8 max-w-md text-muted-foreground"
          >
            Press replay to feel it again. Or share it, and let someone else feel it too.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative overflow-hidden rounded-full gradient-heart px-8 py-4 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 5V2L7 7l5 5V8c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z" />
                </svg>
                Replay the story
              </span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Our Story",
                    text: "A love letter in motion. Feel it.",
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="glass-strong rounded-full px-8 py-4 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:shadow-soft-glow"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M18 16c-.79 0-1.5.31-2.04.81L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7-4.07c.55.5 1.28.77 2.09.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.21-.09.43-.09.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16 18 16z" />
                </svg>
                Share
              </span>
            </button>
          </motion.div>

          <p className="mt-20 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            ♥ Made with light
          </p>
        </div>
      </section>
    </main>
  );
}
