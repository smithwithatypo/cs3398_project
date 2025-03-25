import { Link } from "react-router-dom";
import icon from "../../assets/icon.jpg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#114945] p-4">
      <Link to="/" className="flex items-center gap-2">
        <img src={icon} alt="Logo" className="h-10 w-auto rounded-full" />
        <h1 className="text-white text-xl font-bold m-0">Recipe Generator</h1>
      </Link>
      <ul className="flex gap-6 m-0 p-0 list-none">
        <li>
          <Link
            to="/"
            className="text-white font-bold hover:underline"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/pantry"
            className="text-white font-bold hover:underline"
          >
            Pantry
          </Link>
        </li>
        <li>
          <Link 
            to="/generate" 
            className="text-white font-bold hover:underline"
          >
            Generate Recipe
          </Link>
        </li>
        <li>
          <Link 
            to="/cookbook" 
            className="text-white font-bold hover:underline"
          >
            Cookbook
          </Link>
        </li>
        <li>
          <Link 
            to="/replacement" 
            className="text-white font-bold hover:underline"
          >
            Ingredient Replacement
          </Link>
        </li>
        <li>
          <Link 
            to="/favorites" 
            className="text-white font-bold hover:underline"
          >
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;