import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import the CSS file for styling

// Import local images
import curryImage from "./curry.jpg";
import quesadillaImage from "./quesadilla.jpg";

const Home = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="home-container">
      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>How it works:</h2>
        <p>
          Welcome to Recipe Generator! Easily turn your ingredients into delicious meals 
          with just a few taps. Enter the ingredients you have, and we’ll suggest recipes you can make. 
          Ready to start cooking? Search for a recipe or add your ingredients to begin!
        </p>
        <button className="start-button" onClick={() => navigate("/pantry")}>
          Start Here!
        </button>
      </section>

      {/* Recommended Recipes Section */}
      <section className="recommended-recipes">
        <h2>Recommended Recipes</h2>
        <div className="recipes-container">
          {/* Chicken Curry Card */}
          <div className="recipe-card">
            <p className="macros">Macros: 20C 30F 40P</p>
            <h3 className="recipe-title">Chicken Curry</h3>
            <img src={curryImage} alt="Chicken Curry" className="recipe-image" />
            <p className="recipe-description">
              A rich and flavorful dish made with tender chicken, aromatic spices, 
              and a creamy curry sauce. Perfect with rice or naan.
            </p>
          </div>

          {/* Quesadillas Card */}
          <div className="recipe-card">
            <p className="macros">Macros: 20C 30F 40P</p>
            <h3 className="recipe-title">Quesadillas</h3>
            <img src={quesadillaImage} alt="Quesadillas" className="recipe-image" />
            <p className="recipe-description">
              A crispy tortilla filled with melted cheese, black beans, and fresh veggies. 
              Great as a snack or a quick meal!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
