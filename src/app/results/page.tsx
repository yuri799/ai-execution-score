"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function ResultsPage() {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ai-business-iq-latest-result") ?? localStorage.getItem("ai-execution-latest-result");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  if (!result) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist px-6">
        <div className="max-w-md rounded-lg border border-line bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-semibold text-navy">No result yet</h1>
          <p className="mt-3 text-slate-600">Take the quiz first so the app can generate your AI Business IQ.</p>
          <Link href="/quiz" className="mt-6 inline-flex rounded-lg bg-electric px-5 py-3 text-sm font-bold text-white">
            Start Quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-electric">Your roadmap</p>
            <h1 className="mt-2 text-4xl font-semibold text-navy">Your AI Business IQ</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <DownloadReportButton result={result} />
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <ScoreCard score={result.overallScore} tierLabel={result.profile} />
          <ProfileBadge profile={result.profile} description={result.profileDescription} />
        </section>

        <section className="mt-6">
          <IqBellCurve score={result.overallScore} />
        </section>

        <section className="mt-6 rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            Here&apos;s what your score means. You scored higher than {result.percentile}% of business owners who&apos;ve taken this assessment. The detailed breakdown below shows your strengths and your three biggest gaps - and your personalized PDF course is built around closing those gaps.
          </p>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-navy">Six category scores</h2>
            <div className="mt-5 space-y-4">
              {Object.entries(result.categoryScores).map(([key, score]) => (
                <CategoryScoreBar key={key} label={labels[key as keyof typeof labels]} score={score} />
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-navy">What you already know</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                {result.strengths.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-navy">What still needs attention</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                {result.gaps.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <ProjectRecommendationCard project={result.recommendedProject} />
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-electric">Custom course path</p>
              <h2 className="mt-2 text-3xl font-semibold text-navy">What to learn next</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {result.recommendedModules.map((module) => (
              <CoursePathCard key={`${module.module}-${module.status}`} module={module} />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-navy">What you can skip</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {result.skippedModules.length ? result.skippedModules.map((item) => <li key={item.module}>- {item.module}</li>) : <li>No full modules are skipped yet. Move quickly through summaries where noted.</li>}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-navy">Optional review lessons</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {result.optionalReviewLessons.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 text-3xl font-semibold text-navy">7-day AI action plan</h2>
          <ActionPlanChecklist items={result.actionPlan} />
        </section>

        <section className="mt-10 rounded-lg bg-navy p-8 text-white">
          <p className="text-2xl font-semibold">Bring this roadmap to your AI Execution Accelerator session with Kai.</p>
          <p className="mt-3 max-w-3xl text-slate-200">Use your score, recommended first project, and skipped lessons to make the session more specific and implementation-focused.</p>
        </section>
      </div>
    </main>
  );
}
