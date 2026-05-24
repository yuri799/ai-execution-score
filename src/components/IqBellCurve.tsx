type IqBellCurveProps = {
  score: number;
};

const minScore = 50;
const maxScore = 225;
const mean = 100;
const deviation = 20;
const width = 900;
const height = 270;
const leftPad = 34;
const rightPad = 34;
const baseline = 190;
const peakHeight = 132;

const bands = [
  { from: 50, to: 84, color: "#e5e7eb" },
  { from: 85, to: 99, color: "#fed7aa" },
  { from: 100, to: 114, color: "#fef08a" },
  { from: 115, to: 134, color: "#bbf7d0" },
  { from: 135, to: 159, color: "#86efac" },
  { from: 160, to: 189, color: "#22c55e" },
  { from: 190, to: 225, color: "#facc15" },
];

const ticks = [50, 70, 85, 100, 115, 135, 160, 190, 225];

function xFor(score: number) {
  return leftPad + ((score - minScore) / (maxScore - minScore)) * (width - leftPad - rightPad);
}

function bellY(score: number) {
  const density = Math.exp(-0.5 * ((score - mean) / deviation) ** 2);
  return baseline - density * peakHeight;
}

function curvePath(from = minScore, to = maxScore) {
  const points: string[] = [];
  for (let score = from; score <= to; score += 1) points.push(`${xFor(score).toFixed(2)},${bellY(score).toFixed(2)}`);
  return `M ${points.join(" L ")}`;
}

function areaPath(from: number, to: number) {
  const points: string[] = [];
  for (let score = from; score <= to; score += 1) points.push(`${xFor(score).toFixed(2)},${bellY(score).toFixed(2)}`);
  return `M ${xFor(from).toFixed(2)},${baseline} L ${points.join(" L ")} L ${xFor(to).toFixed(2)},${baseline} Z`;
}

export function IqBellCurve({ score }: IqBellCurveProps) {
  const clampedScore = Math.max(minScore, Math.min(maxScore, score));
  const markerX = xFor(clampedScore);
  const markerY = bellY(clampedScore);
  const geniusX = xFor(225);
  const geniusY = bellY(225);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-navy">Where you sit on the AI Business IQ curve</h2>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`AI Business IQ bell curve. Your score is ${score}.`} className="h-auto w-full overflow-visible">
        <rect x="0" y="0" width={width} height={height} rx="8" fill="#f8fafc" />
        {bands.map((band) => (
          <path key={`${band.from}-${band.to}`} d={areaPath(band.from, band.to)} fill={band.color} opacity="0.72" />
        ))}
        <path d={curvePath()} fill="none" stroke="#071426" strokeWidth="4" strokeLinecap="round" />
        <line x1={xFor(100)} x2={xFor(100)} y1="78" y2={baseline + 6} stroke="#94a3b8" strokeDasharray="5 7" />
        <text x={xFor(100)} y="82" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="700">
          Average
        </text>

        <line className="iq-marker-line" x1={markerX} x2={markerX} y1={baseline + 8} y2={markerY - 8} stroke="#1f7bff" strokeWidth="5" strokeLinecap="round" />
        <circle className="iq-marker-dot" cx={markerX} cy={markerY - 12} r="10" fill="#1f7bff" />
        <text x={markerX} y="34" textAnchor="middle" fill="#1f7bff" fontSize="20" fontWeight="800">
          You: {score}
        </text>

        <text x={geniusX - 4} y={geniusY + 10} textAnchor="middle" fill="#f59e0b" fontSize="34" fontWeight="900">
          *
        </text>
        <text x={geniusX - 4} y="38" textAnchor="end" fill="#92400e" fontSize="16" fontWeight="800">
          AI Genius
        </text>
        <text x={geniusX - 4} y="58" textAnchor="end" fill="#92400e" fontSize="13" fontWeight="700">
          where you need to be
        </text>

        <line x1={leftPad} x2={width - rightPad} y1={baseline + 18} y2={baseline + 18} stroke="#cbd5e1" />
        {ticks.map((tick, index) => (
          <g key={tick} className={index % 2 === 1 ? "hidden sm:block" : ""}>
            <line x1={xFor(tick)} x2={xFor(tick)} y1={baseline + 12} y2={baseline + 24} stroke="#94a3b8" />
            <text x={xFor(tick)} y={baseline + 48} textAnchor="middle" fill="#64748b" fontSize="15" fontWeight="700">
              {tick}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        The average AI Business IQ across business owners is 100. The top 1% scores above 190. To stay ahead of the curve, you want to be in the top 5% (160+).
      </p>
    </section>
  );
}
