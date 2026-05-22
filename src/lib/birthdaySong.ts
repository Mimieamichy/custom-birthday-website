// Synthesized "Happy Birthday" melody via Web Audio API.
// Guaranteed to play (no network), triggered after user gesture.

const NOTES: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0,
  A4: 440.0, Bb4: 466.16, B4: 493.88, C5: 523.25, D5: 587.33,
  E5: 659.25, F5: 698.46,
};

// [note, beats]
const MELODY: [string, number][] = [
  ["C4", 0.75], ["C4", 0.25], ["D4", 1], ["C4", 1], ["F4", 1], ["E4", 2],
  ["C4", 0.75], ["C4", 0.25], ["D4", 1], ["C4", 1], ["G4", 1], ["F4", 2],
  ["C4", 0.75], ["C4", 0.25], ["C5", 1], ["A4", 1], ["F4", 1], ["E4", 1], ["D4", 2],
  ["Bb4", 0.75], ["Bb4", 0.25], ["A4", 1], ["F4", 1], ["G4", 1], ["F4", 3],
];

let ctx: AudioContext | null = null;
let stopped = false;
let timer: number | null = null;

export function startBirthdaySong() {
  stopped = false;
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext);
    if (!AC) return;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();

  const playOnce = () => {
    if (stopped || !ctx) return;
    const tempo = 0.42; // seconds per beat
    let t = ctx.currentTime + 0.05;
    for (const [n, b] of MELODY) {
      const freq = NOTES[n];
      const dur = b * tempo;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur);
      t += dur;
    }
    const totalMs = (t - ctx.currentTime) * 1000 + 800;
    timer = window.setTimeout(playOnce, totalMs);
  };
  playOnce();
}

export function stopBirthdaySong() {
  stopped = true;
  if (timer) { clearTimeout(timer); timer = null; }
  if (ctx) { ctx.close().catch(() => {}); ctx = null; }
}

export function setMuted(muted: boolean) {
  if (!ctx) return;
  if (muted) ctx.suspend();
  else ctx.resume();
}
