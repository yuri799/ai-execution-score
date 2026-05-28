"use client";

import { useEffect, useState } from "react";

type ScoreCardProps = {
  score: number;
  label?: string;
  suffix?: string;
  maxScore?: number;
  tierLabel?: string;
};

export function ScoreCard({ score, label = "AI Business IQ", suffix = "IQ", maxScore = 225, tierLabel }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      setBarWidth(Math.min(100, Math.max(0, (eased * score / maxScore) * 100)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [score, maxScore]);

  const barGradient =
    score >= 160 ? "linear-gradient(90deg, #fbbf24, #fde047)" :
    score >= 115 ? "linear-gradient(90deg, #34d399, #86efac)" :
    score >= 85  ? "linear-gradient(90deg, #1f7bff, #4f46e5)" :
    "linear-gradient(90deg, #94a3b8, #cbd5e1)";

  return (
    <div className="rounded-xl bg-gradient-to-br from-navy to-ink p-6 text-white shadow-soft sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">{label}</p>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-6xl font-bold tabular-nums">{displayScore}</span>
        <span className="pb-2 text-lg text-blue-100">{suffix}</span>
      </div>
      {tierLabel ? <p className="mt-3 text-base font-semibold text-blue-100">{tierLabel}</p> : null}
      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full" style={{ width: `${barWidth}%`, background: barGradient, transition: "width 700ms ease-out" }} />
      </div>
    </div>
  );
}
