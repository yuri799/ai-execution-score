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

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-mist">
      <section className="bg-navy text-white">
        <div className="mx-auto grid min-h-[72vh] max-w-6xl content-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              AI Business IQ
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">What&apos;s Your AI Business IQ?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Take the 5-minute assessment. Find out where you really stand. Get a personalized AI course tailored to your score.
            </p>
            <Link
              href="/quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-electric px-6 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-blue-600"
            >
              Find My AI Business IQ
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-lg border border-white/10 bg-white p-6 text-navy shadow-soft">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">Preview IQ score</p>
                <p className="text-3xl font-bold">142</p>
              </div>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-electric">AI Operator - Top 20%</span>
            </div>
            <div className="mt-6 space-y-4">
              {["AI Basics", "Prompting", "Verification", "Business Strategy", "Automation Tools", "Team & Privacy"].map((label, index) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>{label}</span>
                    <span>{[78, 70, 65, 82, 58, 60][index]}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-electric" style={{ width: `${[78, 70, 65, 82, 58, 60][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-electric">What You&apos;ll Get</p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">A practical roadmap, not a generic score.</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <Icon className="text-electric" size={24} />
              <p className="mt-4 font-semibold text-navy">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
