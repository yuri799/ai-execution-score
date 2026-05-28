"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, BookOpen, CheckCircle2, ClipboardList, Route } from "lucide-react";

const outcomes = [
  { icon: BarChart3, label: "Your AI Business IQ" },
  { icon: BadgeCheck, label: "Your AI profile" },
  { icon: Route, label: "Your custom course path" },
  { icon: CheckCircle2, label: "A course tailored to your gaps" },
  { icon: ClipboardList, label: "Your first recommended AI project" },
  { icon: BookOpen, label: "A 7-day action plan" },
];

const previewScores = [142, 98, 178, 115, 67, 155, 88, 132];

export default function LandingPage() {
  const [displayScore, setDisplayScore] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayScore(previewScores[Math.floor(Math.random() * previewScores.length)]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const barColor = displayScore >= 135 ? "bg-gradient-to-r from-emerald-400 to-green-300" : displayScore >= 100 ? "bg-gradient-to-r from-electric to-indigo" : "bg-gradient-to-r from-slate-400 to-slate-300";

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-ink to-[#0f2040] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/8 via-transparent to-transparent" />
        <div className="relative mx-auto grid min-h-[75vh] max-w-7xl content-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur-sm">
              AI Business IQ
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              What&apos;s Your AI Business IQ?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Take the 5-minute assessment. Find out where you really stand. Get a personalized AI course tailored to your score.
            </p>
            <Link
              href="/quiz"
              className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-4 text-sm font-bold text-white"
            >
              Find My AI Business IQ
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-navy shadow-soft backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-slate-400">Preview IQ score</p>
                <p className="text-3xl font-bold tabular-nums text-white transition-all duration-300">{displayScore}</p>
              </div>
              <span className="rounded-full border border-blue-200/20 bg-blue-50/10 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur-sm">
                AI Operator — Top 20%
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {["AI Basics", "Prompting", "Verification", "Business Strategy", "Automation Tools", "Team & Privacy"].map((label, index) => {
                const vals = [78, 70, 65, 82, 58, 60];
                return (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span className="text-slate-300">{label}</span>
                      <span className="text-slate-400">{vals[index]}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-electric to-blue-400" style={{ width: `${vals[index]}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wide text-electric">What You&apos;ll Get</p>
          <h2 className="mt-2 text-3xl font-semibold text-navy">A practical roadmap, not a generic score.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(({ icon: Icon, label }) => (
            <div key={label} className="card-lift flex items-center gap-4 rounded-xl border border-white/60 glass-card p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <Icon className="text-electric" size={22} />
              </span>
              <p className="font-semibold text-navy">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
