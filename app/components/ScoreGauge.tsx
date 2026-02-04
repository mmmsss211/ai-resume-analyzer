import { useEffect, useRef, useState, useId } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  const id = useId();
  const gradientId = `gauge-gradient-${id}`;

  const getColors = () => {
    if (score > 80) return { start: "#3b82f6", end: "#2dd4bf" };
    if (score >= 60) return { start: "#eab308", end: "#facc15" };
    return { start: "#ef4444", end: "#f87171" };
  };

  const { start, end } = getColors();

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={start} />
              <stop offset="100%" stopColor={end} />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,45 A40,40 0 0,1 90,45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground arc with rounded ends */}
          <path
            ref={pathRef}
            d="M10,45 A40,40 0 0,1 90,45"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-xl font-semibold pt-4">{score}/100</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
