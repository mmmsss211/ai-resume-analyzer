import React from "react";
import ScoreGauge from "./ScoreGauge";
import type { Feedback } from "@/types";

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-sm p-4 w-full">
      <div className="flex flex-row items-center p4 gap-8">
        <ScoreGauge score={feedback.overallScore || 0} />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium text-emerald-900">
            Your Resume Score
          </h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
