const Navbar = ({ setPage }) => {
    <nav className="navbar">
        <h1>Recipe Generator</h1>
        <ul>
            <li><button onClick={() => setPage("home")}>Home</button></li>
            <li><button onClick={() => setPage("pantry")}>Pantry</button></li>
        </ul>
    </nav>
};
export default Navbar;