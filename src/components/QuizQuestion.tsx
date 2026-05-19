"use client";

import type { AnswerValue, Question } from "@/lib/types";

type QuizQuestionProps = {
  question: Question;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
};

function optionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

export function QuizQuestion({ question, value, onChange }: QuizQuestionProps) {
  const selected = Array.isArray(value) ? value : [];

  function toggle(option: string) {
    if (question.type === "single") {
      onChange(option);
      return;
    }
    const isNone = option === "None of these" || option === "None without review";
    const next = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected.filter((item) => !(isNone || item.startsWith("None"))), option];
    if (question.maxSelections && next.length > question.maxSelections) return;
    onChange(isNone ? [option] : next.filter((item) => !item.startsWith("None")));
  }

  return (
    <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-electric">{question.type === "multi" ? "Select all that apply" : "Choose one"}</p>
        <h1 className="mt-2 text-2xl font-semibold text-navy">{question.title}</h1>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const active = question.type === "single" ? value === `${optionLabel(index)}. ${option}` : selected.includes(option);
          const answer = question.type === "single" ? `${optionLabel(index)}. ${option}` : option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(answer)}
              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${
                active ? "border-electric bg-blue-50 text-navy" : "border-line bg-white text-slate-700 hover:border-electric/60"
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? "bg-electric text-white" : "bg-slate-100 text-slate-500"}`}>
                {question.type === "single" ? optionLabel(index) : active ? "+" : ""}
              </span>
              <span className="text-sm font-medium leading-6">{option}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
