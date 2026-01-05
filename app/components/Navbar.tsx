import { Link } from "react-router";
import { RippleButton } from "~/components/ui/ripple-button";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 w-full max-w-5xl mx-auto z-20">
            <Link to="/"><p className="text-xl font-bold text-emerald-950 uppercase">Resumai</p></Link>
            <RippleButton className="text-sm text-emerald-900 border border-emerald-200">Upload Resume</RippleButton>
        </nav>
    )
}

export default Navbar;