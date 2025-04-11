import { Link } from "react-router-dom";
import { useState } from "react";
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
        {/* Pantry with hover dropdown */}
        <div className="relative group">
          <Link
            to="/pantry"
            className="text-white font-bold hover:underline"
          >
            Pantry
          </Link>

          {/* Dropdown menu appears on hover */}
          <ul className="absolute hidden group-hover:block top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
            <li>
              <Link
                to="/cookbook"
                className="block px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
              >
                Cookbook
              </Link>
            </li>
            <li>
              <Link
                to="/replacement"
                className="block px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
              >
                Ingredient Replacement
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="block px-4 py-2 text-[#1e2d3d] hover:bg-gray-100"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        {/* Generate Recipe */}
        <Link
          to="/generate"
          className="text-white font-bold hover:underline"
        >
          Generate Recipe
        </Link>

        {/* Logout */}
        <Link
          to="/login"
          className="text-white font-bold hover:underline"
        >
          Logout
        </Link>
        <Link to="/profile" className="text-white font-bold hover:underline">
          Profile
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
