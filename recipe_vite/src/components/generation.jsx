import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Generation = () => {
  const [pantryItems, setPantryItems] = useState([]); // Stores pantry ingredients
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch pantry items from the backend when the page loads
  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get('/api/ai/pantry'); // Get pantry items
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

  // Generate a recipe using the fetched pantry items
  const generateRecipe = async () => {
    if (pantryItems.length === 0) {
      setError('Your pantry is empty! Add ingredients first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/ai/generate-recipe', {
        ingredients: pantryItems, // Send pantry ingredients to backend
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

      {/* Recipe Display */}
      {recipe && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-4 text-[#1e2d3d]">Generated Recipe</h3>
          <div className="text-[#1e2d3d] font-medium" dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, '<br>') }} />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Generation;
