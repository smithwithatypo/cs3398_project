import { useState } from 'react';
import axios from 'axios';

const Cookbook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('name'); // 'name' or 'ingredients'

  // Function to search recipes by name
  const searchByName = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a recipe name to search.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // This is a placeholder for the actual API call
      // We'll implement this later
      // const response = await axios.get(`/api/ai/recipes/search?name=${searchTerm}`);
      
      // For now, just mock some data
      setTimeout(() => {
        setSearchResults([
          { id: 1, name: `${searchTerm} Recipe`, description: 'A delicious recipe that matches your search.' },
          { id: 2, name: `Easy ${searchTerm}`, description: 'A simple version that you can make quickly.' },
          { id: 3, name: `Gourmet ${searchTerm}`, description: 'A fancy version for special occasions.' }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError('Something went wrong while searching for recipes.');
      setLoading(false);
    }
  };

  // Function to search recipes by ingredients
  const searchByIngredients = async () => {
    if (!ingredientSearch.trim()) {
      setError('Please enter ingredients to search with.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // This is a placeholder for the actual API call
      // We'll implement this later
      // const response = await axios.post(`/api/ai/recipes/search-by-ingredients`, {
      //   ingredients: ingredientSearch.split(',').map(item => item.trim())
      // });
      
      // For now, just mock some data
      setTimeout(() => {
        const ingredients = ingredientSearch.split(',').map(item => item.trim());
        setSearchResults([
          { 
            id: 1, 
            name: `${ingredients[0]} Delight`, 
            description: `A tasty dish featuring ${ingredients.join(' and ')}.` 
          },
          { 
            id: 2, 
            name: `Quick ${ingredients[0]} Recipe`, 
            description: `A simple recipe using ${ingredients.join(', ')}.` 
          },
          { 
            id: 3, 
            name: `${ingredients[0]} Surprise`, 
            description: `An innovative dish combining ${ingredients.join(' with ')}.` 
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error);
      setError('Something went wrong while searching for recipes.');
      setLoading(false);
    }
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
                <h4 className="text-lg font-semibold text-[#1e2d3d]">{recipe.name}</h4>
                <p className="text-[#1e2d3d] mt-2">{recipe.description}</p>
                <button
                  className="mt-3 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-1 px-4 rounded-md"
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Cookbook;