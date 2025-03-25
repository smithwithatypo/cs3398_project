import { useState } from 'react';

const IngredientReplacement = () => {
  const [ingredient, setIngredient] = useState('');
  const [replacementResults, setReplacementResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findReplacements = async () => {
    if (!ingredient.trim()) {
      setError('Please enter an ingredient.');
      return;
    }

    setLoading(true);
    setError('');
    setReplacementResults([]);

    // Simulated delay / placeholder response
    setTimeout(() => {
      setLoading(false);
      setReplacementResults([
        'Almond milk',
        'Oat milk',
        'Soy milk',
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Ingredient Replacement</h2>
        <p className="text-[#1e2d3d]">
          Enter an ingredient to find allergy-friendly or preference-based alternatives.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="e.g. milk, eggs, peanuts..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button
          className={`mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={findReplacements}
          disabled={loading || !ingredient.trim()}
        >
          {loading ? 'Searching...' : 'Find Replacements'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default IngredientReplacement;