"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Edit3 } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { QuizQuestion } from "@/components/QuizQuestion";
import { quizQuestions } from "@/lib/quiz-data";
import { calculateResult } from "@/lib/scoring";
import { saveQuizResult } from "@/lib/supabase";
import type { AnswerValue, Answers, CategoryKey } from "@/lib/types";

const categoryLabels: Record<CategoryKey, string> = {
  aiBasics: "AI Basics",
  prompting: "Prompting",
  verification: "Verification",
  businessStrategy: "Business Strategy",
  automationTools: "Automation Tools",
  teamPrivacyImplementation: "Team, Privacy & Implementation",
};

const baseStepCount = quizQuestions.length;
const reviewStepIndex = baseStepCount;
const nameStepIndex = baseStepCount + 1;

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const dirtyRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-business-iq-answers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ai-business-iq-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (step > 0) dirtyRef.current = true;
  }, [step]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (dirtyRef.current) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key !== "Enter") return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      if (canContinue) next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const isReviewStep = step === reviewStepIndex;
  const isContactStep = step === nameStepIndex;
  const question = quizQuestions[step];
  const progress = useMemo(() => (step / nameStepIndex) * 100, [step]);
  const currentAnswer = question ? answers[question.id] : undefined;
  const canContinue = isContactStep
    ? name.trim().length > 0
    : isReviewStep
      ? true
      : Array.isArray(currentAnswer)
        ? currentAnswer.length > 0
        : Boolean(currentAnswer);

  const categories = useMemo(() => quizQuestions.map((q) => q.options[0]?.category ?? "aiBasics"), []);

  function setAnswer(value: AnswerValue) {
    setError("");
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  const goNext = useCallback(async () => {
    if (!canContinue) {
      setError(isContactStep ? "Enter your name to see your result." : "Choose an answer before continuing.");
      return;
    }

    if (step < reviewStepIndex) {
      setAnimDir("forward");
      setStep((c) => c + 1);
      return;
    }

    if (isReviewStep) {
      setAnimDir("forward");
      setStep(nameStepIndex);
      return;
    }

    setSaving(true);
    setError("");
    try {
      const result = calculateResult(answers, name.trim());
      localStorage.setItem("ai-business-iq-latest-result", JSON.stringify(result));
      await saveQuizResult(result);
      router.push("/results");
    } catch (saveError) {
      const result = calculateResult(answers, name.trim());
      localStorage.setItem("ai-business-iq-latest-result", JSON.stringify(result));
      setError(saveError instanceof Error ? `Saved locally. Supabase error: ${saveError.message}` : "Saved locally. Supabase could not be reached.");
      router.push("/results");
    } finally {
      setSaving(false);
    }
  }, [canContinue, step, answers, name, router, isReviewStep, isContactStep]);

  const next = goNext;

  function goBack() {
    setAnimDir("back");
    setStep((c) => Math.max(0, c - 1));
    setError("");
  }

  function jumpToReviewQuestion(index: number) {
    setAnimDir(index > step ? "forward" : "back");
    setStep(index);
    setError("");
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-navy">
            <ArrowLeft size={18} />
            Home
          </Link>
          <span className="text-sm font-bold tracking-tight text-navy">AI Business IQ</span>
        </div>

        <ProgressBar
          value={isReviewStep || isContactStep ? 100 : progress}
          label={isContactStep ? "Final step" : isReviewStep ? "Review your answers" : `Question ${step + 1} of ${quizQuestions.length}`}
          total={quizQuestions.length}
          current={isReviewStep ? quizQuestions.length : step}
          categories={categories}
        />

        <div className="mt-8">
          {isReviewStep ? (
            <section className="quiz-card-enter rounded-xl border border-white/60 glass-card p-6 shadow-soft sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-electric">Review your answers</p>
              <h1 className="mt-2 text-2xl font-semibold text-navy">Double-check before you submit</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Click any question to edit it, or continue when you are ready.</p>
              <div className="mt-6 space-y-3">
                {quizQuestions.map((q, index) => {
                  const answer = answers[q.id];
                  const answerLabel = answer
                    ? Array.isArray(answer)
                      ? answer.map((id) => q.options.find((o) => o.id === id)?.label ?? id).join(", ")
                      : q.options.find((o) => o.id === answer)?.label ?? answer
                    : "Not answered";
                  const isEmpty = !answer || (Array.isArray(answer) && answer.length === 0);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => jumpToReviewQuestion(index)}
                      className="card-lift flex w-full items-start gap-3 rounded-lg border border-line bg-white p-3.5 text-left transition-colors hover:border-electric/40 sm:p-4"
                    >
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isEmpty ? "bg-red-100 text-red-500" : "bg-emerald-100 text-emerald-600"}`}>
                        {isEmpty ? "!" : <CheckCircle2 size={14} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-navy">
                          {index + 1}. {q.title}
                        </p>
                        <p className={`mt-1 text-xs leading-5 ${isEmpty ? "text-red-500" : "text-slate-500"}`}>
                          {answerLabel}
                        </p>
                      </div>
                      <Edit3 size={15} className="mt-0.5 shrink-0 text-slate-300" />
                    </button>
                  );
                })}
              </div>
            </section>
          ) : isContactStep ? (
            <section className="quiz-card-enter rounded-xl border border-white/60 glass-card p-6 shadow-soft sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-electric">Almost done</p>
              <h1 className="mt-2 text-3xl font-semibold text-navy">Ready for your score?</h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                Enter your name and the app will generate your AI Business IQ, course path, and downloadable course PDF.
              </p>
              <div className="mt-8 grid gap-4 sm:max-w-md">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/10"
                    autoFocus
                  />
                </label>
              </div>
            </section>
          ) : (
            <QuizQuestion question={question} value={currentAnswer} onChange={setAnswer} animDir={animDir} />
          )}
        </div>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>
        ) : null}

        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || saving}
            className="rounded-lg border border-line bg-white/80 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={saving}
            className="btn-gradient inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isContactStep ? (saving ? "Creating roadmap..." : "Show My Results") : isReviewStep ? "Continue to name" : "Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
