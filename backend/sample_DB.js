const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB!");

    const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        ingredients: [String],
    });

    const User = mongoose.model("User", userSchema);

    // Insert a test document
    await User.create({
        username: "test_user",
        email: "test@example.com",
        ingredients: ["carrot", "potato", "onion"],
    });

    // Fetch and print all users
    const users = await User.find();
    console.log(users);

    mongoose.connection.close(); // Close the connection after testing
});

