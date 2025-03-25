import mongoose from "mongoose";
import fs from "fs";
import axios from "axios";

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async () => {
  console.log("Connected to MongoDB!");

  // 2. Define a Recipe Sub-Schema for embedding recipes in a user document.
  // We set _id to false here if you don't want each recipe to have its own ObjectId.
  const recipeSubSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      ingredients: [String],
      steps: [String],
    },
    { _id: false }
  );

  // 3. Define the main User Schema with embedded ingredients and recipes.
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    ingredients: [String],
    recipes: [recipeSubSchema],
  });

  // 4. Create the User Model.
  const User = mongoose.model("User", userSchema);

  try {
    // 5. (Optional) Clear out existing user documents.
    await User.deleteMany({});
    console.log("Cleared existing user data.");

    // 6. Read the sample.json file.
    const data = fs.readFileSync("sample.json", "utf8");
    const usersData = JSON.parse(data);

    // 7. Insert each user from sample.json and generate a recipe for each user.
    for (const userData of usersData) {
      // Create the user with their ingredients; recipes will be added later.
      const user = await User.create({
        username: userData.username,
        email: userData.email,
        ingredients: userData.ingredients,
        recipes: [],
      });
      console.log("Inserted user:", user.username);

      // 8. Call the external API to generate a recipe using the user's ingredients.
      // Replace this URL with your actual recipe API endpoint.
      const apiUrl = "https://api.example.com/generateRecipe";
      try {
        const response = await axios.post(apiUrl, {
          ingredients: user.ingredients,
        });
        // Assume the API returns an object like:
        // { title: "Recipe Title", description: "Recipe description", steps: ["Step 1", "Step 2"], ingredients: [...] }
        const recipeData = response.data;
        console.log("API returned recipe:", recipeData.title);

        // 9. Embed the generated recipe directly into the user document.
        user.recipes.push({
          title: recipeData.title,
          description: recipeData.description,
          ingredients: recipeData.ingredients, // This could be the API-generated ingredients or the user's ingredients.
          steps: recipeData.steps,
        });
        await user.save();
        console.log("Embedded recipe into user", user.username);
      } catch (apiError) {
        console.error("Error calling recipe API for user", user.username, ":", apiError.message);
      }
    }

    // 10. (Optional) Fetch and log all users with their embedded recipes to verify.
    const allUsers = await User.find();
    console.log("All users in the DB:", allUsers);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
});
