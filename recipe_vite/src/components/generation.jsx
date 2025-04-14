import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Generation = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [textPrompt, setTextPrompt] = useState(''); // New state for text input
  const [showTextInput, setShowTextInput] = useState(false); // Toggle for text input visibility
  const navigate = useNavigate();
  const location = useLocation();
  const [origin, setOrigin] = useState('');
  const [dishType, setDishType] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('');
  const [viewMode, setViewMode] = useState('full'); // 'full' or 'step'
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchPantryItems();
    checkImageRecipe();
  }, [location.search]);

  // Fetch pantry items from the backend
  const fetchPantryItems = async () => {
    try {
      const response = await axios.get('/api/ai/pantry');
      if (response.data.success) {
        setPantryItems(response.data.data);
      } else {
        setError('Failed to fetch pantry items.');
      }
    } catch (error) {
      console.error('Error fetching pantry items:', error);
      setError('Something went wrong while fetching pantry items.');
    }
  };

  // Check if there's image-based recipe data in localStorage
  const checkImageRecipe = () => {
    if (location.search.includes('source=image')) {
      const imageData = localStorage.getItem('imageRecipeData');
      if (imageData) {
        setRecipe(imageData);
      }
    }
  };

  // Generate recipe using pantry items
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
        setRecipe(response.data.data);
      } else {
        setError('Failed to generate recipe.');
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
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
        textPrompt: textPrompt, origin, dishType, spiceLevel,
      });

      if (response.data.success) {
        setRecipe(response.data.data);
      } else {
        setError('Failed to generate recipe.');
      }
    } catch (error) {
      console.error('Error generating recipe from text:', error);
      setError('Something went wrong.');
    }

    setLoading(false);
  };

  const StepView = ({ recipe, currentStep, setCurrentStep }) => {
    const stepMatches = recipe.match(/\d+\.\s.+/g); // extract lines like "1. Do this"
    const steps = stepMatches || ['No steps found.'];
  
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
  
    return (
      <div className="text-[#1e2d3d] p-4 bg-[#f0f4f2] rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Step-by-Step Instructions</h2>
        <p className="text-lg">{steps[currentStep]}</p>
  
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
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
  
        <div className="text-sm text-gray-600 mt-4 italic">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Generate a Recipe</h2>
        <p className="text-[#1e2d3d]">
          Click "Generate Recipe" to get a meal suggestion based on your pantry.
        </p>
      </div>

      {/* Pantry Items Display */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6 text-center">
        <h3 className="text-lg font-semibold text-[#1e2d3d]">Your Pantry:</h3>
        {pantryItems.length === 0 ? (
          <p className="text-gray-500">No ingredients in pantry.</p>
        ) : (
          <p className="text-[#1e2d3d] font-medium">{pantryItems.join(', ')}</p>
        )}
      </div>

      {/* Buttons: Generate Recipe & Edit Pantry */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6 flex gap-4">
        <button
          className={`bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-1/2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={generateRecipe}
          disabled={loading || pantryItems.length === 0}
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>

        <button
          className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-1/2"
          onClick={() => navigate('/pantry')}
        >
          Edit Pantry
        </button>
      </div>

      {/* Text-to-Recipe Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
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
          placeholder="Spice Level (e.g., None, mild, hot"
          value={spiceLevel}
          onChange={(e) => setSpiceLevel(e.target.value)}
        />
      </div>

      <div className="bg-[#d0ded5] shadow-md rounded-lg p-6 w-full max-w-lg mt-6 text-center">
        <h3 className="text-lg font-semibold text-[#1e2d3d]">
          Short on time? Pantry outdated?
        </h3>
        
        <button
          className="mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md"
          onClick={() => setShowTextInput(!showTextInput)}
        >
          {showTextInput ? 'Hide Text Input' : 'Text to Recipe'}
        </button>
        
        {showTextInput && (
          <div className="mt-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Describe what you want to cook or list ingredients you have..."
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
            ></textarea>
            
            <button
              className={`mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={generateRecipeFromText}
              disabled={loading || !textPrompt.trim()}
            >
              {loading ? 'Generating...' : 'Generate From Text'}
            </button>
          </div>
        )}
      </div>

      {/* Recipe Display */}
      {recipe && (
        <>
        <div className="mt-6 w-full max-w-lg">
          <label className="block mb-2 text-[#1e2d3d] font-medium">Choose Display Mode:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={viewMode}
            onChange={(e) => {
              setViewMode(e.target.value);
              setCurrentStep(0); // Reset step view if switching
            }}
          >
            <option value="full">Full Styled Recipe</option>
            <option value="step">Step-by-Step Instructions</option>
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
          {viewMode === 'full' ? (
            <>
              <div
                className="text-[#1e2d3d] font-medium p-4 bg-[#d0ded5] rounded-lg shadow-md max-w-3xl mx-auto my-4"
                dangerouslySetInnerHTML={{
                  __html: recipe
                    .replace(/(\d+\.)(\s+)/g, '<br>$1 ')
                    .replace(/^####\s*(.+)$/gm, '<strong>$1</strong><br>')
                    .replace(/^###\s*(.+)$/gm, '## $1 ')
                    .replace(/\n{2,}/g, '\n')
                    .replace(/\*\*(.+?)\*\*/g, '$1')
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-extrabold text-center mb-1 text-[#1e2d3d]">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold bg-[#1e2d3d] text-white py-1 px-3 rounded-md mt-2">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold bg-[#8aa29e] text-white py-1 px-2 rounded-md">$1</h3>')
                    .replace(/[-] (.+)$/gm, '<li class="list-disc ml-6 text-[#1e2d3d]">$1</li>')
                    .replace(/\n<li class="list-disc ml-6 text-[#1e2d3d]">/g, '<li class="list-disc ml-6 text-[#1e2d3d]">')
                }}
              />
              <div className="text-sm text-gray-600 mt-2 text-center italic">
                Preferences used: Origin - {origin || 'Any'}, Dish Type - {dishType || 'Any'}, Spice Level - {spiceLevel || 'Any'}
              </div>
            </>
          ) : (
            <StepView recipe={recipe} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          )}
        </div>
      </>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
  );
};

export default Generation;
