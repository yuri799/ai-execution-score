type ScoreCardProps = {
  score: number;
  label?: string;
  suffix?: string;
  maxScore?: number;
  tierLabel?: string;
};

export function ScoreCard({ score, label = "AI Business IQ", suffix = "IQ", maxScore = 225, tierLabel }: ScoreCardProps) {
  const width = Math.min(100, Math.max(0, (score / maxScore) * 100));
  return (
    <div className="rounded-lg bg-navy p-6 text-white shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">{label}</p>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-6xl font-bold">{score}</span>
        <span className="pb-2 text-lg text-blue-100">{suffix}</span>
      </div>
      {tierLabel ? <p className="mt-3 text-base font-semibold text-blue-100">{tierLabel}</p> : null}
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full bg-electric" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
