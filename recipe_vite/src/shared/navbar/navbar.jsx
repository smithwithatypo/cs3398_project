import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import icon from "../../assets/Icon.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 p-4 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      } bg-gradient-to-r from-[#0e3b2f] via-[#114945] to-[#19725b] flex justify-between items-center`}
    >
      {/* Logo & Title */}
      <Link to="/" className="flex items-center gap-2">
        <img src={icon} alt="Logo" className="h-10 w-auto rounded-full" />
        <h1 className="text-white text-xl font-bold m-0">Recipe Generator</h1>
      </Link>

      {/* Right-side nav links */}
      <div className="flex gap-2 items-center">
        {/* Pantry */}
        <Link 
          to="/pantry" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Pantry
        </Link>

        {/* Cookbook */}
        <Link 
          to="/cookbook" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Cookbook
        </Link>

        {/* Generate Recipe */}
        <Link 
          to="/generation" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Generate
        </Link>

        {/* Ingredient Replacement */}
        <Link 
          to="/replacement" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Replacements
        </Link>

        {/* Favorites */}
        <Link 
          to="/favorites" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Favorites
        </Link>

        {/* Profile */}
        <Link 
          to="/profile" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Profile
        </Link>

        {/* Logout */}
        <Link 
          to="/login" 
          className="text-white font-normal bg-[#c9a74e] hover:bg-[#b99540] hover:scale-105 px-3 py-1.5 rounded-md text-sm transition-all duration-200"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;