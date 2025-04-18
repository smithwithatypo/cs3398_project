import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8 fade-in">
      {/* How It Works */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">How It Works</h2>
        <p className="text-[#1e2d3d]">
          Welcome to Recipe Generator! Easily turn your ingredients into delicious meals 
          with just a few taps. Enter the ingredients you have, and we'll suggest recipes you can make.
        </p>
        <button
          className="mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md"
          onClick={() => navigate("/pantry")}
        >
          Start Here!
        </button>
      </div>

      {/* Recommended Recipes */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6 text-center fade-in hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#1e2d3d]">Recommended Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {randomRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-[#d0ded5] shadow-md rounded-lg p-4 text-left">
              <p className="text-sm font-semibold text-right text-[#1e2d3d]">From MealDB</p>
              <h3 className="text-lg font-semibold text-[#1e2d3d]">{recipe.name}</h3>
              <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-md mt-2" />
              <p className="text-[#1e2d3d] mt-2">{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;