import { useId } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const id = useId();
  const gradientId = `grad-${id}`;

  const getColors = () => {
    if (score > 80) return { start: "#059669", end: "#6ee7b7" }; // emerald-600 → emerald-300
    if (score >= 60) return { start: "#d97706", end: "#fbbf24" }; // amber-600 → amber-400
    return { start: "#dc2626", end: "#f87171" };                   // red-600 → red-400
  };
  const { start, end } = getColors();

  return (
    <div className="relative w-[70px] h-[70px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        <defs>
          <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>
        {/* Score arc */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-lg text-emerald-900">{`${score}`}</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
