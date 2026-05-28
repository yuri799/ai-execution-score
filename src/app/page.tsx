import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, BookOpen, CheckCircle2, ClipboardList, Route } from "lucide-react";

const stats = [
  { value: "27", label: "business-focused questions" },
  { value: "6", label: "readiness categories" },
  { value: "1", label: "personalized course PDF" },
];

const outcomes = [
  { icon: BarChart3, label: "Your AI Business IQ" },
  { icon: BadgeCheck, label: "Your AI profile" },
  { icon: Route, label: "Your custom course path" },
  { icon: CheckCircle2, label: "A course tailored to your gaps" },
  { icon: ClipboardList, label: "Your first recommended AI project" },
  { icon: BookOpen, label: "A 7-day action plan" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-mist">
      <section className="bg-navy text-white">
        <div className="mx-auto grid min-h-[72vh] max-w-6xl content-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              AI Business IQ
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">5-minute assessment for business owners</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">What&apos;s Your AI Business IQ?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Take the 5-minute assessment. Find out where you really stand. Get a personalized AI course tailored to your score.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-lg bg-electric px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-blue-600"
              >
                Find My AI Business IQ
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#outcomes"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                See what you get
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-navy shadow-soft backdrop-blur-sm">
            <p className="text-sm font-semibold text-slate-400">Preview result</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold text-white">142</span>
              <span className="pb-1 text-base text-blue-200">IQ</span>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="rounded-full bg-blue-50/10 px-3 py-1.5 text-sm font-bold text-blue-100 border border-blue-200/20">AI Operator — Top 20%</span>
              <span className="text-sm font-semibold text-blue-200/80">Target <span className="text-white">160+</span></span>
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
                      <div className="h-2 rounded-full bg-electric" style={{ width: `${vals[index]}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
              <div>
                <p className="text-sm font-medium text-slate-400">First project</p>
                <p className="text-xs text-slate-500">Recommended</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Gap analysis</p>
                <p className="text-xs text-slate-500">Top 3 gaps identified</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Safety checks</p>
                <p className="text-xs text-slate-500">Risk flags surfaced</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
          <div className="grid grid-cols-3 gap-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="outcomes" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wide text-electric">What You&apos;ll Get</p>
          <h2 className="mt-2 text-3xl font-semibold text-navy">A practical roadmap, not a generic score.</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
            The assessment turns your answers into a course path, project recommendation, and action plan that fits how your business actually uses AI today.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-4 rounded-lg border border-line bg-white p-5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
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
