"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { BugIcon, PassIcon } from "./BugIcons";
import { cn } from "@/lib/utils";
import {
  isBugNinjaMuted,
  playBugNinjaSfx,
  setBugNinjaMuted,
  unlockBugNinjaAudio,
} from "./bug-ninja-sfx";
import "./bug-ninja.css";

export type BugNinjaPhase = "idle" | "playing" | "finished";

type BugVariant = "standard" | "fast" | "rare" | "regression";
type TargetKind = BugVariant | "pass";

type ArenaTarget = {
  id: string;
  kind: TargetKind;
  x: number;
  y: number;
  points: number;
  lifetimeMs: number;
  expiresAt: number;
  hasRespawned: boolean;
  isRegressionReturn: boolean;
  hitting: boolean;
  escaping: boolean;
  /** Idle preview: no countdown until the hunt starts. */
  frozen: boolean;
  driftX: number;
  driftY: number;
  driftMs: number;
};

type FloatMsg = {
  id: string;
  x: number;
  y: number;
  text: string;
  tone: "good" | "bad" | "warn" | "neutral";
};

type SessionStats = {
  score: number;
  bugsCaught: number;
  passesClicked: number;
  bestCombo: number;
  elapsedMs: number;
};

const STARTING_MISSES = 3;
const HUD_TOP_RESERVE = 0.2;
const EDGE_PAD = 0.07;
const MIN_DIST = 0.13;

function randomId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Desktop idle board: 4 bugs + 1 pass, above the instruction row. */
const IDLE_BOARD: Array<{
  kind: TargetKind;
  points: number;
  x: number;
  y: number;
}> = [
  { kind: "standard", points: 1, x: 0.16, y: 0.38 },
  { kind: "fast", points: 2, x: 0.34, y: 0.52 },
  { kind: "pass", points: 0, x: 0.5, y: 0.36 },
  { kind: "rare", points: 3, x: 0.66, y: 0.5 },
  { kind: "regression", points: 2, x: 0.84, y: 0.4 },
];

function createIdleBoard(): ArenaTarget[] {
  return IDLE_BOARD.map((item) => ({
    id: `idle-${item.kind}-${randomId()}`,
    kind: item.kind,
    x: item.x,
    y: item.y,
    points: item.points,
    lifetimeMs: 0,
    expiresAt: 0,
    hasRespawned: false,
    isRegressionReturn: false,
    hitting: false,
    escaping: false,
    frozen: true,
    driftX: 0,
    driftY: 0,
    driftMs: 0,
  }));
}

function trackBugNinja(
  name: "bug_ninja_started" | "bug_ninja_completed" | "bug_ninja_replayed",
  params?: Record<string, string | number>,
) {
  try {
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", name, params);
  } catch {
    /* optional */
  }
}

function rankTitle(score: number): string {
  if (score <= 20) return "THE BUGS WON.";
  if (score <= 50) return "BUG SPOTTER";
  if (score <= 100) return "BUG HUNTER";
  if (score <= 160) return "BUG NINJA";
  return "RELEASE GUARDIAN";
}

function endLine(score: number): string {
  if (score <= 20) return "Even ninjas miss sometimes.";
  if (score <= 100) return "Not bad. We'll take it from here.";
  return "Your releases are in safe hands.";
}

function comboMultiplier(combo: number): number {
  if (combo >= 12) return 3;
  if (combo >= 6) return 2;
  return 1;
}

function difficultyFor(elapsedMs: number, wave: number) {
  const s = elapsedMs / 1000;
  const waveBoost = Math.min(wave - 1, 6) * 0.04;
  if (s < 40) {
    return {
      maxTargets: 2,
      spawnMs: 1000,
      lifetimeMs: 3400,
      passChance: 0.14,
      fastChance: 0.12,
      rareChance: 0.05,
      regressionChance: 0.08,
      moveChance: 0.35,
    };
  }
  if (s < 100) {
    return {
      maxTargets: 3,
      spawnMs: Math.max(720, 900 - wave * 20),
      lifetimeMs: 2800,
      passChance: 0.18 + waveBoost,
      fastChance: 0.18,
      rareChance: 0.08,
      regressionChance: 0.1,
      moveChance: 0.55,
    };
  }
  return {
    maxTargets: 4,
    spawnMs: Math.max(580, 720 - wave * 15),
    lifetimeMs: 2200,
    passChance: 0.22 + waveBoost * 0.5,
    fastChance: 0.22,
    rareChance: 0.1,
    regressionChance: 0.12,
    moveChance: 0.75,
  };
}

