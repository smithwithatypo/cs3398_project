import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [randomRecipes, setRandomRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

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
      console.log("Uploading image...");
      const response = await axios.post("/api/ai/identify-dish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Upload response received:", response.data.success);
      
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
      console.error("Error uploading image:", error);
      setUploadError("Something went wrong. Please try again.");
    }

    setIsUploading(false);
  };

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const fetchedRecipes = [];

        for (let i = 0; i < 5; i++) {  // Fetch 5 random recipes --- a way to get around free version API
          const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
          if (response.data.meals && response.data.meals.length > 0) {
            const meal = response.data.meals[0];
            fetchedRecipes.push({
              id: meal.idMeal,
              name: meal.strMeal,
              description: meal.strInstructions.substring(0, 150) + '...',
              image: meal.strMealThumb,
            });
          }
        }

        setRandomRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    };

    fetchRandomRecipes();
  }, []);

  useEffect(() => {
    if (randomRecipes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % randomRecipes.length);
    }, 5000); // change recipe every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [randomRecipes]);

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

      {/* Photo Upload Section */}
      <div className="bg-[#d0ded5] shadow-md rounded-lg p-6 w-full max-w-lg mt-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">See a Dish You Like?</h2>
        <p className="text-[#1e2d3d] mb-4">
          Take a photo of any dish and we'll identify it and generate a recipe for you!
        </p>
        <div className="flex flex-col items-center">
          <label className="flex flex-col items-center px-4 py-2 bg-white text-[#1e2d3d] rounded-lg shadow-md tracking-wide border border-[#1e2d3d] cursor-pointer hover:bg-gray-100">
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
                  className={`bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
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
      </div>
    {/* Recommended Recipes Carousel */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6 text-center">
        <h2 className="text-2xl font-bold text-[#1e2d3d] mb-6">Recommended Recipes</h2>

        {randomRecipes.length > 0 && (
          <div
            key={randomRecipes[currentRecipeIndex].id}
            className="bg-[#d0ded5] shadow-md rounded-lg p-6 text-center transition-opacity duration-700 ease-in-out opacity-100"
          >
            <h3 className="text-xl font-semibold text-[#1e2d3d] mt-2">{randomRecipes[currentRecipeIndex].name}</h3>
            <img
              src={randomRecipes[currentRecipeIndex].image}
              alt={randomRecipes[currentRecipeIndex].name}
              className="w-full max-w-md mx-auto h-auto rounded-md mt-4"
            />
            <p className="text-[#1e2d3d] mt-4">{randomRecipes[currentRecipeIndex].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;