import type {Route} from "./+types/home";
import {Ripple} from "~/components/ui/ripple";
import {AnimatedShinyText} from "~/components/ui/animated-shiny-text";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Veltigore Resumai"},
        {name: "description", content: "Smart resume generator"},
    ];
}

export default function Home() {
    return <main>
        <section className="flex flex-col items-center text-center relative">
            <Navbar/>
            <div className="pt-40 max-w-[400px] flex flex-col gap-5 z-10">
                <div className="flex justify-center">
                    <div className="flex justify-center rounded-full bg-white py-1 px-4 text-xs mb-2">
                        <AnimatedShinyText>AI Powered resume generator</AnimatedShinyText>
                    </div>
                </div>
                <h1 className="text-5xl font-medium text-emerald-900">Track Applications & Resume Ratings</h1>
                <p className="text-lg text-emerald-700">AI powered resume reviewer and generator.</p>
            </div>
            <div className="absolute h-[500px] w-full overflow-hidden z-0">
                <Ripple borderColor={"border-emerald-950"}/>
            </div>


        </section>
    </main>
}
