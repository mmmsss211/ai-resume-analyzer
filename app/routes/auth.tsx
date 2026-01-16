import { useEffect, useState } from "react";
import { AnimatedShinyText } from "~/components/ui/animated-shiny-text";
import { Button } from "~/components/ui/button";
import { Ripple } from "~/components/ui/ripple";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, useLocation } from "react-router";

export const meta = () => [
  { title: "Resiomai | Auth" },
  { name: "description", content: "Sign in to your account" },
];

const Auth = () => {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // useEffect(() => {
  //   if (!isLoading && auth.isAuthenticated) {
  //     navigate(next || "/");
  //   }
  // }, [auth.isAuthenticated, next, navigate]);

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
    <main className="pb-10">
      <section className="flex flex-col items-center text-center relative">
        <div className="pt-20 pb-28 max-w-[400px] flex flex-col gap-5 z-10">
          <div className="flex justify-center">
            <div className="flex justify-center rounded-full bg-white py-1 px-4 text-xs mb-2">
              <AnimatedShinyText>Sign in to your account</AnimatedShinyText>
            </div>
          </div>
          <h1 className="text-5xl font-medium text-emerald-900">
            Let's get you ready
          </h1>
          <p className="text-lg text-emerald-700 max-w-[300px] mx-auto mb-4">
            Sign in to your account and start using in seconds.
          </p>
          <div className="w-full">
            {auth.isAuthenticated ? (
              <Button
                onClick={handleSignOut}
                disabled={isSigningIn}
                className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
              >
                {isSigningIn ? "Logging out..." : "Logout"}
              </Button>
            ) : (
              <Button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
              >
                {isSigningIn ? "Signing in..." : "Sign In"}
              </Button>
            )}
          </div>
        </div>
        <div className="absolute h-[500px] w-full overflow-hidden z-0">
          <Ripple borderColor={"border-emerald-950"} />
        </div>
      </section>
    </main>
  );
};

export default Auth;
