"use client";

import type { CategoryKey } from "@/lib/types";

type ProgressBarProps = {
  value: number;
  label?: string;
  total?: number;
  current?: number;
  categories?: CategoryKey[];
};

const categoryDotColors: Record<CategoryKey, string> = {
  aiBasics: "bg-indigo-400",
  prompting: "bg-violet-400",
  verification: "bg-amber-400",
  businessStrategy: "bg-emerald-400",
  automationTools: "bg-sky-400",
  teamPrivacyImplementation: "bg-rose-400",
};

export function ProgressBar({ value, label, total, current, categories }: ProgressBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-medium text-slate-500">
        <span>{label ?? "Progress"}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric to-indigo transition-all duration-400"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {total != null && current != null && categories ? (
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, index) => {
            const isCurrent = index === current;
            const isPast = index < current;
            const cat = categories[index] ?? "aiBasics";
            return (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? `${categoryDotColors[cat]} dot-current scale-y-125`
                    : isPast
                      ? "bg-electric/70"
                      : "bg-slate-200/60"
                }`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
