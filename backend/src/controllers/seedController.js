// controllers/seedController.js
import Ingredient from "../../database/models/Ingredient.js";
import Recipe from "../../database/models/Recipe.js";
import User from "../../database/models/User.js";

export const seedDatabase = async (req, res) => {
  try {
    // Expect the frontend to send an array of objects or an object with different arrays.
    // For instance, if your JSON looks like:
    // { users: [...], recipes: [...], ingredients: [...] }
    const data = req.body;  // make sure your Express app uses express.json() middleware
    
    // Process Users
    if (data.users && Array.isArray(data.users)) {
      for (const userData of data.users) {
        // Check for an existing user and create if necessary
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
          await User.create(userData);
        }
      }
    }
    
    // Process Ingredients
    if (data.ingredients && Array.isArray(data.ingredients)) {
      for (const ingredientData of data.ingredients) {
        // For example, ingredientData might be just a name as string
        const name = typeof ingredientData === 'string'
          ? ingredientData
          : ingredientData.name;
        
        const exists = await Ingredient.findOne({ name });
        if (!exists) {
          await Ingredient.create({ name });
        }
      }
    }
    
    // Process Recipes
    if (data.recipes && Array.isArray(data.recipes)) {
      for (const recipeData of data.recipes) {
        // Optionally check if it exists or simply create it.
        await Recipe.create(recipeData);
      }
    }
    
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: error.message });
  }
};
