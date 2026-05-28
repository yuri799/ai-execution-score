type CategoryScoreBarProps = {
  label: string;
  score: number;
};

function barColor(score: number) {
  if (score >= 70) return "bg-emerald-400";
  if (score >= 40) return "bg-amber-400";
  return "bg-red-400";
}

export function CategoryScoreBar({ label, score }: CategoryScoreBarProps) {
  const w = Math.max(score, 4);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-navy">{score}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80">
        <div
          className={`h-full rounded-full ${barColor(score)}`}
          style={{ width: `${w}%`, transition: "width 600ms ease-out" }}
        />
      </div>
    </div>
  );
}
