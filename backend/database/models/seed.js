// seed.js
import fs from "fs";
import readline from "readline";
import connectDB from "../db.js";
import Ingredient from "./Ingredient.js";
import Recipe from "./Recipe.js";
import User from "./User.js";

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask questions using Promises
const askQuestion = (query) =>
  new Promise((resolve) => {
    rl.question(query, resolve);
  });

// Main seeding function
const runSeed = async () => {
  // Connect to MongoDB using our connection function
  await connectDB();

  // Read the sample.json file
  fs.readFile("sample.json", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading the sample.json file:", err);
      process.exit(1);
    }

    // Parse the JSON data from the file
    const usersData = JSON.parse(data);
    console.log("Parsed JSON data:", usersData);

    for (const userData of usersData) {
      // Create the user
      const user = await User.create({
        username: userData.username,
        email: userData.email,
        password: userData.password, // Assume already hashed or handle here as needed
        profilePicture: userData.profilePicture,
        bio: userData.bio,
      });
      console.log("Inserted user:", user);

      // Insert ingredients into the Ingredients collection
      for (const ingredient of userData.ingredients) {
        const existingIngredient = await Ingredient.findOne({ name: ingredient });
        if (!existingIngredient) {
          const newIngredient = await Ingredient.create({ name: ingredient });
          console.log("Inserted ingredient:", newIngredient);
        }
      }

      // Create a recipe based on the user's data
      const recipe = await Recipe.create({
        title: `${user.username}'s Favorite Recipe`,
        description: "A simple recipe with the user's favorite ingredients.",
        ingredients: userData.ingredients,
        steps: ["Step 1: Prepare ingredients", "Step 2: Cook ingredients", "Step 3: Serve"],
        userId: user._id,
      });
      console.log("Inserted recipe:", recipe);
    }

    // Update user's email interactively
    let answer = await askQuestion("Do you want to update a user's email? (y/n): ");
    if (answer.toLowerCase() === "y") {
      const usernameToUpdate = (await askQuestion("Enter the username to update: ")).trim();
      const newEmail = (await askQuestion("Enter the new email address: ")).trim();
      console.log(`Updating ${usernameToUpdate} to ${newEmail}`);
      
      const foundUser = await User.findOne({ username: usernameToUpdate });
      if (!foundUser) {
        console.log("User not found.");
      } else {
        const updatedUser = await User.findOneAndUpdate(
          { username: usernameToUpdate },
          { email: newEmail },
          { new: true }
        );
        console.log("Updated user:", updatedUser);
      }
    }

    // Delete a recipe interactively
    answer = await askQuestion("Do you want to delete a recipe? (y/n): ");
    if (answer.toLowerCase() === "y") {
      const recipeTitle = await askQuestion("Enter the exact recipe title to delete: ");
      const deletedRecipe = await Recipe.findOneAndDelete({ title: recipeTitle });
      if (deletedRecipe) {
        console.log("Deleted recipe:", deletedRecipe);
      } else {
        console.log("Recipe not found.");
      }
    }

    // Fetch and display all users, recipes, and ingredients
    const users = await User.find();
    const recipes = await Recipe.find();
    const ingredients = await Ingredient.find();

    console.log("Users in database:", users);
    console.log("Recipes in database:", recipes);
    console.log("Ingredients in database:", ingredients);

    // Clean up: close the DB connection and readline interface
    process.exit(0);
  });
};

runSeed();
