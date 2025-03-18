import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./shared/navbar/navbar";
import Home from "./components/home";
import Pantry from "./components/pantry";
import Generation from "./components/generation";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/generate" element={<Generation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
