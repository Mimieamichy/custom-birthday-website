import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

export function Particles({ count = 40, className = "" }: ParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 15,
        duration: Math.random() * 15 + 15,
        opacity: Math.random() * 0.5 + 0.3,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-primary blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 4}px oklch(0.65 0.24 18 / 0.8)`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingHearts({ count = 12 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 16 + 12,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 18,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <svg
          key={h.id}
          viewBox="0 0 24 24"
          className="absolute text-primary/60"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animation: `drift ${h.duration}s linear ${h.delay}s infinite`,
            filter: `drop-shadow(0 0 ${h.size / 2}px oklch(0.65 0.24 18 / 0.9))`,
          }}
        >
          <path
            fill="currentColor"
            d="M12 21s-7-4.5-9.5-9C1 9 3 5 7 5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6 4 4.5 7-2.5 4.5-9.5 9-9.5 9z"
          />
        </svg>
      ))}
    </div>
  );
}
