"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Target, TrendingUp } from "lucide-react";

export function PreviewCard() {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const target = 142;
    const duration = 900;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-white p-4 text-navy shadow-lift">
      <div className="rounded-lg border border-line bg-slate-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Preview result</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-6xl font-black tracking-tight tabular-nums">{displayScore}</span>
              <span className="pb-2 text-sm font-bold text-slate-500">IQ</span>
            </div>
            <p className="mt-2 font-bold text-electric">AI Operator - Top 20%</p>
          </div>
          <div className="rounded-lg bg-navy px-3 py-2 text-right text-white">
            <p className="text-xs font-bold uppercase text-blue-200">Target</p>
            <p className="text-2xl font-black">160+</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {["AI Basics", "Prompting", "Verification", "Business Strategy", "Automation Tools", "Team & Privacy"].map((label, i) => {
            const vals = [78, 70, 65, 82, 58, 60];
            return (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>{label}</span>
                  <span>{vals[i]}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-electric" style={{ width: `${vals[i]}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-3">
          <Target size={18} className="text-electric" />
          <p className="mt-2 text-xs font-bold text-slate-700">First project</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-3">
          <TrendingUp size={18} className="text-electric" />
          <p className="mt-2 text-xs font-bold text-slate-700">Gap analysis</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-3">
          <ShieldCheck size={18} className="text-electric" />
          <p className="mt-2 text-xs font-bold text-slate-700">Safety checks</p>
        </div>
      </div>
    </div>
  );
}
