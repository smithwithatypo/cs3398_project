import { useNavigate } from "react-router-dom";
import curryImage from "./curry.jpg";
import quesadillaImage from "./quesadilla.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* How It Works Section */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">How It Works</h2>
        <p className="text-[#1e2d3d]">
          Welcome to Recipe Generator! Easily turn your ingredients into delicious meals 
          with just a few taps. Enter the ingredients you have, and we'll suggest recipes you can make. 
          Ready to start cooking? Search for a recipe or add your ingredients to begin!
        </p>
        <button
          className="mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md"
          onClick={() => navigate("/pantry")}
        >
          Start Here!
        </button>
      </div>

      {/* Recommended Recipes Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6 text-center">
        <h2 className="text-2xl font-bold text-[#1e2d3d]">Recommended Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Chicken Curry Card */}
          <div className="bg-[#d0ded5] shadow-md rounded-lg p-4 text-left">
            <p className="text-sm font-semibold text-right text-[#1e2d3d]">Macros: 20C 30F 40P</p>
            <h3 className="text-lg font-semibold text-[#1e2d3d]">Chicken Curry</h3>
            <img src={curryImage} alt="Chicken Curry" className="w-full h-auto rounded-md mt-2" />
            <p className="text-[#1e2d3d] mt-2">
              A rich and flavorful dish made with tender chicken, aromatic spices, 
              and a creamy curry sauce. Perfect with rice or naan.
            </p>
          </div>

          {/* Quesadillas Card */}
          <div className="bg-[#d0ded5] shadow-md rounded-lg p-4 text-left">
            <p className="text-sm font-semibold text-right text-[#1e2d3d]">Macros: 20C 30F 40P</p>
            <h3 className="text-lg font-semibold text-[#1e2d3d]">Quesadillas</h3>
            <img src={quesadillaImage} alt="Quesadillas" className="w-full h-auto rounded-md mt-2" />
            <p className="text-[#1e2d3d] mt-2">
              A crispy tortilla filled with melted cheese, black beans, and fresh veggies. 
              Great as a snack or a quick meal!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;