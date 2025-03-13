import mongoose from "mongoose";
import fs from "fs"; // File system module to read files

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB!");

    // Define the User Schema
    const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        ingredients: [String],
    });

    // Define Recipe Schema
    const recipeSchema = new mongoose.Schema({
        title: String,
        description: String,
        ingredients: [String],
        steps: [String],
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    });

    // Define Ingredient Schema
    const ingredientSchema = new mongoose.Schema({
        name: String,
        type: String,
        calories: Number,
    });

    // Create Models
    const User = mongoose.model("User", userSchema);
    const Recipe = mongoose.model("Recipe", recipeSchema);
    const Ingredient = mongoose.model("Ingredient", ingredientSchema);

    // Read the sample.json file
    fs.readFile("sample.json", "utf8", async (err, data) => {
        if (err) {
            console.error("Error reading the sample.json file:", err);
            return;
        }

        // Parse the JSON data from the file
        const usersData = JSON.parse(data);

        // Insert users data into MongoDB
        for (const userData of usersData) {
            const user = await User.create(userData); // Insert user
            console.log("Inserted user:", user);

            // Insert ingredients into the Ingredients collection
            for (const ingredient of userData.ingredients) {
                const existingIngredient = await Ingredient.findOne({ name: ingredient });
                if (!existingIngredient) {
                    const newIngredient = await Ingredient.create({ name: ingredient });
                    console.log("Inserted ingredient:", newIngredient);
                }
            }

            // Optionally, create recipes based on the user's data
            const recipe = await Recipe.create({
                title: `${user.username}'s Favorite Recipe`,
                description: "A simple recipe with the user's favorite ingredients.",
                ingredients: userData.ingredients, // Use the ingredients from the user
                steps: ["Step 1: Prepare ingredients", "Step 2: Cook ingredients", "Step 3: Serve"],
                userId: user._id, // Link to the user
            });

            console.log("Inserted recipe:", recipe);
        }

        // Fetch and print all users, recipes, and ingredients
        const users = await User.find();
        const recipes = await Recipe.find();
        const ingredients = await Ingredient.find();

        console.log("Users from the database:", users);
        console.log("Recipes from the database:", recipes);
        console.log("Ingredients from the database:", ingredients);

        mongoose.connection.close(); // Close the connection after testing
    });
});
