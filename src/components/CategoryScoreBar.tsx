"use client";

import { useEffect, useState } from "react";

type CategoryScoreBarProps = {
  label: string;
  score: number;
};

function barColor(score: number) {
  if (score >= 70) return "bg-emerald-400";
  if (score >= 40) return "bg-amber-400";
  return "bg-red-400";
}

export function CategoryScoreBar({ label, score }: CategoryScoreBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 120);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-navy">{score}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor(score)}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
