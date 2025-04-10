// models/Recipe.js
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  steps: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Export as a default export:
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;