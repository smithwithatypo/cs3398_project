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
        const fetchedRecipes = [];

        for (let i = 0; i < 10; i++) {  // Fetch 10 random recipes --- a way to get around free version API
          const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
          if (response.data.meals && response.data.meals.length > 0) {
            const meal = response.data.meals[0];
            fetchedRecipes.push({
              id: meal.idMeal,
              name: meal.strMeal,
              description: meal.strInstructions.substring(0, 150) + '...',
              image: meal.strMealThumb,
              area: meal.strArea,        
              category: meal.strCategory
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