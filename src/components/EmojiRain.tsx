import { useMemo } from "react";

interface Props {
  emojis?: string[];
  count?: number;
  className?: string;
}

export function EmojiRain({
  emojis = ["💖", "💕", "🌸", "💗", "🩷", "💓"],
  count = 60,
  className = "",
}: Props) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 22 + 14,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 4,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        opacity: Math.random() * 0.5 + 0.5,
      })),
    [count, emojis]
  );

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
            opacity: d.opacity,
            animation: `fall ${d.duration}s linear ${d.delay}s infinite`,
            filter: "drop-shadow(0 0 8px rgba(255,150,180,0.5))",
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
