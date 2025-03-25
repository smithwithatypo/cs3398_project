import { useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Your Favorites</h2>
        <p className="text-[#1e2d3d]">
          Here you can view your saved favorite recipes and remove any you no longer want to keep!
        </p>
      </div>

      {/* Favorite Recipes List */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <h3 className="text-xl font-semibold mb-4 text-[#1e2d3d]">Favorite Recipes</h3>

        <div className="bg-[#d0ded5] p-4 rounded-md">
          {favorites.length === 0 ? (
            <p className="text-gray-700">No favorite recipes yet.</p>
          ) : (
            favorites.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-300"
              >
                <span className="text-sm text-[#1e2d3d]">{recipe}</span>
                <button
                  onClick={() => removeFavorite(index)}
                  className="bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;