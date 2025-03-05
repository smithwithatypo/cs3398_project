// import logo from './assets/logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/navbar/navbar";
import Home from "./components/home";
import Pantry from "./components/pantry";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pantry" element={<Pantry />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
