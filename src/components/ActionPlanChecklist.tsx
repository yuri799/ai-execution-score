type ActionPlanChecklistProps = {
  items: string[];
};

export function ActionPlanChecklist({ items }: ActionPlanChecklistProps) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item} className="card-lift flex gap-3 rounded-lg border border-white/60 glass-card p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-indigo text-xs font-bold text-white shadow-sm">
            {index + 1}
          </span>
          <span className="pt-0.5 text-sm leading-6 text-slate-700">{item}</span>
        </div>
      ))}
    </div>
  );
}
