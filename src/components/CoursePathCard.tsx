import type { CourseRecommendation } from "@/lib/types";

type CoursePathCardProps = {
  module: CourseRecommendation;
};

export function CoursePathCard({ module }: CoursePathCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-navy">{module.module}</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">{module.status}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{module.reason}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {module.lessons.slice(0, 4).map((lesson) => (
          <li key={lesson} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
            {lesson}
          </li>
        ))}
      </ul>
    </article>
  );
}
