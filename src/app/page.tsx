import Link from "next/link";
import { ArrowRight, ChartColumn, CircleCheck, BadgeCheck, ClipboardList, Route } from "lucide-react";
import { PreviewCard } from "@/components/PreviewCard";

const outcomes = [
  { icon: ChartColumn, label: "Your AI Business IQ", desc: "A clear score that shows where you stand." },
  { icon: BadgeCheck, label: "Your AI profile", desc: "A practical tier, not a vague personality label." },
  { icon: Route, label: "Your improvement roadmap", desc: "The next priorities for raising your AI Business IQ." },
  { icon: CircleCheck, label: "A gap-by-gap breakdown", desc: "A clear view of what to improve first." },
  { icon: ClipboardList, label: "Your first recommended AI project", desc: "The best place to create leverage first." },
  { icon: CircleCheck, label: "A 7-day action plan", desc: "A concrete next week of implementation." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10 text-sm font-black text-[#00d4ff]">IQ</span>
            <span className="text-sm font-bold tracking-wide">AI Business IQ</span>
          </div>
          <Link href="/quiz" className="hidden items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-600 sm:inline-flex">
            Start Assessment
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pb-20 lg:pt-14">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
              7-minute assessment for business owners
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">Do you feel left behind when it comes to AI?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              See exactly where your AI skills stand — and the next move to get ahead.
            </p>
            <div className="mt-8 max-w-2xl">
              <Link href="/quiz" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-emerald-600">
                Get Your AI Business IQ Score →
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["16", "scenario questions"],
                ["6", "readiness categories"],
                ["1", "improvement roadmap"],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-white/15 pl-4">
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <PreviewCard />
          </div>
        </div>
      </section>

      <section id="outcomes" className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-electric">What You&apos;ll Get</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy">A practical roadmap, not a generic score.</h2>
          </div>
          <p className="text-base leading-7 text-slate-600">The assessment turns your answers into an improvement roadmap, project recommendation, and action plan that fits how your business actually uses AI today.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-electric">
                <Icon size={22} />
              </div>
              <p className="mt-4 font-bold text-navy">{label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