function pickKind(d: ReturnType<typeof difficultyFor>): {
  kind: TargetKind;
  points: number;
  lifetimeScale: number;
} {
  const r = Math.random();
  if (r < d.passChance) return { kind: "pass", points: 0, lifetimeScale: 1.15 };
  if (r < d.passChance + d.rareChance)
    return { kind: "rare", points: 3, lifetimeScale: 0.8 };
  if (r < d.passChance + d.rareChance + d.fastChance)
    return { kind: "fast", points: 2, lifetimeScale: 0.65 };
  if (r < d.passChance + d.rareChance + d.fastChance + d.regressionChance)
    return { kind: "regression", points: 2, lifetimeScale: 1 };
  return { kind: "standard", points: 1, lifetimeScale: 1 };
}

function formatTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

type BugNinjaGameProps = {
  className?: string;
  density?: "strip" | "fullscreen";
  onClose?: () => void;
  showClose?: boolean;
};

export function BugNinjaGame({
  className,
  density = "strip",
  onClose,
  showClose = false,
}: BugNinjaGameProps) {
  const labelId = useId();
  const arenaRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<ArenaTarget[]>([]);
  const phaseRef = useRef<BugNinjaPhase>("idle");
  const scoreRef = useRef(0);
  const missesRef = useRef(STARTING_MISSES);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const bugsCaughtRef = useRef(0);
  const passesClickedRef = useRef(0);
  const waveRef = useRef(1);
  const startedAtRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);
  const pausedAccumRef = useRef(0);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expireTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const regressionTimersRef = useRef<
    Map<string, ReturnType<typeof setTimeout>>
  >(new Map());
  const visibleRef = useRef(true);
  const tabHiddenRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const [phase, setPhase] = useState<BugNinjaPhase>("idle");
  const [targets, setTargets] = useState<ArenaTarget[]>([]);
  const [floats, setFloats] = useState<FloatMsg[]>([]);
  const [score, setScore] = useState(0);
  const [missesLeft, setMissesLeft] = useState(STARTING_MISSES);
  const [combo, setCombo] = useState(0);
  const [wave, setWave] = useState(1);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [banner, setBanner] = useState<string | null>(null);
  const [results, setResults] = useState<SessionStats | null>(null);
  const [soundMuted, setSoundMuted] = useState(false);

  const syncTargets = useCallback((next: ArenaTarget[]) => {
    targetsRef.current = next;
    setTargets(next);
  }, []);

  const clearSpawn = useCallback(() => {
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearSpawn();
    if (tickTimerRef.current) {
      clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
    expireTimersRef.current.forEach((t) => clearTimeout(t));
    expireTimersRef.current.clear();
    regressionTimersRef.current.forEach((t) => clearTimeout(t));
    regressionTimersRef.current.clear();
  }, [clearSpawn]);

  const pushFloat = useCallback((msg: Omit<FloatMsg, "id">) => {
    const id = randomId();
    setFloats((prev) => [...prev.slice(-7), { ...msg, id }]);
    window.setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== id));
    }, 780);
  }, []);

  const flashBanner = useCallback((text: string, ms = 1400) => {
    setBanner(text);
    window.setTimeout(() => {
      setBanner((cur) => (cur === text ? null : cur));
    }, ms);
  }, []);

  const finishGame = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    clearAllTimers();
    window.setTimeout(() => playBugNinjaSfx("gameover"), 90);
    const elapsed =
      Date.now() - startedAtRef.current - pausedAccumRef.current;
    const stats: SessionStats = {
      score: scoreRef.current,
      bugsCaught: bugsCaughtRef.current,
      passesClicked: passesClickedRef.current,
      bestCombo: bestComboRef.current,
      elapsedMs: Math.max(0, elapsed),
    };
    phaseRef.current = "finished";
    setPhase("finished");
    setResults(stats);
    syncTargets([]);
    setBanner(null);
    trackBugNinja("bug_ninja_completed", {
      score: stats.score,
      bugs_caught: stats.bugsCaught,
      passes_clicked: stats.passesClicked,
      best_combo: stats.bestCombo,
      duration_s: Math.round(stats.elapsedMs / 1000),
    });
  }, [clearAllTimers, syncTargets]);

  const registerMiss = useCallback(
    (reason: "escaped" | "pass", x: number, y: number) => {
      comboRef.current = 0;
      setCombo(0);
      const next = Math.max(0, missesRef.current - 1);
      missesRef.current = next;
      setMissesLeft(next);
      playBugNinjaSfx(reason === "pass" ? "wrong" : "miss");
      pushFloat({
        x,
        y,
        text:
          reason === "escaped"
            ? next <= 0
              ? "ESCAPED"
              : `ESCAPED · ${next} left`
            : next <= 0
              ? "FALSE PASS"
              : `FALSE PASS · ${next} left`,
        tone: "warn",
      });
      if (next <= 0) {
        flashBanner("3 misses — hunt over");
        finishGame();
      }
    },
    [finishGame, flashBanner, pushFloat],
  );

  const scheduleExpire = useCallback(
    (target: ArenaTarget) => {
      const existing = expireTimersRef.current.get(target.id);
      if (existing) clearTimeout(existing);

      const remaining = Math.max(400, target.expiresAt - Date.now());
      const expireTimer = setTimeout(() => {
        expireTimersRef.current.delete(target.id);
        const still = targetsRef.current.find(
          (t) => t.id === target.id && !t.hitting && !t.escaping,
        );
        if (!still) return;
        if (still.kind === "pass") {
          syncTargets(targetsRef.current.filter((t) => t.id !== target.id));
          return;
        }
        syncTargets(
          targetsRef.current.map((t) =>
            t.id === target.id ? { ...t, escaping: true } : t,
          ),
        );
        window.setTimeout(() => {
          syncTargets(targetsRef.current.filter((t) => t.id !== target.id));
        }, reducedMotionRef.current ? 0 : 180);
        registerMiss("escaped", still.x, still.y);
      }, remaining);
      expireTimersRef.current.set(target.id, expireTimer);
    },
    [registerMiss, syncTargets],
  );

  const armFrozenTargets = useCallback(() => {
    const d = difficultyFor(0, 1);
    const now = Date.now();
    // First board only: gentler lifetimes so the opening feels fair.
    const openingBonus = 1.55;
    const armed = targetsRef.current.map((t) => {
      if (t.hitting || t.escaping || !t.frozen) return t;
      const scale =
        t.kind === "fast"
          ? 0.85
          : t.kind === "rare"
            ? 0.95
            : t.kind === "pass"
              ? 1.35
              : 1.1;
      const lifetime = Math.round(d.lifetimeMs * scale * openingBonus);
      return {
        ...t,
        frozen: false,
        lifetimeMs: lifetime,
        expiresAt: now + lifetime,
        driftX:
          !reducedMotionRef.current && t.kind !== "pass"
            ? Math.random() > 0.5
              ? 8
              : -8
            : 0,
        driftY:
          !reducedMotionRef.current && t.kind !== "pass"
            ? Math.random() > 0.5
              ? -5
              : 5
            : 0,
        driftMs:
          !reducedMotionRef.current && t.kind !== "pass"
            ? t.kind === "fast"
              ? 2200
              : 3200
            : 0,
      };
    });
    syncTargets(armed);
    armed.forEach((t) => {
      if (!t.hitting && !t.escaping && t.expiresAt > now) scheduleExpire(t);
    });
  }, [scheduleExpire, syncTargets]);

  const trySpawnAt = useCallback(
    (override?: Partial<ArenaTarget> & { kind: TargetKind; points: number }) => {
      if (phaseRef.current !== "playing") return;
      if (!visibleRef.current || tabHiddenRef.current) return;

      const elapsed =
        Date.now() - startedAtRef.current - pausedAccumRef.current;
      const d = difficultyFor(elapsed, waveRef.current);
      const active = targetsRef.current.filter((t) => !t.hitting && !t.escaping);
      if (active.length >= d.maxTargets) return;

      const pick = override
        ? {
            kind: override.kind,
            points: override.points,
            lifetimeScale:
              override.kind === "fast"
                ? 0.65
                : override.kind === "rare"
                  ? 0.8
                  : 1,
          }
        : pickKind(d);

      let x = 0.5;
      let y = 0.55;
      let placed = false;
      for (let attempt = 0; attempt < 14; attempt++) {
        const nx = EDGE_PAD + Math.random() * (1 - EDGE_PAD * 2);
        const ny =
          HUD_TOP_RESERVE +
          Math.random() * (1 - HUD_TOP_RESERVE - EDGE_PAD - 0.04);
        const ok = active.every((t) => {
          const dx = t.x - nx;
          const dy = t.y - ny;
          return Math.hypot(dx, dy) >= MIN_DIST;
        });
        if (ok) {
          x = nx;
          y = ny;
          placed = true;
          break;
        }
      }
      if (!placed) return;

      const lifetime = Math.round(d.lifetimeMs * pick.lifetimeScale);
      const moves =
        !reducedMotionRef.current &&
        pick.kind !== "pass" &&
        Math.random() < d.moveChance;
      const id = override?.id ?? randomId();
      const target: ArenaTarget = {
        id,
        kind: pick.kind,
        x,
        y,
        points: pick.points,
        lifetimeMs: lifetime,
        expiresAt: Date.now() + lifetime,
        hasRespawned: override?.hasRespawned ?? false,
        isRegressionReturn: override?.isRegressionReturn ?? false,
        hitting: false,
        escaping: false,
        frozen: false,
        driftX: moves ? (Math.random() > 0.5 ? 14 : -14) : 0,
        driftY: moves ? (Math.random() > 0.5 ? -10 : 10) : 0,
        driftMs: moves
          ? pick.kind === "fast"
            ? 1400 + Math.random() * 600
            : 2200 + Math.random() * 900
          : 0,
      };

      syncTargets([...targetsRef.current, target]);
      scheduleExpire(target);
    },
    [registerMiss, scheduleExpire, syncTargets],
  );

  const scheduleSpawnLoop = useCallback(() => {
    clearSpawn();
    if (phaseRef.current !== "playing") return;
    if (!visibleRef.current || tabHiddenRef.current) return;

    const elapsed =
      Date.now() - startedAtRef.current - pausedAccumRef.current;
    const d = difficultyFor(elapsed, waveRef.current);
    spawnTimerRef.current = setTimeout(() => {
      trySpawnAt();
      scheduleSpawnLoop();
    }, d.spawnMs);
  }, [clearSpawn, trySpawnAt]);

  const pauseGameplay = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    if (pausedAtRef.current != null) return;
    pausedAtRef.current = Date.now();
    clearSpawn();
    expireTimersRef.current.forEach((t) => clearTimeout(t));
    expireTimersRef.current.clear();
  }, [clearSpawn]);

  const resumeGameplay = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    if (pausedAtRef.current == null) return;
    const pauseDuration = Date.now() - pausedAtRef.current;
    pausedAccumRef.current += pauseDuration;
    pausedAtRef.current = null;

    const now = Date.now();
    const refreshed = targetsRef.current.map((t) => ({
      ...t,
      expiresAt: t.expiresAt + pauseDuration,
      lifetimeMs: Math.max(400, t.expiresAt + pauseDuration - now),
    }));
    syncTargets(refreshed);
    refreshed.forEach((t) => {
      if (t.hitting || t.escaping) return;
      const remaining = Math.max(400, t.expiresAt - now);
      const expireTimer = setTimeout(() => {
        expireTimersRef.current.delete(t.id);
        const still = targetsRef.current.find(
          (x) => x.id === t.id && !x.hitting && !x.escaping,
        );
        if (!still) return;
        if (still.kind === "pass") {
          syncTargets(targetsRef.current.filter((x) => x.id !== t.id));
          return;
        }
        syncTargets(
          targetsRef.current.map((x) =>
            x.id === t.id ? { ...x, escaping: true } : x,
          ),
        );
        window.setTimeout(() => {
          syncTargets(targetsRef.current.filter((x) => x.id !== t.id));
        }, reducedMotionRef.current ? 0 : 180);
        registerMiss("escaped", still.x, still.y);
      }, remaining);
      expireTimersRef.current.set(t.id, expireTimer);
    });
    scheduleSpawnLoop();
  }, [registerMiss, scheduleSpawnLoop, syncTargets]);

  const resetToIdleBoard = useCallback(() => {
    clearAllTimers();
    scoreRef.current = 0;
    missesRef.current = STARTING_MISSES;
    comboRef.current = 0;
    bestComboRef.current = 0;
    bugsCaughtRef.current = 0;
    passesClickedRef.current = 0;
    waveRef.current = 1;
    startedAtRef.current = 0;
    pausedAtRef.current = null;
    pausedAccumRef.current = 0;
    setScore(0);
    setMissesLeft(STARTING_MISSES);
    setCombo(0);
    setWave(1);
    setElapsedMs(0);
    setResults(null);
    setFloats([]);
    setBanner(null);
    phaseRef.current = "idle";
    setPhase("idle");
    syncTargets(createIdleBoard());
  }, [clearAllTimers, syncTargets]);

  const enterPlayingSession = useCallback(
    (isReplay: boolean) => {
      unlockBugNinjaAudio();
      scoreRef.current = 0;
      missesRef.current = STARTING_MISSES;
      comboRef.current = 0;
      bestComboRef.current = 0;
      bugsCaughtRef.current = 0;
      passesClickedRef.current = 0;
      waveRef.current = 1;
      startedAtRef.current = Date.now();
      pausedAtRef.current = null;
      pausedAccumRef.current = 0;
      setScore(0);
      setMissesLeft(STARTING_MISSES);
      setCombo(0);
      setWave(1);
      setElapsedMs(0);
      setResults(null);
      setFloats([]);
      setBanner(null);
      phaseRef.current = "playing";
      setPhase("playing");
      flashBanner("Catch bugs. Spare passes. 3 misses.");

      if (isReplay) trackBugNinja("bug_ninja_replayed");
      else trackBugNinja("bug_ninja_started");

      if (tickTimerRef.current) clearInterval(tickTimerRef.current);
      tickTimerRef.current = setInterval(() => {
        if (phaseRef.current !== "playing") return;
        if (pausedAtRef.current != null) return;
        setElapsedMs(
          Date.now() - startedAtRef.current - pausedAccumRef.current,
        );
      }, 250);
    },
    [flashBanner],
  );

  const startGame = useCallback(
    (isReplay: boolean) => {
      clearAllTimers();
      syncTargets([]);
      enterPlayingSession(isReplay);
      playBugNinjaSfx("start");
      window.setTimeout(() => trySpawnAt(), 280);
      scheduleSpawnLoop();
    },
    [clearAllTimers, enterPlayingSession, scheduleSpawnLoop, syncTargets, trySpawnAt],
  );

  const onTargetPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>, target: ArenaTarget) => {
      e.preventDefault();
      e.stopPropagation();
      if (target.hitting || target.escaping) return;

      const wasIdle = phaseRef.current === "idle";
      if (!wasIdle && phaseRef.current !== "playing") return;

      unlockBugNinjaAudio();

      // Idle: only a bug click starts the hunt. Pass is a gentle nudge.
      if (wasIdle) {
        if (target.kind === "pass") {
          playBugNinjaSfx("wrong");
          pushFloat({
            x: target.x,
            y: target.y,
            text: "SPARE THE PASSES",
            tone: "warn",
          });
          return;
        }
        clearSpawn();
        enterPlayingSession(false);
        playBugNinjaSfx("start");
      }

      if (phaseRef.current !== "playing") return;

      const expire = expireTimersRef.current.get(target.id);
      if (expire) {
        clearTimeout(expire);
        expireTimersRef.current.delete(target.id);
      }

      syncTargets(
        targetsRef.current.map((t) =>
          t.id === target.id ? { ...t, hitting: true, frozen: false } : t,
        ),
      );

      if (target.kind === "pass") {
        passesClickedRef.current += 1;
        const nextScore = Math.max(0, scoreRef.current - 2);
        scoreRef.current = nextScore;
        setScore(nextScore);
        window.setTimeout(() => {
          syncTargets(targetsRef.current.filter((t) => t.id !== target.id));
        }, reducedMotionRef.current ? 0 : 200);
        registerMiss("pass", target.x, target.y);
        return;
      }

      bugsCaughtRef.current += 1;
      const nextCombo = comboRef.current + 1;
      comboRef.current = nextCombo;
      setCombo(nextCombo);
      if (nextCombo > bestComboRef.current) bestComboRef.current = nextCombo;

      const mult = comboMultiplier(nextCombo);
      const gained = target.points * mult;
      const nextScore = scoreRef.current + gained;
      scoreRef.current = nextScore;
      setScore(nextScore);

      if (bugsCaughtRef.current > 0 && bugsCaughtRef.current % 12 === 0) {
        waveRef.current += 1;
        setWave(waveRef.current);
        const bonus = 5 + waveRef.current;
        scoreRef.current += bonus;
        setScore(scoreRef.current);
        flashBanner(`Wave ${waveRef.current} · +${bonus} bonus`);
        playBugNinjaSfx("wave");
      } else {
        playBugNinjaSfx("squash", { combo: nextCombo });
      }

      const showCombo = nextCombo >= 3 && nextCombo % 3 === 0;
      pushFloat({
        x: target.x,
        y: target.y,
        text: target.isRegressionReturn
          ? "REGRESSION +2"
          : showCombo
            ? `COMBO ×${mult}`
            : `+${gained}`,
        tone: "good",
      });

      if (
        target.kind === "regression" &&
        !target.hasRespawned &&
        Math.random() < 0.35
      ) {
        const delay = 900 + Math.random() * 1100;
        const rid = randomId();
        const timer = setTimeout(() => {
          regressionTimersRef.current.delete(rid);
          if (phaseRef.current !== "playing") return;
          flashBanner("Regression returned");
          trySpawnAt({
            kind: "regression",
            points: 2,
            hasRespawned: true,
            isRegressionReturn: true,
          });
        }, delay);
        regressionTimersRef.current.set(rid, timer);
      }

      window.setTimeout(() => {
        syncTargets(targetsRef.current.filter((t) => t.id !== target.id));
        if (wasIdle) {
          armFrozenTargets();
          scheduleSpawnLoop();
        }
      }, reducedMotionRef.current ? 0 : 200);
    },
    [
      armFrozenTargets,
      clearSpawn,
      enterPlayingSession,
      flashBanner,
      pushFloat,
      registerMiss,
      scheduleSpawnLoop,
      syncTargets,
      trySpawnAt,
    ],
  );

  useEffect(() => {
    setSoundMuted(isBugNinjaMuted());
    if (density === "strip") {
      syncTargets(createIdleBoard());
    }
  }, [density, syncTargets]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const node = arenaRef.current;
    let io: IntersectionObserver | null = null;
    if (node && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          const onScreen = Boolean(entry?.isIntersecting);
          visibleRef.current = onScreen;
          if (phaseRef.current !== "playing") return;
          if (!onScreen || tabHiddenRef.current) pauseGameplay();
          else resumeGameplay();
        },
        { threshold: 0.15 },
      );
      io.observe(node);
    }

    const onVis = () => {
      tabHiddenRef.current = document.hidden;
      if (phaseRef.current !== "playing") return;
      if (document.hidden || !visibleRef.current) pauseGameplay();
      else resumeGameplay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      clearAllTimers();
    };
  }, [clearAllTimers, pauseGameplay, resumeGameplay]);

  const isStrip = density === "strip";
  const mult = comboMultiplier(combo);

  return (
    <div
      ref={arenaRef}
      className={cn(
        "bug-ninja-arena relative overflow-hidden border-y border-white/[0.06]",
        isStrip ? "h-[280px] md:h-[300px]" : "h-full min-h-[100dvh]",
        className,
      )}
      data-state={phase}
      role="region"
      aria-labelledby={labelId}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(hsl(210 100% 85% / 0.12) 1px, transparent 1px),
            linear-gradient(hsl(210 80% 70% / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(210 80% 70% / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "14px 14px, 40px 40px, 40px 40px",
        }}
        aria-hidden
      />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 px-4 pt-3 sm:px-6 md:px-8">
        <div className="min-w-0">
          <p
            id={labelId}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 sm:text-[11px]"
          >
            Bug Ninja
          </p>
          {phase === "playing" && (
            <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-sky-300/80">
              Wave {wave}
              {banner ? (
                <span className="ml-2 font-normal normal-case tracking-normal text-white/45">
                  · {banner}
                </span>
              ) : null}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-x-5">
          {phase === "playing" && (
            <>
              <p className="text-[11px] font-medium tabular-nums text-white/80 sm:text-xs">
                <span className="text-white/35">Score</span> {score}
              </p>
              <p
                className={cn(
                  "text-[11px] font-medium tabular-nums sm:text-xs",
                  combo >= 6
                    ? "bug-ninja-combo text-sky-300"
                    : "text-white/80",
                )}
              >
                <span className="text-white/35">Combo</span> {combo}
                {mult > 1 ? ` ×${mult}` : ""}
              </p>
              <div
                className="flex items-center gap-1.5"
                aria-label={`${missesLeft} misses remaining`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                  Misses
                </span>
                <span className="flex gap-1">
                  {Array.from({ length: STARTING_MISSES }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "inline-block h-2 w-2 rounded-full",
                        i < missesLeft ? "bg-sky-300" : "bg-white/15",
                      )}
                    />
                  ))}
                </span>
              </div>
              <p className="text-[11px] font-medium tabular-nums text-white/80 sm:text-xs">
                {formatTime(elapsedMs)}
              </p>
            </>
          )}
          {(phase === "playing" || phase === "idle" || phase === "finished") && (
            <button
              type="button"
              onClick={() => {
                unlockBugNinjaAudio();
                const next = !isBugNinjaMuted();
                setBugNinjaMuted(next);
                setSoundMuted(next);
                if (!next) playBugNinjaSfx("start");
              }}
              className="pointer-events-auto rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60 transition-colors hover:border-white/25 hover:text-white"
              aria-pressed={soundMuted}
              aria-label={soundMuted ? "Unmute sound" : "Mute sound"}
            >
              {soundMuted ? "Sound off" : "Sound on"}
            </button>
          )}
          {showClose && onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="pointer-events-auto rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              Close
            </button>
          ) : null}
        </div>
      </div>

      {phase === "idle" && density === "fullscreen" && (
        <div className="relative z-[2] flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35 sm:text-[11px]">
            You made it this far.
          </p>
          <p className="font-heading text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl">
            Got time for one last bug hunt?
          </p>
          <ul className="mt-3 max-w-lg space-y-1 text-left text-xs text-white/45 sm:text-sm">
            <li>
              <span className="font-medium text-sky-300">Catch bugs</span> before
              the ring empties — each escape costs a miss.
            </li>
            <li>
              <span className="font-medium text-sky-300">Spare the ✓ passes</span>{" "}
              — tapping one also costs a miss.
            </li>
            <li>
              Chain catches for{" "}
              <span className="font-medium text-sky-300">combo multipliers</span>.
              Three misses and the hunt ends.
            </li>
          </ul>
          <button
            type="button"
            onClick={() => startGame(false)}
            className="mt-5 inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[hsl(var(--navy))] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Start hunt →
          </button>
        </div>
      )}

      {phase === "idle" && density === "strip" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] border-t border-white/[0.06] bg-[hsl(var(--foreground)/0.92)] px-4 py-2.5 sm:px-6 md:px-8">
          <p className="text-center text-[11px] leading-relaxed text-white/55 sm:text-xs">
            <span className="font-medium text-sky-300">Click a bug to start</span>
            <span className="mx-2 text-white/25">·</span>
            Catch bugs before the ring empties
            <span className="mx-2 text-white/25">·</span>
            Spare the{" "}
            <span className="font-medium text-emerald-300">✓ passes</span>
            <span className="mx-2 text-white/25">·</span>
            3 misses and the hunt ends
          </p>
        </div>
      )}

      {(phase === "playing" || (phase === "idle" && density === "strip")) &&
        targets.map((t) => {
          const style = {
            left: `${t.x * 100}%`,
            top: `${t.y * 100}%`,
            "--life-ms": `${t.lifetimeMs || 3000}ms`,
            "--drift-x": `${t.driftX}px`,
            "--drift-y": `${t.driftY}px`,
            "--drift-ms": `${t.driftMs}ms`,
          } as CSSProperties;

          return (
            <button
              key={`${t.id}-${t.frozen ? "idle" : t.expiresAt}`}
              type="button"
              className={cn(
                "bug-ninja-target z-[3] flex h-12 w-12 items-center justify-center rounded-full sm:h-[3.25rem] sm:w-[3.25rem]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60",
              )}
              style={style}
              data-hitting={t.hitting ? "true" : "false"}
              data-escaping={t.escaping ? "true" : "false"}
              data-moving={!t.frozen && t.driftMs > 0 ? "true" : "false"}
              data-frozen={t.frozen ? "true" : "false"}
              aria-label={
                t.kind === "pass"
                  ? "Passing test — do not click"
                  : t.isRegressionReturn
                    ? "Regression bug"
                    : phase === "idle"
                      ? "Bug — click to start hunt"
                      : "Bug"
              }
              onPointerDown={(e) => onTargetPointerDown(e, t)}
            >
              <span className="bug-ninja-target-inner pointer-events-none relative block h-8 w-8 sm:h-9 sm:w-9">
                <svg className="bug-ninja-ring" viewBox="0 0 36 36" aria-hidden>
                  <circle cx="18" cy="18" r="14" />
                </svg>
                <span className="absolute inset-[6px]">
                  {t.kind === "pass" ? (
                    <PassIcon />
                  ) : (
                    <BugIcon variant={t.kind} />
                  )}
                </span>
                {t.isRegressionReturn ? (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold uppercase tracking-wider text-sky-300">
                    Regression
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}

      {floats.map((f) => (
        <span
          key={f.id}
          className={cn(
            "bug-ninja-float text-[10px] font-semibold uppercase tracking-wider sm:text-[11px]",
            f.tone === "good" && "text-sky-300",
            f.tone === "bad" && "text-emerald-300",
            f.tone === "warn" && "text-orange-300",
            f.tone === "neutral" && "text-white/50",
          )}
          style={{ left: `${f.x * 100}%`, top: `${f.y * 100}%` }}
        >
          {f.text}
        </span>
      ))}

      {phase === "finished" && results && (
        <div className="relative z-[2] flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Out of misses
          </p>
          <p className="mt-2 font-heading text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl">
            {results.score}
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/70">
            Score
          </p>
          <p className="mt-4 font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
            {rankTitle(results.score)}
          </p>
          <p className="mt-2 text-xs text-white/45 sm:text-sm">
            {endLine(results.score)}
          </p>
          <p className="mt-1 text-[10px] tabular-nums text-white/30">
            {formatTime(results.elapsedMs)} · {results.bugsCaught} catches · best
            combo {results.bestCombo}
            {results.passesClicked
              ? ` · ${results.passesClicked} false alarms`
              : ""}
          </p>
          <button
            type="button"
            onClick={() =>
              density === "strip" ? resetToIdleBoard() : startGame(true)
            }
            className="mt-5 inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            Play again ↻
          </button>
        </div>
      )}
    </div>
  );
}
