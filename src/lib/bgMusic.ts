// Background music player for "Ride for Me - B Young".
// Drop the audio file into /public as `ride-for-me.mp3` (or change SRC below).

const SRC = "/ride-for-me.mp3";

let audio: HTMLAudioElement | null = null;
let muted = false;

function ensure(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
  }
  return audio;
}

export function startBgMusic() {
  const a = ensure();
  if (muted) return;
  a.play().catch(() => {});
}

export function pauseBgMusic() {
  if (audio) audio.pause();
}

export function resumeBgMusic() {
  if (!audio || muted) return;
  audio.play().catch(() => {});
}

export function setBgMuted(m: boolean) {
  muted = m;
  if (!audio) return;
  if (m) audio.pause();
  else audio.play().catch(() => {});
}
