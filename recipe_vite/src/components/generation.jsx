import { useState, useEffect } from "react";
import axios from "axios";

const TextGeneration = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [extraIngredient, setExtraIngredient] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch pantry items on load
  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get("/api/ai/pantry");
      if (response.data.success) {
        setPantryItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching pantry items:", error);
      setError("Failed to fetch pantry items.");
    }
  };

  // Add an extra ingredient manually
  const addExtraIngredient = (e) => {
    e.preventDefault();
    if (!extraIngredient.trim()) return;
    setPantryItems([...pantryItems, extraIngredient]);
    setExtraIngredient(""); // Clear input
  };

  // Remove an ingredient from the list
  const removeIngredient = (index) => {
    setPantryItems(pantryItems.filter((_, i) => i !== index));
  };

  // Generate Recipe based on pantry and extra ingredients
  const generateRecipe = async () => {
    if (pantryItems.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/ai/generate-recipe", {
        ingredients: pantryItems,
      });

      if (response.data.success) {
        setRecipe(response.data.data);
      } else {
        setError("Failed to generate recipe.");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Generate a Recipe</h2>
        <p className="text-gray-700">
          We'll use your pantry ingredients + any extra ones you enter to generate a recipe!
        </p>
      </div>

      {/* Pantry Ingredients Display */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Pantry Ingredients:</h3>
        {pantryItems.length === 0 ? (
          <p className="text-gray-500">No ingredients added yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-700">
            {pantryItems.map((item, index) => (
              <li key={index} className="flex justify-between">
                {item}
                <button
                  className="text-red-500 hover:text-red-700 text-xs"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Extra Ingredients */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <form onSubmit={addExtraIngredient} className="flex gap-2">
          <input
            type="text"
            placeholder="Add extra ingredient..."
            value={extraIngredient}
            onChange={(e) => setExtraIngredient(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add
          </button>
        </form>
      </div>

      {/* Generate Recipe Button */}
      <button
        className={`bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
        }`}
        onClick={generateRecipe}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {/* Recipe Results */}
      <div className="mt-8 w-full max-w-2xl">
        {error && <p className="text-red-500">{error}</p>}
        {recipe ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Generated Recipe</h3>
            <div dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, "<br>") }} />
          </div>
        ) : (
          <h3 className="text-xl font-semibold mb-4 text-gray-500">
            Recipes will appear here...
          </h3>
        )}
      </div>
    </div>
  );
};

export default TextGeneration;
