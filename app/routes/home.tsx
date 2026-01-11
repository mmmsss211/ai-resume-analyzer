import type { Route } from "./+types/home";
import { Ripple } from "~/components/ui/ripple";
import { AnimatedShinyText } from "~/components/ui/animated-shiny-text";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Veltigore Resumai" },
    { name: "description", content: "Smart resume generator" },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=");
    }
  }, [auth.isAuthenticated, isLoading]);
  
  return (
    <main>
      <section className="flex flex-col items-center text-center relative">
        <Navbar />
        <div className="pt-20 pb-28 max-w-[400px] flex flex-col gap-5 z-10">
          <div className="flex justify-center">
            <div className="flex justify-center rounded-full bg-white py-1 px-4 text-xs mb-2">
              <AnimatedShinyText>AI Powered resume generator</AnimatedShinyText>
            </div>
          </div>
          <h1 className="text-5xl font-medium text-emerald-900">
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
      <section className="relative max-w-5xl mx-auto px-4 z-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {resumes.length < 0 ? (
          <h1>No resumes found</h1>
        ) : (
          resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))
        )}
      </section>
    </main>
  );
}
