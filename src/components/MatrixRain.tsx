import { useMemo } from "react";

// Pink digital "matrix" rain — vertical streaks of falling characters
export function MatrixRain({ columns = 28 }: { columns?: number }) {
  const cols = useMemo(() => {
    const chars = "01アカサタナハマヤラワ♥+*<>/|ABCXYZ".split("");
    return Array.from({ length: columns }, (_, i) => {
      const charCount = 18 + Math.floor(Math.random() * 14);
      return {
        id: i,
        left: (i / columns) * 100 + (Math.random() - 0.5) * (50 / columns),
        delay: -Math.random() * 6,
        duration: 5 + Math.random() * 4,
        chars: Array.from({ length: charCount }, () => chars[Math.floor(Math.random() * chars.length)]),
        fontSize: 14 + Math.random() * 10,
      };
    });
  }, [columns]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {cols.map((c) => (
        <div
          key={c.id}
          className="absolute top-0 flex flex-col items-center font-mono leading-[1.05] select-none"
          style={{
            left: `${c.left}%`,
            fontSize: c.fontSize,
            animation: `matrixFall ${c.duration}s linear ${c.delay}s infinite`,
            color: "#ff3d8a",
            textShadow: "0 0 8px rgba(255,60,140,0.9), 0 0 18px rgba(255,80,160,0.5)",
          }}
        >
          {c.chars.map((ch, idx) => (
            <span
              key={idx}
              style={{
                opacity: Math.max(0.08, 1 - idx / c.chars.length),
                color: idx === 0 ? "#ffd6ea" : undefined,
                textShadow: idx === 0 ? "0 0 14px #ff7ab3, 0 0 28px #ff3d8a" : undefined,
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
