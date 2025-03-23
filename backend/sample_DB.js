import mongoose from "mongoose";
import fs from "fs";

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB!");

  // 2. Define a simple User Schema with embedded ingredients
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    // We'll store ingredients in an array of strings
    // You can rename it to 'pantry' if you prefer
    ingredients: [String],
  });

  // 3. Create the User Model
  const User = mongoose.model("User", userSchema);

  try {
    // 4. (Optional) Clear out existing user documents
    await User.deleteMany({});
    console.log("Cleared existing user data.");

    // 5. Read the sample.json file
    const data = fs.readFileSync("sample.json", "utf8");
    const usersData = JSON.parse(data);

    // 6. Insert each user with embedded ingredients
    for (const userData of usersData) {
      await User.create({
        username: userData.username,
        email: userData.email,
        ingredients: userData.ingredients,
      });
    }

    console.log("Inserted users from sample.json");

    // 7. (Optional) Fetch and log all users to verify
    const allUsers = await User.find();
    console.log("All users in the DB:", allUsers);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
});
