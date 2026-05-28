import type { CourseRecommendation } from "@/lib/types";

type CoursePathCardProps = {
  module: CourseRecommendation;
};

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Full: { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
  Beginner: { bg: "#f0f9ff", text: "#0369a1", border: "#bae6fd" },
  Practical: { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
  Advanced: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  Summary: { bg: "#f8fafc", text: "#475569", border: "#e2e8f0" },
  Skip: { bg: "#f8fafc", text: "#94a3b8", border: "#e2e8f0" },
};

export function CoursePathCard({ module }: CoursePathCardProps) {
  const style = statusColors[module.status] ?? statusColors.Summary;

  return (
    <article className="card-lift rounded-xl border border-white/60 glass-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-navy">{module.module}</h3>
        <span
          className="inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold"
          style={{ background: style.bg, color: style.text, borderColor: style.border, textDecoration: module.status === "Skip" ? "line-through" : undefined }}
        >
          {module.status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{module.reason}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {module.lessons.slice(0, 4).map((lesson) => (
          <li key={lesson} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#1f7bff", opacity: 0.5 }} />
            {lesson}
          </li>
        ))}
      </ul>
    </article>
  );
}
