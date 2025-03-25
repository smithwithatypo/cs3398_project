import { useState } from 'react';

const IngredientReplacement = () => {
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Ingredient Replacement</h2>
        <p className="text-[#1e2d3d]">
          Enter an ingredient to find allergy-friendly or preference-based alternatives.
        </p>
      </div>
    </div>
  );
};

export default IngredientReplacement;