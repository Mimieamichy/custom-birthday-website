import { useMemo } from "react";

interface Props {
  emojis?: string[];
  count?: number;
  className?: string;
  speed?: number; // seconds for one fall
}

export function EmojiRain({
  emojis = ["�", "�", "❄️", "🧊", "🌊", "�"],
  count = 60,
  className = "",
  speed = 7,
}: Props) {
  // Uniform waterfall: evenly spaced columns, identical speed, staggered start
  const drops = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const col = (i / count) * 100;
      const jitter = (Math.random() - 0.5) * (100 / count) * 0.6;
      return {
        id: i,
        left: col + jitter,
        size: 20,
        // stagger across the duration so the stream is continuous & uniform
        delay: -((i / count) * speed) - Math.random() * 0.3,
        emoji: emojis[i % emojis.length],
      };
    });
  }, [count, emojis, speed]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute select-none"
          style={{
            left: `${d.left}%`,
            top: 0,
            fontSize: `${d.size}px`,
            animation: `fall ${speed}s linear ${d.delay}s infinite`,
            filter: "drop-shadow(0 0 8px rgba(0,191,255,0.55))",
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
