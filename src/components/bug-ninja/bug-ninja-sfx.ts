/**
 * Tiny Web Audio arcade SFX — no asset downloads.
 * Sound is ON by default. Must be primed from a user gesture (Start / Play).
 */

type SfxKind = "squash" | "miss" | "wrong" | "wave" | "gameover" | "start";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

const MASTER_GAIN = 0.42;

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;

  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;

  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : MASTER_GAIN;
  master.connect(ctx.destination);
  return ctx;
}

/** Prime AudioContext from a click/tap. Safe to call often; synchronous. */
export function unlockBugNinjaAudio(): void {
  const audio = ensureCtx();
  if (!audio || !master) return;
  if (audio.state === "suspended") {
    void audio.resume().catch(() => {
      /* ignore — next gesture retries */
    });
  }
}

export function setBugNinjaMuted(next: boolean): void {
  muted = next;
  if (!master) ensureCtx();
  if (master) {
    master.gain.value = next ? 0 : MASTER_GAIN;
  }
}

export function isBugNinjaMuted(): boolean {
  return muted;
}

function tone(
  audio: AudioContext,
  dest: AudioNode,
  {
    type = "square",
    freq,
    freqEnd,
    start,
    dur,
    gain = 0.2,
  }: {
    type?: OscillatorType;
    freq: number;
    freqEnd?: number;
    start: number;
    dur: number;
    gain?: number;
  },
) {
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (freqEnd != null) {
    osc.frequency.linearRampToValueAtTime(freqEnd, start + dur);
  }
  // linear ramps avoid exponentialRamp zero-value throws
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.008);
  g.gain.linearRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.03);
}

function noiseBurst(
  audio: AudioContext,
  dest: AudioNode,
  start: number,
  dur: number,
  gain = 0.14,
) {
  const len = Math.max(1, Math.floor(audio.sampleRate * dur));
  const buffer = audio.createBuffer(1, len, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  }
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const g = audio.createGain();
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.005);
  g.gain.linearRampToValueAtTime(0.0001, start + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(dest);
  src.start(start);
  src.stop(start + dur + 0.03);
}

function emit(
  kind: SfxKind,
  audio: AudioContext,
  dest: GainNode,
  opts?: { combo?: number },
) {
  const t = audio.currentTime + 0.01;
  const combo = opts?.combo ?? 1;

  switch (kind) {
    case "start": {
      tone(audio, dest, {
        type: "square",
        freq: 440,
        start: t,
        dur: 0.07,
        gain: 0.22,
      });
      tone(audio, dest, {
        type: "square",
        freq: 660,
        start: t + 0.08,
        dur: 0.09,
        gain: 0.2,
      });
      break;
    }
    case "squash": {
      const base = 440 + Math.min(combo, 10) * 32;
      tone(audio, dest, {
        type: "square",
        freq: base,
        freqEnd: base * 1.9,
        start: t,
        dur: 0.08,
        gain: 0.28,
      });
      tone(audio, dest, {
        type: "triangle",
        freq: base * 1.4,
        freqEnd: base * 2.2,
        start: t + 0.025,
        dur: 0.07,
        gain: 0.16,
      });
      noiseBurst(audio, dest, t, 0.055, 0.12);
      break;
    }
    case "miss": {
      tone(audio, dest, {
        type: "sawtooth",
        freq: 340,
        freqEnd: 95,
        start: t,
        dur: 0.24,
        gain: 0.22,
      });
      tone(audio, dest, {
        type: "square",
        freq: 190,
        freqEnd: 75,
        start: t + 0.04,
        dur: 0.2,
        gain: 0.14,
      });
      break;
    }
    case "wrong": {
      tone(audio, dest, {
        type: "square",
        freq: 170,
        freqEnd: 145,
        start: t,
        dur: 0.14,
        gain: 0.26,
      });
      tone(audio, dest, {
        type: "square",
        freq: 200,
        freqEnd: 155,
        start: t,
        dur: 0.14,
        gain: 0.2,
      });
      tone(audio, dest, {
        type: "triangle",
        freq: 95,
        freqEnd: 55,
        start: t + 0.07,
        dur: 0.18,
        gain: 0.16,
      });
      break;
    }
    case "wave": {
      tone(audio, dest, {
        type: "square",
        freq: 520,
        start: t,
        dur: 0.07,
        gain: 0.2,
      });
      tone(audio, dest, {
        type: "square",
        freq: 780,
        start: t + 0.08,
        dur: 0.1,
        gain: 0.22,
      });
      break;
    }
    case "gameover": {
      tone(audio, dest, {
        type: "sawtooth",
        freq: 280,
        freqEnd: 70,
        start: t,
        dur: 0.32,
        gain: 0.24,
      });
      tone(audio, dest, {
        type: "square",
        freq: 140,
        freqEnd: 50,
        start: t + 0.1,
        dur: 0.36,
        gain: 0.18,
      });
      break;
    }
  }
}

export function playBugNinjaSfx(
  kind: SfxKind,
  opts?: { combo?: number },
): void {
  if (muted) return;

  const audio = ensureCtx();
  if (!audio || !master) return;

  const run = () => {
    if (muted || !master) return;
    try {
      emit(kind, audio, master, opts);
    } catch {
      /* ignore synthesis errors */
    }
  };

  if (audio.state === "suspended") {
    void audio
      .resume()
      .then(run)
      .catch(() => {
        /* still blocked — need another gesture */
      });
    return;
  }

  run();
}
