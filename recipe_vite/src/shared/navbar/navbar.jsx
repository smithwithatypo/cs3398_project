import { Link } from "react-router-dom";
import { useState } from "react";
import icon from "../../assets/Icon.jpg";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-[#114945] p-4 relative">
      {/* Logo & Title (left) */}
      <Link to="/" className="flex items-center gap-2">
        <img src={icon} alt="Logo" className="h-10 w-auto rounded-full" />
        <h1 className="text-white text-xl font-bold m-0">Recipe Generator</h1>
      </Link>

      {/* Right-side nav links */}
      <div className="flex gap-6 items-center">
        {/* Pantry with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white font-bold hover:underline focus:outline-none"
          >
            Pantry
          </button>

          {dropdownOpen && (
            <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
              <li>
                <Link
                  to="/cookbook"
                  className="block px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Cookbook
                </Link>
              </li>
              <li>
                <Link
                  to="/replacement"
                  className="block px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Ingredient Replacement
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="block px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Favorites
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Generate Recipe (right tab) */}
        <Link
          to="/generate"
          className="text-white font-bold hover:underline"
        >
          Generate Recipe
        </Link>

        {/* Logout (right tab) */}
        <Link
          to="/login"
          className="text-white font-bold hover:underline"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
