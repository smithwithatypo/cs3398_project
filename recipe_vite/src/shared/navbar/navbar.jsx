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
      <div className="flex gap-6 items-center">
        {/* Pantry with hover dropdown (fixed with group and absolute positioning) */}
        <div className="relative group">
          {/* Button trigger */}
          <Link to="/pantry" className="text-white font-bold hover:underline">
            Pantry
          </Link>

          {/* Dropdown menu (stays open when hovering over it) */}
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
        <Link to="/generate" className="text-white font-bold hover:underline">
          Generate Recipe
        </Link>

        {/* Profile */}
        <Link to="/profile" className="text-white font-bold hover:underline">
          Profile
        </Link>

        {/* Logout */}
        <Link to="/login" className="text-white font-bold hover:underline">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
