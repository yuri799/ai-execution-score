type CategoryScoreBarProps = {
  label: string;
  score: number;
};

export function CategoryScoreBar({ label, score }: CategoryScoreBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-navy">{score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-electric" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
