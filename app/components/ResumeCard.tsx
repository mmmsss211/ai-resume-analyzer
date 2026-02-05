import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Resume } from "types";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";
import { Loader2 } from "lucide-react";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { auth, isLoading, fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResumes();
  }, [imagePath]);

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
            {!resumeUrl ?
              <div className="h-[160px] w-full flex items-center justify-center bg-gray-50 rounded-sm">
                <Loader2 className="animate-spin text-emerald-500" />
              </div>
            : <img
                src={resumeUrl || ""}
                className="rounded-sm w-full h-[160px] object-cover object-top"
                alt="resume"
              />
            }
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ResumeCard;
