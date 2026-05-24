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

  return (
    <section className="rounded-lg border border-line bg-white p-6 shadow-soft">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-electric">{question.type === "multi" ? "Select all that apply" : "Choose one"}</p>
        <h1 className="mt-2 text-2xl font-semibold text-navy">{question.title}</h1>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const active = question.type === "single" ? value === option.id : selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${
                active ? "border-electric bg-blue-50 text-navy" : "border-line bg-white text-slate-700 hover:border-electric/60"
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${active ? "bg-electric text-white" : "bg-slate-100 text-slate-500"}`}>
                {question.type === "single" ? optionLabel(index) : active ? "+" : ""}
              </span>
              <span className="text-sm font-medium leading-6">{option.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
