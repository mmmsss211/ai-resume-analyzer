import { useNavigate, useParams } from "react-router";
import Navbar from "~/components/Navbar";
import { Ripple } from "~/components/ui/ripple";
import { AnimatedShinyText } from "~/components/ui/animated-shiny-text";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resiomai | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const navigate = useNavigate();
  console.log(id);

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

      const imageBlob = await fs.read(data.iamgePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

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
      <section className="flex flex-row w-full max-lg:flex-col-reverse">
        <div className="animate-in fade-in duration-1000">
          {imageUrl && resumeUrl && (
            <div>
              <img src={imageUrl} alt="" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Resume;
