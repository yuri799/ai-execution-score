"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { ActionPlanChecklist } from "@/components/ActionPlanChecklist";
import { CategoryScoreBar } from "@/components/CategoryScoreBar";
import { CoursePathCard } from "@/components/CoursePathCard";
import { DownloadReportButton } from "@/components/DownloadReportButton";
import { IqBellCurve } from "@/components/IqBellCurve";
import { ProfileBadge } from "@/components/ProfileBadge";
import { ProjectRecommendationCard } from "@/components/ProjectRecommendationCard";
import { ScoreCard } from "@/components/ScoreCard";
import type { QuizResult } from "@/lib/types";

const labels = {
  aiBasics: "AI Basics",
  prompting: "Prompting",
  verification: "Verification",
  businessStrategy: "Business Strategy",
  automationTools: "Automation Tools",
  teamPrivacyImplementation: "Team, Privacy & Implementation",
};

const sectionIds = ["overview", "categories", "project", "course", "review", "action", "cta"] as const;
const sectionLabels = ["Overview", "Category Scores", "First Project", "Course Path", "Review & Skip", "Action Plan", "Next Steps"] as const;

export default function ResultsPage() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const saved = localStorage.getItem("ai-business-iq-latest-result") ?? localStorage.getItem("ai-execution-latest-result");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  useEffect(() => {
    function onScroll() {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 160) setActiveSection(id);
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleRetake() {
    localStorage.removeItem("ai-business-iq-answers");
    localStorage.removeItem("ai-business-iq-latest-result");
    localStorage.removeItem("ai-execution-latest-result");
    window.location.href = "/quiz";
  }

  if (!result) {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <div className="max-w-md rounded-xl border border-white/60 glass-card p-8 text-center shadow-soft">
          <h1 className="text-2xl font-semibold text-navy">No result yet</h1>
          <p className="mt-3 text-slate-600">Take the quiz first so the app can generate your AI Business IQ.</p>
          <Link href="/quiz" className="btn-gradient mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-bold text-white">
            Start Quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/quiz" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy">
              <ArrowLeft size={18} />
              Back to quiz
            </Link>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-electric">Your roadmap</p>
            <h1 className="mt-1 text-3xl font-semibold text-navy sm:text-4xl">Your AI Business IQ</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <DownloadReportButton result={result} />
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/80 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-white"
            >
              <RotateCcw size={16} />
              Retake
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-8 space-y-1 rounded-xl border border-white/60 glass-card p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">On this page</p>
              {sectionIds.map((id, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === id ? "bg-electric/10 text-electric" : "text-slate-500 hover:text-navy"
                  }`}
                >
                  {sectionLabels[i]}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-8">
            <section id="overview" className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <ScoreCard score={result.overallScore} tierLabel={result.profile} />
              <ProfileBadge profile={result.profile} description={result.profileDescription} />
            </section>

            <section id="overview-continued">
              <IqBellCurve score={result.overallScore} />
            </section>

            <div className="rounded-xl border border-white/60 glass-card p-6 shadow-sm">
              <p className="leading-7 text-slate-700">
                Here&apos;s what your score means. You scored higher than {result.percentile}% of business owners who&apos;ve taken this assessment. The detailed breakdown below shows your strengths and your three biggest gaps — and your personalized PDF course is built around closing those gaps.
              </p>
            </div>

            <section id="categories" className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-xl border border-white/60 glass-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-navy">Six category scores</h2>
                <div className="mt-5 space-y-4">
                  {Object.entries(result.categoryScores).map(([key, score]) => (
                    <CategoryScoreBar key={key} label={labels[key as keyof typeof labels]} score={score} />
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-xl border border-white/60 glass-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-navy">What you already know</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                    {result.strengths.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-white/60 glass-card p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-navy">What still needs attention</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                    {result.gaps.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="project">
              <ProjectRecommendationCard project={result.recommendedProject} />
            </section>

            <section id="course">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-wide text-electric">Custom course path</p>
                <h2 className="mt-2 text-3xl font-semibold text-navy">What to learn next</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {result.recommendedModules.map((mod) => (
                  <CoursePathCard key={`${mod.module}-${mod.status}`} module={mod} />
                ))}
              </div>
            </section>

            <section id="review" className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl border border-white/60 glass-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-navy">What you can skip</h2>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  {result.skippedModules.length
                    ? result.skippedModules.map((item) => <li key={item.module} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />{item.module}</li>)
                    : <li>No full modules are skipped yet. Move quickly through summaries where noted.</li>}
                </ul>
              </div>
              <div className="rounded-xl border border-white/60 glass-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-navy">Optional review lessons</h2>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  {result.optionalReviewLessons.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric/60" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="action">
              <h2 className="mb-5 text-3xl font-semibold text-navy">7-day AI action plan</h2>
              <ActionPlanChecklist items={result.actionPlan} />
            </section>

            <section id="cta" className="rounded-xl bg-gradient-to-br from-navy to-ink p-8 text-white shadow-soft">
              <p className="text-2xl font-semibold">Bring this roadmap to your AI Execution Accelerator session with Kai.</p>
              <p className="mt-3 max-w-3xl text-slate-200">Use your score, recommended first project, and skipped lessons to make the session more specific and implementation-focused.</p>
              <div className="mt-6">
                <DownloadReportButton result={result} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
