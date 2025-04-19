import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);  
  const [isUploading, setIsUploading] = useState(false);    
  const [uploadError, setUploadError] = useState(""); 

  const [randomRecipes, setRandomRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

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
        const requests = Array.from({ length: 10 }, () =>
          axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        );

        const responses = await Promise.all(requests); // fires all at once

        const fetchedRecipes = responses
          .map(res => res.data.meals?.[0])
          .filter(meal => meal)
          .map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            description: meal.strInstructions.substring(0, 150) + '...',
            image: meal.strMealThumb,
            area: meal.strArea,
            category: meal.strCategory
          }));

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
    }, 4000); // speed of images

    return () => clearInterval(interval);
  }, [randomRecipes]);

  const visibleRecipes = [
    randomRecipes[currentRecipeIndex % randomRecipes.length],
    randomRecipes[(currentRecipeIndex + 1) % randomRecipes.length],
    randomRecipes[(currentRecipeIndex + 2) % randomRecipes.length],
  ];

  const handleRecipeClick = (recipe) => {
    localStorage.setItem('selectedRecipeName', recipe.name); 
    navigate('/cookbook'); //routes to cookbook page
  };
  
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8 fade-in">
      {/* Welcome Box */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-2xl text-center hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold mb-4 text-[#1e2d3d]">Welcome to Recipe Generator!</h2>
        <p className="text-[#1e2d3d] mb-6 text-md">
          Pantry to plate. Photo to feast. Cookbook to Master Chef.
          Cook smarter, faster, and unleash your creativity — your next favorite dish is just a few clicks away!
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-6 rounded-md"
            onClick={() => navigate("/pantry")}
          >
            📦 Start with My Pantry
          </button>
          <button
            className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-6 rounded-md"
            onClick={() => navigate("/generation")}
          >
            📸 Upload a Photo
          </button>
          <button
            className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-6 rounded-md"
            onClick={() => navigate("/cookbook")}
          >
            📚 Browse Cookbook
          </button>
        </div>
      </div>
  
      {/* Carousel Section */}
      {randomRecipes.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mt-6 text-center fade-in">
          <h2 className="text-2xl font-bold text-[#1e2d3d] mb-6">Recommended Recipes</h2>

          {/* Carousel */}
          <div className="flex justify-center gap-6 transition-all duration-700 ease-in-out">
            {visibleRecipes.map((recipe) => (
              <div key={recipe?.id} className="bg-[#d0ded5] rounded-lg shadow-md p-4 w-72 transition-transform duration-500 transform hover:scale-105"
                onClick={() => handleRecipeClick(recipe)} 
              >
                <img
                  src={recipe?.image}
                  alt={recipe?.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold text-[#1e2d3d] mt-4">{recipe?.name}</h3>
                {recipe?.area && recipe?.category && (
                  <p className="text-sm text-[#5a7d8c] mt-1">
                    {recipe.area} • {recipe.category}
                  </p>
                )}
                <p className="text-sm text-[#1e2d3d] mt-2">{recipe?.description}</p>
              </div>
            ))}
          </div>
        </div>
)}
    </div>
  );
};

export default Home;