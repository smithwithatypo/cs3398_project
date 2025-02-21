import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Recipe Generator</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pantry">Pantry</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;