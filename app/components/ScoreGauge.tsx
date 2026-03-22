import { useEffect, useRef, useState, useId } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [animated, setAnimated] = useState(false);

  const id = useId();
  const gradientId = `gauge-gradient-${id}`;

  const getColors = () => {
    if (score > 80) return { start: "#059669", end: "#6ee7b7" }; // emerald-600 → emerald-300
    if (score >= 60) return { start: "#d97706", end: "#fbbf24" }; // amber-600 → amber-400
    return { start: "#dc2626", end: "#f87171" };                   // red-600 → red-400
  };

  const { start, end } = getColors();
  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
      // Small delay so the browser paints the hidden state first
      const t = setTimeout(() => setAnimated(true), 80);
      return () => clearTimeout(t);
    }
  }, []);

  // When not animated: offset = full pathLength (arc is invisible)
  // When animated: offset = target position (arc fills to score)
  const strokeOffset = !pathLength
    ? 1                                    // pre-mount: hide with tiny dash
    : animated
    ? pathLength * (1 - percentage)        // final position
    : pathLength;                          // fully hidden, ready to animate

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

          {/* Animated foreground arc */}
          <path
            ref={pathRef}
            d="M10,45 A40,40 0 0,1 90,45"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength || 1}
            strokeDashoffset={strokeOffset}
            style={{
              transition: animated
                ? "stroke-dashoffset 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "none",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
          <div className="text-xl font-semibold pt-4">{score} / 100</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
