import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <h1>Recipe Generator</h1>
      </header>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>How it works:</h2>
        <p>
        Welcome to Recipe Generator! Easily turn your ingredients into delicious meals with just a few taps. Enter the ingredients you have, and we’ll suggest recipes you can make. Ready to start cooking? Search for a recipe or add your ingredients to begin!
        </p>
        <button className="start-button" onClick={() => navigate("/pantry")}>
          Start Here!
        </button>
      </section>
    </div>
  );
};

export default Home;
