import { cn } from "~/lib/utils";
import {
  CheckCircle,
  TriangleAlert,
  XCircle,
  Check,
  AlertCircle,
} from "lucide-react";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-sm w-full bg-linear-to-b to-light-white p-8 flex flex-col gap-4",
        score > 69 ? "from-green-100"
        : score > 49 ? "from-yellow-100"
        : "from-red-100",
      )}
    >
      <div className="flex flex-row gap-4 items-center justify-between">
        {score > 69 ?
          <div className="flex flex-row gap-2 items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />{" "}
            <span className="text-xl font-semibold">ATS Score</span>
          </div>
        : score > 49 ?
          <div className="flex flex-row gap-2 items-center">
            <TriangleAlert className="w-8 h-8 text-yellow-600" />{" "}
            <span className="text-xl font-semibold">ATS Score</span>
          </div>
        : <div className="flex flex-row gap-2 items-center">
            <XCircle className="w-8 h-8 text-red-600" />{" "}
            <span className="text-xl font-semibold">ATS Score</span>
          </div>
        }
        <p className="text-xl font-semibold">
          {score} <span className="opacity-30">/ 100</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium leading-snug mt-2">
          {score > 69 ?
            "Great job! Your resume is optimized for Applicant Tracking Systems."
          : score > 49 ?
            "Good start, but your resume could use some optimization."
          : "Your resume needs improvement to pass Applicant Tracking Systems."}
        </p>
        <p className="opacity-50 leading-snug text-sm mb-6">
          Your resume was scanned like an employer would. <br /> Here's how it
          performed:
        </p>
        {suggestions.map((suggestion, index) => (
          <div className="flex flex-row gap-2 items-start" key={index}>
            {suggestion.type === "good" ?
              <Check className="w-4 h-4 text-green-600 shrink-0 mt-1" />
            : <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-1" />}
            <p
              className={`text-gray-500 ${suggestion.type === "good" ? "text-green-600" : "text-yellow-600"}`}
            >
              {suggestion.tip}
            </p>
          </div>
        ))}
        <p className=" text-gray-500 italic mt-6">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
