import {Link} from "lucide-react";
import {RippleButton} from "~/components/ui/ripple-button";

const Navbar = () => {
    return (
        <nav className="flex content-between items-center p-4">
            <Link href="/"><p className="text-xl font-bold">Veltigore Resumai</p></Link>
            <RippleButton className="text-sm text-emerald-900">Upload Resume</RippleButton>
        </nav>
    )
}

export default Navbar;