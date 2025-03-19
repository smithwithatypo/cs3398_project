import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#114945] p-4">
      <h1 className="text-white text-xl font-bold m-0">Recipe Generator</h1>
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
          <li><Link to="/generate" className="text-white font-bold hover:underline">Generate Recipe</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
