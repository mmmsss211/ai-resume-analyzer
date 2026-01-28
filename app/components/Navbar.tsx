import { Link } from "react-router";
import { Button } from "./ui/button";

interface NavbarProps {
  link?: string;
  buttonText?: string;
}

const Navbar = ({ link = "/", buttonText = "Upload Resume" }: NavbarProps) => {
  return (
    <nav className="flex justify-between items-center p-4 w-full max-w-5xl mx-auto z-20 animate-in fade-in duration-1000">
      <Link to="/">
        <p className="text-2xl font-bold text-emerald-800">resiomai</p>
      </Link>
      <Button
        asChild
        className="text-sm font-normal rounded-sm bg-emerald-800 hover:bg-emerald-900 cursor-pointer"
      >
        <Link to={link}>{buttonText}</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
