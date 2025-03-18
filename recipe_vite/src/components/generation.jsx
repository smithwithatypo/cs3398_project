import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Generate = () => {
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Generate recipe from pantry ingredients
  const generateRecipe = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/ai/generate-recipe');

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Generate a Recipe</h2>
        <p className="text-gray-700">
          Click "Generate Recipe" to get a meal suggestion based on your pantry!
        </p>
      </div>

      {/* Buttons: Generate Recipe & Edit Pantry */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6 flex gap-4">
        <button
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-1/2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={generateRecipe}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>

        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-1/2"
          onClick={() => navigate('/pantry')}
        >
          Edit Pantry
        </button>
      </div>

      {/* Recipe Display */}
      {recipe && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-4">Generated Recipe</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, '<br>') }} />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Generate;
