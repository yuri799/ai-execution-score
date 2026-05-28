import type { ProjectRecommendation } from "@/lib/types";
import { Lightbulb } from "lucide-react";

type ProjectRecommendationCardProps = {
  project: ProjectRecommendation;
};

export function ProjectRecommendationCard({ project }: ProjectRecommendationCardProps) {
  return (
    <div className="rounded-xl border border-electric/20 bg-gradient-to-br from-blue-50/90 to-indigo-50/60 p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric/10">
          <Lightbulb size={20} className="text-electric" />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-electric">Recommended first AI project</p>
          <h2 className="mt-0.5 text-xl font-semibold text-navy sm:text-2xl">{project.name}</h2>
        </div>
      </div>
      <p className="mt-4 leading-7 text-slate-700">{project.description}</p>
    </div>
  );
}
