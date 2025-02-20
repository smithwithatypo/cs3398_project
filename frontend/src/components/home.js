import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="how-it-works">
        <h2>How it works:</h2>
        <p>
        Easily turn your ingredients into delicious meals with just a few taps. Enter the ingredients you have, and we’ll suggest recipes you can make. Ready to start cooking? Search for a recipe or add your ingredients to begin! 
        </p>
        <button className="start-button">Start Here!</button>
      </div>
    </div>
  );
};

export default Home;
