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
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Pantry
        </Link>

        {/* Cookbook */}
        <Link 
          to="/cookbook" 
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Cookbook
        </Link>

        {/* Generate Recipe */}
        <Link 
          to="/generation" 
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Generate
        </Link>

        {/* Ingredient Replacement */}
        <Link 
          to="/replacement" 
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Replacements
        </Link>

        {/* Favorites */}
        <Link 
          to="/favorites" 
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Favorites
        </Link>

        {/* Profile */}
        <Link 
          to="/profile" 
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Profile
        </Link>

        {/* Logout */}
        <Link 
          to="/login" 
          className="text-[#114945] font-medium bg-[#d9b75e] hover:bg-[#c9a74e] px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;