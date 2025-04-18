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