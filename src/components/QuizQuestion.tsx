"use client";

import { useEffect, useRef } from "react";
import type { AnswerValue, CategoryKey, Question } from "@/lib/types";

type QuizQuestionProps = {
  question: Question;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
  animDir?: "forward" | "back";
};

const categoryLabels: Record<CategoryKey, string> = {
  aiBasics: "AI Basics",
  prompting: "Prompting",
  verification: "Verification",
  businessStrategy: "Business Strategy",
  automationTools: "Automation Tools",
  teamPrivacyImplementation: "Team, Privacy & Implementation",
};

const categoryColors: Record<CategoryKey, string> = {
  aiBasics: "bg-indigo-50 text-indigo-700 border-indigo-200",
  prompting: "bg-violet-50 text-violet-700 border-violet-200",
  verification: "bg-amber-50 text-amber-700 border-amber-200",
  businessStrategy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  automationTools: "bg-sky-50 text-sky-700 border-sky-200",
  teamPrivacyImplementation: "bg-rose-50 text-rose-700 border-rose-200",
};

function optionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

export function QuizQuestion({ question, value, onChange, animDir = "forward" }: QuizQuestionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = Array.isArray(value) ? value : [];

  useEffect(() => {
    containerRef.current?.classList.remove("quiz-card-enter", "quiz-card-exit");
    void containerRef.current?.offsetWidth;
    containerRef.current?.classList.add(animDir === "forward" ? "quiz-card-enter" : "quiz-card-exit");
  }, [question.id, animDir]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter") return;
      const idx = e.key.charCodeAt(0) - 97;
      if (idx >= 0 && idx < question.options.length) {
        e.preventDefault();
        toggle(question.options[idx].id);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [question.id, question.options, selected, value]);

  function toggle(optionId: string) {
    if (question.type === "single") {
      onChange(optionId);
      return;
    }
    const option = question.options.find((item) => item.id === optionId);
    const isNone = option?.label.toLowerCase().startsWith("none") ?? false;
    const noneIds = question.options.filter((item) => item.label.toLowerCase().startsWith("none")).map((item) => item.id);
    const next = selected.includes(optionId)
      ? selected.filter((item) => item !== optionId)
      : [...selected.filter((item) => !(isNone || noneIds.includes(item))), optionId];
    onChange(isNone ? [optionId] : next.filter((item) => !noneIds.includes(item)));
  }

  const primaryCategory = question.options[0]?.category ?? "aiBasics";

  return (
    <section ref={containerRef} className="quiz-card-enter rounded-xl border border-white/60 glass-card p-6 shadow-soft sm:p-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[primaryCategory]}`}>
            {categoryLabels[primaryCategory]}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {question.type === "multi" ? "Select all that apply" : "Choose one"}
          </span>
        </div>
        <h1 className="mt-4 text-xl font-semibold leading-snug text-navy sm:text-2xl">{question.title}</h1>
      </div>

      <div className="grid gap-2.5">
        {question.options.map((option, index) => {
          const active = question.type === "single" ? value === option.id : selected.includes(option.id);
          const letter = optionLabel(index);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              className={`card-lift flex items-start gap-3.5 rounded-lg border p-3.5 text-left transition-colors sm:p-4 ${
                active
                  ? "border-electric bg-blue-50/80 text-navy shadow-sm"
                  : "border-line bg-white text-slate-600 hover:border-electric/40 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  active ? "bg-electric text-white shadow-sm" : "bg-slate-100 text-slate-400"
                }`}
              >
                {question.type === "single" ? letter : active ? "✓" : letter}
              </span>
              <span className="pt-0.5 text-sm leading-6">{option.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400">Press A-{optionLabel(question.options.length - 1)} to select, Enter to continue</p>
    </section>
  );
}
