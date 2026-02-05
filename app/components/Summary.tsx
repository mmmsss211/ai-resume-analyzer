import React from "react";
import ScoreGauge from "./ScoreGauge";
import type { Feedback } from "@/types";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  return (
    <div className="flex flex-row gap-1 w-full justify-between bg-gray-100 p-4 rounded-sm">
      <div className="flex flex-row items-center gap-2">
        <h2 className="font-medium">{title}</h2>
        <ScoreBadge score={score} />
      </div>
      <p>
        <span
          className={`font-medium ${
            score > 80 ? "text-green-500"
            : score > 60 ? "text-yellow-500"
            : "text-red-500"
          }`}
        >
          {score}
        </span>{" "}
        <span className="text-gray-400">/ 100</span>
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-sm p-6 w-full flex flex-col gap-4">
      <div className="flex flex-row items-center gap-8">
        <ScoreGauge score={feedback.overallScore || 0} />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium text-emerald-900">
            Your Resume Score
          </h2>
          <p className="text-xs text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Category
          title="Overall Score"
          score={feedback.toneAndStyle.score || 0}
        />
        <Category title="Content" score={feedback.content.score || 0} />
        <Category title="Structure" score={feedback.structure.score || 0} />
        <Category title="Skills" score={feedback.skills.score || 0} />
      </div>
    </div>
  );
};

export default Summary;
