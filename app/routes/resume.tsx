import { useNavigate, useParams } from "react-router";
import Navbar from "~/components/Navbar";
import { Ripple } from "~/components/ui/ripple";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import type { Feedback } from "@/types";

export const meta = () => [
  { title: "Resiomai | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [auth.isAuthenticated, isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);

      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      console.log(imageUrl);

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <main>
      <section className="flex flex-col items-center text-center relative">
        <Navbar link="/" buttonText="Back to Home" />
        <div className="absolute h-[500px] w-full overflow-hidden z-0">
          <Ripple borderColor={"border-emerald-950"} />
        </div>
      </section>
      <section className="p-4 relative flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto z-50">
        <div className="animate-in fade-in duration-1000">
          {imageUrl && resumeUrl && (
            <a>
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-contain rounded-sm animate-in fade-in duration-1000"
              />
            </a>
          )}
        </div>
        <div className="animate-in fade-in duration-1000">
          {feedback ?
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-medium text-emerald-900 animate-in fade-in duration-1000">
                ATS Detailed Summary
              </p>
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          : <p>Loading...</p>}
        </div>
      </section>
    </main>
  );
};

export default Resume;
