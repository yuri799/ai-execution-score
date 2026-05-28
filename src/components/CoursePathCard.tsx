import type { CourseRecommendation } from "@/lib/types";

type CoursePathCardProps = {
  module: CourseRecommendation;
};

const statusStyles: Record<string, string> = {
  Full: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beginner: "bg-sky-50 text-sky-700 border-sky-200",
  Practical: "bg-violet-50 text-violet-700 border-violet-200",
  Advanced: "bg-amber-50 text-amber-700 border-amber-200",
  Summary: "bg-slate-50 text-slate-600 border-slate-200",
  Skip: "bg-slate-50 text-slate-400 border-slate-200 line-through",
};

export function CoursePathCard({ module }: CoursePathCardProps) {
  return (
    <article className="card-lift rounded-xl border border-white/60 glass-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-navy">{module.module}</h3>
        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[module.status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
          {module.status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{module.reason}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {module.lessons.slice(0, 4).map((lesson) => (
          <li key={lesson} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric/50" />
            {lesson}
          </li>
        ))}
      </ul>
    </article>
  );
}
