import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './generation.css';

const Generation = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [textPrompt, setTextPrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [origin, setOrigin] = useState('');
  const [dishType, setDishType] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('');
  const [viewMode, setViewMode] = useState('full');
  const [currentStep, setCurrentStep] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('pantry'); // 'pantry', 'text', or 'photo'
  const navigate = useNavigate();
  const location = useLocation();
  const [recipeImage, setRecipeImage] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  useEffect(() => {
    fetchPantryItems();
    checkImageRecipe();
  }, [location.search]);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get('/api/ai/pantry');
      if (response.data.success) {
        setPantryItems(response.data.data);
      } else {
        setError('Failed to fetch pantry items.');
      }
    } catch {
      setError('Something went wrong while fetching pantry items.');
    }
  };

  const checkImageRecipe = () => {
    if (location.search.includes('source=image')) {
      const imageData = localStorage.getItem('imageRecipeData');
      const imageFileURL = localStorage.getItem('uploadedImageUrl');
      if (imageData) {
        setRecipe(imageData);
        if (imageFileURL) {
          setRecipeImage(imageFileURL);
        }
      }
    }
  };

  const generateRecipe = async () => {
    if (pantryItems.length === 0) {
      setError('Your pantry is empty! Add ingredients first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/ai/generate-recipe', {
        ingredients: pantryItems, origin, dishType, spiceLevel,
      });
      if (response.data.success) {
        localStorage.removeItem('stepCheckState');
        localStorage.removeItem('uploadedImageUrl');
        setIsFavorited(false);
        setRecipe(response.data.data.recipeText);
        setRecipeImage(response.data.data.recipeImage);
      } else {
        setError('Failed to generate recipe.');
      }
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  // Generate recipe from text prompt
  const generateRecipeFromText = async () => {
    if (!textPrompt.trim()) {
      setError('Please enter a description or ingredients.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/ai/generate-recipe-text', {
        textPrompt, origin, dishType, spiceLevel,
      });
      if (response.data.success) {
        localStorage.removeItem('stepCheckState');
        localStorage.removeItem('uploadedImageUrl');
        setIsFavorited(false);
        setRecipe(response.data.data.recipeText);
        setRecipeImage(response.data.data.recipeImage);
      } else {
        setError('Failed to generate recipe.');
      }
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  // Handle file change for photo upload
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadError("");
  };

  // Handle dish identification from photo
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
        const imageUrl = URL.createObjectURL(selectedFile);
        localStorage.setItem("uploadedImageUrl", imageUrl);
        console.log("Recipe and uploadedImageUrl saved to localStorage.");
        setRecipe(response.data.data);
        setRecipeImage(imageUrl);
      } else {
        setUploadError("Failed to identify dish");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Something went wrong. Please try again.");
    }

    setIsUploading(false);
  };

  const toggleFavorite = () => {
    if (!recipe) return;
    if (isFavorited) {
      const updated = favorites.filter(r => r !== recipe);
      setFavorites(updated);
      setIsFavorited(false);
    } else {
      setFavorites([...favorites, recipe]);
      setIsFavorited(true);
    }
  };

  const StepView = ({ recipe, currentStep, setCurrentStep, recipeImage }) => {
    const titleMatch = recipe.match(/^#\s(.+)/m);
    const recipeTitle = titleMatch ? titleMatch[1].trim() : 'Generated Recipe';
    const stepBlocks = recipe.match(/\d+\.\s[\s\S]*?(?=\n\d+\.|$)/g) || [];
    const steps = stepBlocks.map(block => {
      const lines = block.split(/\n/);
      const main = lines[0].trim().replace(/\*\*(.*?)\*\*/g, '$1');
      const bullets = lines.slice(1)
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(bullet => bullet.slice(1).trim().replace(/\*\*(.*?)\*\*/g, '$1'));
      return { main, bullets };
    });

    const [checkedItems, setCheckedItems] = useState(() => {
      const saved = localStorage.getItem('stepCheckState');
      return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
      const saved = localStorage.getItem('stepCheckState');
      setCheckedItems(saved ? JSON.parse(saved) : {});
    }, [recipe]);
    
    const handleCheckboxChange = (stepIndex, bulletIndex) => {
      const key = `${stepIndex}-${bulletIndex}`;
      setCheckedItems(prev => {
        const updated = { ...prev, [key]: !prev[key] };
        localStorage.setItem('stepCheckState', JSON.stringify(updated));
        return updated;
      });
    };

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };
    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const step = steps[currentStep] || { main: 'No step found.', bullets: [] };
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
      <div className="text-[#1e2d3d] p-4 bg-[#d0ded5] rounded-lg shadow-md text-center fade-in">
        <h2 className="text-2xl font-bold mb-1">{recipeTitle}</h2>
        {recipeImage && (
          <img
            src={recipeImage}
            alt="Recipe Dish"
            className="rounded-lg shadow-md mx-auto my-6"
            style={{ maxWidth: '400px' }}
          />
        )}
        <div className="text-left mb-4">
          <p className="mb-2 whitespace-pre-line">{step.main}</p>
          {step.bullets.length > 0 && (
            <ul className="ml-2">
              {step.bullets.map((item, idx) => {
                const key = `${currentStep}-${idx}`;
                return (
                  <li key={idx} className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      checked={checkedItems[key] || false}
                      onChange={() => handleCheckboxChange(currentStep, idx)}
                      className="accent-[#1e2d3d]"
                    />
                    <span className={checkedItems[key] ? 'line-through text-gray-500' : ''}>{item}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-[#1e2d3d] text-white py-2 px-4 rounded-md disabled:opacity-40"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            className="bg-[#1e2d3d] text-white py-2 px-4 rounded-md disabled:opacity-40"
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
          >
            Next
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-6">
          <div className="bg-[#1e2d3d] h-3 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-sm text-gray-600 mt-2 italic">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="text-[9px] text-gray-400 mt-1">
          inspired by Jackson Beroux
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8 fade-in">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Generate a Recipe</h2>
        <p className="text-[#1e2d3d]">
          Choose your preferred method to generate a delicious recipe below.
        </p>
      </div>

      {/* Recipe Preferences */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-[#1e2d3d] mb-2">Recipe Preferences</h3>
        <input
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          placeholder="Origin (e.g., Italian, Thai)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          placeholder="Dish Type (e.g., Appetizer, Dessert)"
          value={dishType}
          onChange={(e) => setDishType(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Spice Level (e.g., None, mild, hot)"
          value={spiceLevel}
          onChange={(e) => setSpiceLevel(e.target.value)}
        />
      </div>

      {/* Generation Methods Tabs */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 font-medium ${
              activeTab === 'pantry'
                ? 'text-[#1e2d3d] border-b-2 border-[#1e2d3d]'
                : 'text-gray-500 hover:text-[#1e2d3d]'
            }`}
            onClick={() => setActiveTab('pantry')}
          >
            From Pantry
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium ${
              activeTab === 'text'
                ? 'text-[#1e2d3d] border-b-2 border-[#1e2d3d]'
                : 'text-gray-500 hover:text-[#1e2d3d]'
            }`}
            onClick={() => setActiveTab('text')}
          >
            From Text
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium ${
              activeTab === 'photo'
                ? 'text-[#1e2d3d] border-b-2 border-[#1e2d3d]'
                : 'text-gray-500 hover:text-[#1e2d3d]'
            }`}
            onClick={() => setActiveTab('photo')}
          >
            From Photo
          </button>
        </div>

        {/* Pantry Method */}
        {activeTab === 'pantry' && (
          <div className="mt-4 fade-in">
            <h3 className="text-lg font-semibold text-[#1e2d3d] mb-2">Your Pantry Items:</h3>
            {pantryItems.length === 0 ? (
              <p className="text-gray-500">No ingredients in pantry.</p>
            ) : (
              <p className="text-[#1e2d3d] font-medium mb-4">{pantryItems.join(', ')}</p>
            )}

            <div className="flex gap-4 mt-4">
              <button
                className={`bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-1/2 ${
                  loading && activeTab === 'pantry' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={generateRecipe}
                disabled={loading || pantryItems.length === 0}
              >
                {loading && activeTab === 'pantry' ? 'Generating...' : 'Generate Recipe'}
              </button>

              <button
                className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-1/2"
                onClick={() => navigate('/pantry')}
              >
                Edit Pantry
              </button>
            </div>
          </div>
        )}

        {/* Text Method */}
        {activeTab === 'text' && (
          <div className="mt-4 fade-in">
            <h3 className="text-lg font-semibold text-[#1e2d3d] mb-2">Generate from Text Description</h3>
            <p className="text-[#1e2d3d] mb-4">
              Describe what you want to cook or list ingredients you have available.
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
              placeholder="E.g., I want to make a quick pasta dish with tomatoes and basil..."
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
            ></textarea>

            <button
              className={`mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full ${
                loading && activeTab === 'text' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={generateRecipeFromText}
              disabled={loading || !textPrompt.trim()}
            >
              {loading && activeTab === 'text' ? 'Generating...' : 'Generate From Text'}
            </button>
          </div>
        )}

        {/* Photo Method */}
        {activeTab === 'photo' && (
          <div className="mt-4 fade-in">
            <h3 className="text-lg font-semibold text-[#1e2d3d] mb-2">Generate from Photo</h3>
            <p className="text-[#1e2d3d] mb-4">
              Upload a photo of a dish and we'll identify it and generate a recipe for you!
            </p>
            
            <div className="flex flex-col items-center">
              <label className="flex flex-col items-center px-4 py-2 bg-white text-[#1e2d3d] rounded-lg shadow-md tracking-wide border border-[#1e2d3d] cursor-pointer hover:bg-gray-100 w-full">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select a photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              
              {selectedFile && (
                <div className="mt-3 text-center w-full">
                  <p className="text-sm text-[#1e2d3d]">{selectedFile.name}</p>
                  <div className="mt-2 w-full">
                    <button
                      className={`bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
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
        )}
      </div>

      {/* Generated Recipe Display */}
      {recipe && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl fade-in hover:shadow-xl transition-shadow duration-300">
          {/* Toggle Switch for Mode Selection */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`text-${viewMode === 'full' ? '[#1e2d3d]' : 'gray-400'} font-medium`}>
              Full Instructions
            </span>
            <div 
              className="relative inline-block w-12 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer bg-gray-200"
              onClick={() => {
                setViewMode(viewMode === 'full' ? 'step' : 'full');
                setCurrentStep(0);
              }}
            >
              <div className={`absolute left-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out bg-white rounded-full shadow-md transform ${
                viewMode === 'step' ? 'translate-x-6' : ''
              }`}></div>
              <div className={`absolute inset-0 rounded-full ${
                viewMode === 'step' ? 'bg-[#1e2d3d]' : ''
              }`}></div>
            </div>
            <span className={`text-${viewMode === 'step' ? '[#1e2d3d]' : 'gray-400'} font-medium`}>
              Step-by-Step
            </span>
          </div>

          {/* Actual Recipe */}
          {viewMode === 'full' ? (
            <>
              <div
                className="text-[#1e2d3d] font-medium p-4 bg-[#d0ded5] rounded-lg shadow-md max-w-3xl mx-auto my-4"
                dangerouslySetInnerHTML={{
                  __html: recipe
                    .replace(/^# (.+)$/m, (match, p1) => {
                      return `
                        <h1 class="text-2xl font-extrabold text-center mb-4 text-[#1e2d3d]">${p1}</h1>
                        ${recipeImage ? `<img src="${recipeImage}" alt="Recipe Dish" class="rounded-lg shadow-md mx-auto mb-6" style="max-width: 400px;">` : ''}
                      `;
                    })
                    .replace(/(\d+\.)(\s+)/g, '<br>$1 ')
                    .replace(/^####\s*(.+)$/gm, '<strong>$1</strong><br>')
                    .replace(/^###\s*(.+)$/gm, '## $1 ')
                    .replace(/\n{2,}/g, '\n')
                    .replace(/\*\*(.+?)\*\*/g, '$1')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold bg-[#1e2d3d] text-white py-1 px-3 rounded-md mt-2">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold bg-[#8aa29e] text-white py-1 px-2 rounded-md">$1</h3>')
                    .replace(/[-] (.+)$/gm, '<li class="list-disc ml-6 text-[#1e2d3d]">$1</li>')
                    .replace(/\n<li class="list-disc ml-6 text-[#1e2d3d]">/g, '<li class="list-disc ml-6 text-[#1e2d3d]">')
                }}
              />
              {/* Preferences Info */}
              <div className="text-sm text-gray-600 mt-2 text-center italic">
                Preferences used: Origin - {origin || 'Any'}, Dish Type - {dishType || 'Any'}, Spice Level - {spiceLevel || 'Any'}
              </div>
              {/* Favorite Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-bold transition-all duration-300 transform ${isFavorited ? 'bg-red-800 hover:bg-red-900 scale-105' : 'bg-[#1e2d3d] hover:bg-[#16232e] scale-100'}`}
                >
                  {isFavorited ? '💔 Unfavorite' : '❤️ Favorite'}
                </button>
              </div>
            </>
          ) : (
            <StepView recipe={recipe} currentStep={currentStep} setCurrentStep={setCurrentStep} recipeImage={recipeImage}/>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Generation;