import { useState } from 'react';

const IngredientReplacement = () => {
  const [ingredient, setIngredient] = useState('');

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
          className="mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full"
          onClick={() => {}}
        >
          Find Replacements
        </button>
      </div>
    </div>
  );
};

export default IngredientReplacement;