import React from "react";
import { useNavigate } from "react-router-dom";

// Import local images
import curryImage from "./curry.jpg";
import quesadillaImage from "./quesadilla.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans px-6 py-12">
      
      {/* How it Works Section */}
      <section className="bg-how-it-works-bg p-5 max-w-xl mx-auto text-left rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">How it works:</h2>
        <p className="text-base leading-6 text-gray-800 mb-6">
          Welcome to Recipe Generator! Easily turn your ingredients into delicious meals
          with just a few taps. Enter the ingredients you have, and we’ll suggest recipes
          you can make. Ready to start cooking? Search for a recipe or add your ingredients
          to begin!
        </p>
        <button
          onClick={() => navigate("/pantry")}
          className="bg-button-bg hover:bg-button-hover text-white text-base py-2 px-5 rounded-md block mx-auto mt-5"
        >
          Start Here!
        </button>
      </section>

      {/* Recommended Recipes Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Recommended Recipes</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">

          {/* Chicken Curry Card */}
          <div className="bg-recipe-card-bg p-4 rounded-lg w-64 text-left shadow-md">
            <p className="text-xs font-bold text-right mb-1">Macros: 20C 30F 40P</p>
            <h3 className="text-lg font-bold mb-3">Chicken Curry</h3>
            <img
              src={curryImage}
              alt="Chicken Curry"
              className="w-full h-auto rounded-md mb-3"
            />
            <p className="text-sm text-gray-800">
              A rich and flavorful dish made with tender chicken, aromatic spices,
              and a creamy curry sauce. Perfect with rice or naan.
            </p>
          </div>

          {/* Quesadillas Card */}
          <div className="bg-recipe-card-bg p-4 rounded-lg w-64 text-left shadow-md">
            <p className="text-xs font-bold text-right mb-1">Macros: 20C 30F 40P</p>
            <h3 className="text-lg font-bold mb-3">Quesadillas</h3>
            <img
              src={quesadillaImage}
              alt="Quesadillas"
              className="w-full h-auto rounded-md mb-3"
            />
            <p className="text-sm text-gray-800">
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
