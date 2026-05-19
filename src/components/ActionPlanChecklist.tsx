type ActionPlanChecklistProps = {
  items: string[];
};

export function ActionPlanChecklist({ items }: ActionPlanChecklistProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-lg border border-line bg-white p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric text-sm font-bold text-white">+</span>
          <span className="text-sm font-medium leading-6 text-slate-700">{item}</span>
        </div>
      ))}
    </div>
  );
}
