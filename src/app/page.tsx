import Link from "next/link";
import Image from "next/image";
import { ChartColumn, CircleCheck, ClipboardList, Route } from "lucide-react";
import { PreviewCard } from "@/components/PreviewCard";
import { quizQuestions } from "@/lib/quiz-data";

const outcomes = [
  { icon: ChartColumn, label: "Your AI Business IQ", desc: "A clear score that shows where you stand." },
  { icon: Route, label: "Your improvement roadmap", desc: "The next priorities for raising your AI Business IQ." },
  { icon: ClipboardList, label: "Your first recommended AI project", desc: "The best place to create leverage first." },
  { icon: CircleCheck, label: "A 7-day action plan", desc: "A concrete next week of implementation." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pb-20 lg:pt-10">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
              7-minute AI Business IQ assessment
            </div>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">Are you ahead or behind on AI?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Find out how well you understand AI for business, where your biggest gaps are, and the next move that will raise your AI Business IQ.
            </p>
            <div className="mt-8 max-w-2xl">
              <Link href="/quiz" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-emerald-600">
                Get Your AI Business IQ Score &rarr;
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                [String(quizQuestions.length), "assessment questions"],
                ["6", "business AI categories"],
                ["1", "personalized improvement roadmap"],
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
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-10">
          <div className="min-w-0 aspect-[3/2] overflow-hidden rounded-lg border border-line bg-white shadow-sm">
            <Image
              src="/ai-iq-score.png"
              alt="Business owner reviewing an AI Business IQ score dashboard"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:aspect-[3/2]">
            {outcomes.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-electric">
                  <Icon size={20} />
                </div>
                <p className="mt-3 font-bold leading-snug text-navy">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
