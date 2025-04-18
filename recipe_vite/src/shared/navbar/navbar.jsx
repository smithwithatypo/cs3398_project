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

  // Tailwind classes for glowing button-style links
  const navLinkStyle =
    "text-white font-bold px-4 py-2 rounded-md transition duration-300 hover:bg-white hover:text-[#114945] hover:shadow-lg hover:shadow-[#d9b75e]/50";

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
      <div className="flex gap-4 items-center">
        {/* Pantry with hover dropdown */}
        <div className="relative group">
          <Link to="/pantry" className={navLinkStyle}>
            Pantry
          </Link>
          <div className="absolute top-full left-0 mt-2 hidden group-hover:flex flex-col w-48 bg-white shadow-md rounded-md z-50">
            <Link
              to="/cookbook"
              className="px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
            >
              Cookbook
            </Link>
            <Link
              to="/replacement"
              className="px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
            >
              Ingredient Replacement
            </Link>
            <Link
              to="/favorites"
              className="px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
            >
              Favorites
            </Link>
          </div>
        </div>

        {/* Generate Recipe */}
        <Link to="/generate" className={navLinkStyle}>
          Generate Recipe
        </Link>

        {/* Profile */}
        <Link to="/profile" className={navLinkStyle}>
          Profile
        </Link>

        {/* Logout */}
        <Link to="/login" className={navLinkStyle}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
