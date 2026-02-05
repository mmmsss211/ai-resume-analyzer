import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let badgeText = "";

  if (score > 70) {
    badgeColor = "bg-green-100 text-green-700";
    badgeText = "Strong";
  } else if (score > 49) {
    badgeColor = "bg-yellow-100 text-yellow-700";
    badgeText = "Good Start";
  } else {
    badgeColor = "bg-red-100 text-red-700";
    badgeText = "Needs Work";
  }

  return (
    <div className={`px-3 py-1 rounded-full w-fit ${badgeColor}`}>
      <p className="text-[10px] font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
