import { Link } from "react-router-dom";
import icon from "../../assets/Icon.jpg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#114945] p-4 relative">
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
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Pantry
        </Link>

        {/* Cookbook */}
        <Link 
          to="/cookbook" 
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Cookbook
        </Link>

        {/* Generate Recipe */}
        <Link 
          to="/generation" 
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Generate
        </Link>

        {/* Ingredient Replacement */}
        <Link 
          to="/replacement" 
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Replacements
        </Link>

        {/* Favorites */}
        <Link 
          to="/favorites" 
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Favorites
        </Link>

        {/* Profile */}
        <Link 
          to="/profile" 
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Profile
        </Link>

        {/* Logout */}
        <Link 
          to="/login" 
          className="text-white font-medium hover:bg-[#1a6b65] px-3 py-1.5 rounded-md text-sm border border-[#d9b75e] transition-colors"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;