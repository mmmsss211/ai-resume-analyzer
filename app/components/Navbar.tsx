import { Link } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 w-full max-w-5xl mx-auto z-20">
            <Link to="/"><p className="text-2xl font-bold text-emerald-800">resiomai</p></Link>
            <Button className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer">Upload Resume</Button>
        </nav>
    )
}

export default Navbar;