import { Link } from "react-router-dom";
import "./styles.css"; // Ensure the CSS file is imported

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Recipe Generator</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pantry">Pantry</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
