import { useEffect, useState } from "react";
import { AnimatedShinyText } from "~/components/ui/animated-shiny-text";
import { Button } from "~/components/ui/button";
import { Ripple } from "~/components/ui/ripple";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, useLocation } from "react-router";
import ScoreGauge from "~/components/ScoreGauge";

export const meta = () => [
  { title: "Resiomai | Auth" },
  { name: "description", content: "Sign in to your account" },
];

// Static demo preview — shows what an analysis looks like
const DEMO_CATEGORIES = [
  { label: "Tone & Style", score: 84 },
  { label: "Content", score: 76 },
  { label: "Structure", score: 71 },
  { label: "Skills", score: 68 },
];

const DemoBar = ({ label, score }: { label: string; score: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-gray-400 w-20 text-right shrink-0">{label}</span>
    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
      <div
        className="h-1.5 rounded-full bg-emerald-500"
        style={{ width: `${score}%` }}
      />
    </div>
    <span className="text-xs font-semibold text-emerald-900 w-6 tabular-nums">{score}</span>
  </div>
);

const PreviewMock = () => (
  <div className="pointer-events-none select-none w-full max-w-xl mx-auto relative">
    {/* Outer card */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Mock navbar strip */}
      <div className="bg-emerald-900 px-5 py-3 flex items-center justify-between">
        <span className="font-display italic text-white font-bold text-base tracking-tight">resiomai</span>
        <span className="text-xs text-emerald-300 font-medium">Software Engineer @ Acme Corp</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Score row */}
        <div className="flex items-center gap-6 bg-gray-50 rounded-lg p-4">
          <ScoreGauge score={74} />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-emerald-900">Your Resume Score</p>
            <p className="text-xs text-gray-400">Calculated from 4 key categories below</p>
          </div>
        </div>

        {/* Category bars */}
        <div className="flex flex-col gap-2.5 px-1">
          {DEMO_CATEGORIES.map((cat) => (
            <DemoBar key={cat.label} label={cat.label} score={cat.score} />
          ))}
        </div>

        {/* ATS snippet */}
        <div className="rounded-lg bg-amber-50 border-l-4 border-amber-400 p-3 flex flex-col gap-1">
          <p className="text-xs font-semibold text-amber-800">ATS Score: 68 / 100</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Good start — a few keyword gaps are reducing your match rate for this role.
          </p>
        </div>
      </div>
    </div>

    {/* Gradient fade mask — bottom half fades to white */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />
  </div>
);

const Auth = () => {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    await auth.signIn();
    if (usePuterStore.getState().auth.isAuthenticated) {
      navigate(next || "/");
    }
    setIsSigningIn(false);
  };

  const handleSignOut = async () => {
    setIsSigningIn(true);
    await auth.signOut();
    setIsSigningIn(false);
  };

  return (
    <main className="pb-20">
      <section className="flex flex-col items-center text-center relative">
        <div className="pt-20 pb-28 max-w-[400px] flex flex-col gap-5 z-10">
          <div className="flex justify-center">
            <div className="flex justify-center rounded-full bg-white py-1 px-4 text-xs mb-2">
              <AnimatedShinyText>AI-Powered · Free · Instant</AnimatedShinyText>
            </div>
          </div>
          <h1 className="font-display text-5xl font-semibold text-emerald-900 text-balance leading-tight">
            Start Reviewing Resumes
          </h1>
          <p className="text-lg text-emerald-700 max-w-[300px] mx-auto mb-4">
            Instant AI feedback on your resume — free, fast, and private.
          </p>
          <div className="w-full">
            {auth.isAuthenticated ?
              <Button
                onClick={handleSignOut}
                disabled={isSigningIn}
                className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
              >
                {isSigningIn ? "Logging out..." : "Logout"}
              </Button>
            : <Button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
              >
                {isSigningIn ? "Signing in..." : "Sign In"}
              </Button>
            }
          </div>
        </div>
        <div className="absolute h-[500px] w-full overflow-hidden z-0">
          <Ripple borderColor={"border-emerald-950"} />
        </div>
      </section>

      {/* Product preview — shows what the analysis output looks like */}
      <section className="px-4 -mt-10 z-10 relative animate-in fade-in duration-1000">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
            Example Analysis
          </p>
          <PreviewMock />
        </div>
      </section>
    </main>
  );
};

export default Auth;
