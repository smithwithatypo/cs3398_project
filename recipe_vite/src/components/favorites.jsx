import { useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); 

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-10">
      <h2 className="text-xl font-bold">Your Favorite Recipes</h2>

      <div className="bg-white p-5 w-80 rounded-lg shadow-md text-left mt-4">
        <h3 className="text-lg font-bold mb-4">Favorite Recipes</h3>

        {/* Favorites List */}
        <div>
          {favorites.length === 0 ? (
            <p className="text-gray-600">No favorite recipes yet.</p>
          ) : (
            favorites.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-300"
              >
                <span className="text-sm">{recipe}</span>
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
