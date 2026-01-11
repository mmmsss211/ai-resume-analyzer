import { Link } from "react-router";
import type { Resume } from "types";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  return (
    <Link to={`/resume/${id}`}>
      <div className="bg-white p-2 rounded-md border border-emerald-100 transition-all hover:border-emerald-500">
        <div className="flex justify-between items-center p-2 mb-2">
          <div>
            <h1 className="text-lg font-semibold text-emerald-900">
              {companyName}
            </h1>
            <p className="text-sm text-gray-400">{jobTitle}</p>
          </div>
          <ScoreCircle score={feedback.overallScore} />
        </div>
        <div className="animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img src={imagePath} className="rounded-sm w-full h-[160px] object-cover object-top" alt="resume" />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ResumeCard;
