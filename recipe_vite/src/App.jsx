import React from "react";
// Make sure you're using the latest react-router-dom version
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components with explicit paths - double check these paths are correct
import Home from "./components/home.jsx";
import Pantry from "./components/pantry.jsx";
import Generation from "./components/generation.jsx";
import Favorites from "./components/favorites.jsx";
import Cookbook from "./components/cookbook.jsx";
import IngredientReplacement from "./components/ingredientReplacement.jsx";
import Navbar from "./shared/navbar/navbar.jsx";
import Login from "./components/login.jsx";

// Basic test component to verify routing
const TestComponent = () => (
  <div style={{padding: "20px"}}>
    <h1>This is a test component</h1>
    <p>If you can see this, routing is working correctly.</p>
  </div>
);

function App() {
  console.log("App component rendering");
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/generate" element={<Generation />} /> {/* Added this route */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/replacement" element={<IngredientReplacement />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;