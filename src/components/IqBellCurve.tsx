type IqBellCurveProps = {
  score: number;
};

const minScore = 50;
const maxScore = 225;
const mean = 100;
const deviation = 20;
const width = 900;
const height = 280;
const leftPad = 44;
const rightPad = 44;
const baseline = 200;
const peakHeight = 142;

const bands = [
  { from: 50, to: 84, color: "#e2e8f0" },
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

function areaPath(from: number, to: number) {
  const points: string[] = [];
  for (let s = from; s <= to; s += 1) points.push(`${xFor(s).toFixed(2)},${bellY(s).toFixed(2)}`);
  return `M ${xFor(from).toFixed(2)},${baseline} L ${points.join(" L ")} L ${xFor(to).toFixed(2)},${baseline} Z`;
}

export function IqBellCurve({ score }: IqBellCurveProps) {
  const clampedScore = Math.max(minScore, Math.min(maxScore, score));
  const markerX = xFor(clampedScore);
  const markerY = bellY(clampedScore);

  return (
    <section className="rounded-xl border border-white/60 glass-card p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-navy">Where you sit on the AI Business IQ curve</h2>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`AI Business IQ bell curve. Your score is ${score}.`} className="h-auto w-full overflow-visible">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width={width} height={height} rx="10" fill="#f8fafc" />
        {bands.map((band) => (
          <path key={`${band.from}-${band.to}`} d={areaPath(band.from, band.to)} fill={band.color} opacity="0.65" />
        ))}
        <path
          d={(() => {
            const pts: string[] = [];
            for (let s = minScore; s <= maxScore; s += 1) pts.push(`${xFor(s).toFixed(2)},${bellY(s).toFixed(2)}`);
            return `M ${pts.join(" L ")}`;
          })()}
          fill="none"
          stroke="#071426"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line x1={xFor(100)} x2={xFor(100)} y1="72" y2={baseline + 6} stroke="#94a3b8" strokeDasharray="5 7" strokeWidth="1.5" />
        <text x={xFor(100)} y="76" textAnchor="middle" fill="#64748b" fontSize="15" fontWeight="700">
          Average
        </text>

        <g filter="url(#glow)">
          <line className="iq-marker-line" x1={markerX} x2={markerX} y1={baseline + 8} y2={markerY - 10} stroke="#1f7bff" strokeWidth="5" strokeLinecap="round" />
          <circle className="iq-marker-dot" cx={markerX} cy={markerY - 15} r="11" fill="#1f7bff" />
        </g>
        <text x={markerX} y="32" textAnchor="middle" fill="#1f7bff" fontSize="19" fontWeight="800">
          You: {score}
        </text>

        <line x1={leftPad} x2={width - rightPad} y1={baseline + 18} y2={baseline + 18} stroke="#cbd5e1" strokeWidth="1" />
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={xFor(tick)} x2={xFor(tick)} y1={baseline + 12} y2={baseline + 24} stroke="#94a3b8" strokeWidth="1" />
            <text x={xFor(tick)} y={baseline + 46} textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="700">
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
