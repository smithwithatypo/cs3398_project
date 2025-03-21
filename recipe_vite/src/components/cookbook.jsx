import { useState } from 'react';
import axios from 'axios';

const Cookbook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('name'); // 'name' or 'ingredients'
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to search recipes by name (using TheMealDB)
  const searchByName = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a recipe name to search.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('/api/ai/search-recipes', {
        query: searchTerm
      });
      
      if (response.data.success) {
        setSearchResults(response.data.data);
      } else {
        setError('No recipes found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(error.response?.data?.error || 'No recipes found. Try another search term.');
    }
    setLoading(false);
  };

  // Function to search recipes by ingredients (still using Spoonacular)
  const searchByIngredients = async () => {
    if (!ingredientSearch.trim()) {
      setError('Please enter ingredients to search with.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const ingredients = ingredientSearch.split(',').map(item => item.trim());
      const response = await axios.post('/api/ai/search-recipes', {
        ingredients
      });
  
      if (response.data.success) {
        setSearchResults(response.data.data);
      } else {
        setError('No matching recipes found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(error.response?.data?.error || 'Search failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Cookbook</h2>
        <p className="text-[#1e2d3d]">
          Find your favorite recipes by name or ingredients.
        </p>
      </div>

      {/* Search Tabs */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <div className="flex mb-4">
          <button
            className={`py-2 px-4 font-bold rounded-tl-md rounded-bl-md w-1/2 ${
              activeTab === 'name'
                ? 'bg-[#1e2d3d] text-white'
                : 'bg-gray-200 text-[#1e2d3d]'
            }`}
            onClick={() => setActiveTab('name')}
          >
            Search by Name
          </button>
          <button
            className={`py-2 px-4 font-bold rounded-tr-md rounded-br-md w-1/2 ${
              activeTab === 'ingredients'
                ? 'bg-[#1e2d3d] text-white'
                : 'bg-gray-200 text-[#1e2d3d]'
            }`}
            onClick={() => setActiveTab('ingredients')}
          >
            Search by Ingredients
          </button>
        </div>

        {/* Search by Name */}
        {activeTab === 'name' && (
          <div className="mt-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter recipe name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={`mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={searchByName}
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? 'Searching...' : 'Search Recipes'}
            </button>
          </div>
        )}

        {/* Search by Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="mt-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Enter ingredients separated by commas..."
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
            ></textarea>
            <button
              className={`mt-4 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={searchByIngredients}
              disabled={loading || !ingredientSearch.trim()}
            >
              {loading ? 'Searching...' : 'Find Recipes'}
            </button>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1e2d3d]">Search Results</h3>
          <div className="space-y-4">
            {searchResults.map((recipe) => (
              <div key={recipe.id} className="bg-[#d0ded5] p-4 rounded-lg">
                <div className="flex flex-col md:flex-row">
                  {recipe.image && (
                    <div className="md:w-1/3 mb-3 md:mb-0 md:mr-4">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="w-full rounded-md"
                      />
                    </div>
                  )}
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold text-[#1e2d3d]">{recipe.name}</h4>
                    {recipe.area && recipe.category && (
                      <p className="text-sm text-[#5a7d8c] mt-1">
                        {recipe.area} • {recipe.category}
                      </p>
                    )}
                    <p className="text-[#1e2d3d] mt-2 text-sm">{recipe.description}</p>
                    <button
                      className="mt-3 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-1 px-4 rounded-md"
                      onClick = {() => setSelectedRecipe(recipe)}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal for View Recipe */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full max-h-[80vh] overflow-auto relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold"
              onClick={() => setSelectedRecipe(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Cookbook;