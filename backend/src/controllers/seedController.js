// backend/src/controllers/seedController.js
import bcrypt from "bcrypt";
import Ingredient from "../../database/models/Ingredient.js";
import Recipe from "../../database/models/Recipe.js";
import User from "../../database/models/User.js";

export const seedDatabase = async (req, res) => {
  try {
    const data = req.body; // Expects data from frontend in JSON format
    
    // Process Users: For each user, hash the password before saving
    if (data.users && Array.isArray(data.users)) {
      for (const userData of data.users) {
        // Check for an existing user by email; if not present, create one.
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
          // If userData has a password, hash it before storing.
          if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
          }
          await User.create(userData);
        }
      }
    }
    
    // Process Ingredients: Allow data as strings or objects with a "name" property.
    if (data.ingredients && Array.isArray(data.ingredients)) {
      for (const ingredientData of data.ingredients) {
        const name = typeof ingredientData === 'string' ? ingredientData : ingredientData.name;
        const exists = await Ingredient.findOne({ name });
        if (!exists) {
          await Ingredient.create({ name });
        }
      }
    }
    
    // Process Recipes: Create recipes directly; you can add additional checks if needed.
    if (data.recipes && Array.isArray(data.recipes)) {
      for (const recipeData of data.recipes) {
        await Recipe.create(recipeData);
      }
    }
    
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: error.message });
  }
};
