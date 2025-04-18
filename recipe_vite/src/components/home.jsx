
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import curryImage from "./curry.jpg";
import quesadillaImage from "./quesadilla.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select an image first");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("/api/ai/identify-dish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        localStorage.setItem("imageRecipeData", response.data.data);
        const imageUrl = URL.createObjectURL(selectedFile);  // 👈 NEW
        localStorage.setItem("uploadedImageUrl", imageUrl);  // 👈 NEW
        console.log("Recipe and uploadedImageUrl saved to localStorage.");
        navigate("/generation?source=image");
      } else {
        setUploadError("Failed to identify dish");
      }
    } catch (error) {
      setUploadError("Something went wrong. Please try again.");
    }

    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8 animate-fade-in">
      <div className="bg-how-it-works-bg shadow-md rounded-lg p-6 w-full max-w-lg text-center animate-slide-up delay-100">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">How It Works</h2>
        <p className="text-[#1e2d3d]">
          Welcome to Recipe Generator! Enter ingredients and get recipes instantly.
        </p>
        <button
          className="mt-4 bg-button-bg hover:bg-button-hover text-white font-bold py-2 px-4 rounded-md"
          onClick={() => navigate("/pantry")}
        >
          Start Here!
        </button>
      </div>

      <div className="bg-recipe-card-bg shadow-md rounded-lg p-6 w-full max-w-lg mt-6 text-center animate-slide-up delay-300">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">See a Dish You Like?</h2>
        <p className="text-[#1e2d3d] mb-4">
          Take a photo of a dish, and we’ll generate a recipe for you!
        </p>
        <label className="flex flex-col items-center px-4 py-2 bg-white text-[#1e2d3d] rounded-lg shadow-md tracking-wide border border-[#1e2d3d] cursor-pointer hover:bg-gray-100">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a photo</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>

        {selectedFile && (
          <div className="mt-3 text-center">
            <p className="text-sm text-[#1e2d3d]">{selectedFile.name}</p>
            <div className="mt-2">
              <button
                className={`bg-button-bg hover:bg-button-hover text-white font-bold py-2 px-4 rounded-md ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Processing..." : "Upload & Generate Recipe"}
              </button>
            </div>
          </div>
        )}
        {uploadError && <p className="mt-2 text-red-500">{uploadError}</p>}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6 text-center animate-slide-up delay-500">
        <h2 className="text-2xl font-bold text-[#1e2d3d]">Recommended Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-recipe-card-bg shadow-md rounded-lg p-4 text-left">
            <p className="text-sm font-semibold text-right text-[#1e2d3d]">Macros: 20C 30F 40P</p>
            <h3 className="text-lg font-semibold text-[#1e2d3d]">Chicken Curry</h3>
            <img src={curryImage} alt="Chicken Curry" className="w-full h-auto rounded-md mt-2" />
            <p className="text-[#1e2d3d] mt-2">
              A flavorful dish made with chicken, spices, and creamy curry sauce.
            </p>
          </div>
          <div className="bg-recipe-card-bg shadow-md rounded-lg p-4 text-left">
            <p className="text-sm font-semibold text-right text-[#1e2d3d]">Macros: 20C 30F 40P</p>
            <h3 className="text-lg font-semibold text-[#1e2d3d]">Quesadillas</h3>
            <img src={quesadillaImage} alt="Quesadillas" className="w-full h-auto rounded-md mt-2" />
            <p className="text-[#1e2d3d] mt-2">
              A crispy tortilla filled with melted cheese and veggies. Great for snacking!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
