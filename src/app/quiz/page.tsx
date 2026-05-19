"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { QuizQuestion } from "@/components/QuizQuestion";
import { quizQuestions } from "@/lib/quiz-data";
import { calculateResult } from "@/lib/scoring";
import { saveQuizResult } from "@/lib/supabase";
import type { AnswerValue, Answers } from "@/lib/types";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-execution-answers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ai-execution-answers", JSON.stringify(answers));
  }, [answers]);

  const isContactStep = step === quizQuestions.length;
  const question = quizQuestions[step];
  const progress = useMemo(() => (step / quizQuestions.length) * 100, [step]);
  const currentAnswer = question ? answers[question.id] : undefined;
  const canContinue = isContactStep ? name.trim() : Array.isArray(currentAnswer) ? currentAnswer.length > 0 : Boolean(currentAnswer);

  function setAnswer(value: AnswerValue) {
    setError("");
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  async function next() {
    if (!canContinue) {
      setError(isContactStep ? "Enter your name to see your result." : "Choose an answer before continuing.");
      return;
    }
    if (!isContactStep) {
      setStep((current) => current + 1);
      return;
    }

    setSaving(true);
    setError("");
    try {
      const result = calculateResult(answers, name.trim());
      localStorage.setItem("ai-execution-latest-result", JSON.stringify(result));
      await saveQuizResult(result);
      router.push("/results");
    } catch (saveError) {
      const result = calculateResult(answers, name.trim());
      localStorage.setItem("ai-execution-latest-result", JSON.stringify(result));
      setError(saveError instanceof Error ? `Saved locally. Supabase error: ${saveError.message}` : "Saved locally. Supabase could not be reached.");
      router.push("/results");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-mist">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy">
            <ArrowLeft size={18} />
            Home
          </Link>
          <span className="text-sm font-bold text-navy">AI Execution Score</span>
        </div>

        <ProgressBar value={isContactStep ? 100 : progress} label={isContactStep ? "Final step" : `Question ${step + 1} of ${quizQuestions.length}`} />

        <div className="mt-8">
          {isContactStep ? (
            <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-wide text-electric">Almost done</p>
              <h1 className="mt-2 text-3xl font-semibold text-navy">Ready for your score?</h1>
              <p className="mt-3 max-w-2xl text-slate-600">Enter your name and the app will generate your score, course path, and downloadable course PDF.</p>
              <div className="mt-8 grid gap-4 sm:max-w-md">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Name
                  <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-lg border border-line px-4 py-3 outline-none focus:border-electric" />
                </label>
              </div>
            </section>
          ) : (
            <QuizQuestion question={question} value={currentAnswer} onChange={setAnswer} />
          )}
        </div>

        {error ? <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p> : null}

        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0 || saving}
            className="rounded-lg border border-line bg-white px-5 py-3 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blue-600 disabled:opacity-60"
          >
            {isContactStep ? (saving ? "Creating roadmap..." : "Show My Results") : "Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
