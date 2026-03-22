import type { Route } from "./+types/home";
import { Ripple } from "~/components/ui/ripple";
import { AnimatedShinyText } from "~/components/ui/animated-shiny-text";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import type { Resume } from "@/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resiomai | Home" },
    { name: "description", content: "Smart resume generator" },
  ];
}

export default function Home() {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=");
    }
  }, [auth.isAuthenticated, isLoading]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoading(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      console.log("parsedResumes", parsedResumes);
      setResumes(parsedResumes || []);
      setLoading(false);
    };
    loadResumes();
  }, []);

  return (
    <main>
      <section className="flex flex-col items-center text-center relative">
        <Navbar link="/upload" buttonText="Upload Resume" />
        <div className="pt-20 pb-28 max-w-[400px] flex flex-col gap-5 z-10">
          <div className="flex justify-center">
            <div className="flex justify-center rounded-full bg-white py-1 px-4 text-xs mb-2">
              <AnimatedShinyText>AI Powered resume generator</AnimatedShinyText>
            </div>
          </div>
          <h1 className="font-display text-5xl font-semibold text-emerald-900 text-balance leading-tight">
            Track Applications & Resume Ratings
          </h1>
          <p className="text-lg text-emerald-700">
            AI powered resume reviewer and generator.
          </p>
        </div>
        <div className="absolute h-[500px] w-full overflow-hidden z-0">
          <Ripple borderColor={"border-emerald-950"} />
        </div>
      </section>
      <section className="relative max-w-5xl mx-auto px-4 z-20 flex flex-wrap justify-center gap-4">
        {resumes.length === 0 ?
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-lg font-medium text-emerald-900">No resumes yet</p>
            <p className="text-sm text-gray-400 max-w-[260px]">
              Upload your first resume to get an instant AI-powered score and feedback.
            </p>
            <a
              href="/upload"
              className="mt-2 inline-flex items-center justify-center h-11 px-5 rounded-sm bg-emerald-800 hover:bg-emerald-900 text-white text-sm transition-colors"
            >
              Upload a Resume
            </a>
          </div>
        : resumes.map((resume) => (
            <div key={resume.id} className="w-full sm:w-[320px]">
              <ResumeCard resume={resume} />
            </div>
          ))
        }
      </section>
    </main>
  );
}
