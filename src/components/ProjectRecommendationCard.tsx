import type { ProjectRecommendation } from "@/lib/types";

type ProjectRecommendationCardProps = {
  project: ProjectRecommendation;
};

export function ProjectRecommendationCard({ project }: ProjectRecommendationCardProps) {
  return (
    <div className="rounded-lg border border-electric/30 bg-blue-50 p-6">
      <p className="text-sm font-bold uppercase tracking-wide text-electric">Recommended first AI project</p>
      <h2 className="mt-2 text-2xl font-semibold text-navy">{project.name}</h2>
      <p className="mt-3 leading-7 text-slate-700">{project.description}</p>
    </div>
  );
}
