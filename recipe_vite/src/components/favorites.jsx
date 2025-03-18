import { useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-10">
      <div className="flex flex-col items-center gap-8">

        {/* Favorites Info Section */}
        <div className="bg-how-it-works-bg p-6 max-w-sm text-left rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Your Favorites</h2>
          <h4 className="text-lg font-semibold mb-2">How it works:</h4>
          <p className="text-base text-gray-800">
            Here are your saved favorite recipes! Remove them anytime if you change your mind.
          </p>
        </div>

        {/* Favorite Recipes List */}
        <div className="bg-recipe-card-bg p-5 w-80 rounded-lg shadow-md text-left">
          <h3 className="text-lg font-bold mb-4">Favorite Recipes</h3>

          <div className="bg-white p-3 rounded-md shadow">
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
    </div>
  );
};

export default Favorites;
