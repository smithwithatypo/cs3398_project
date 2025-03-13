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

    // Load JSON data
    let sampleData;
    try {
        sampleData = JSON.parse(fs.readFileSync("sample.json", "utf8"));
    } catch (error) {
        console.error("Error reading JSON file:", error);
        mongoose.connection.close();
        return;
    }

    try {
        // Insert users while avoiding duplicates
        for (const user of sampleData) {
            const existingUser = await User.findOne({ username: user.username });
            if (!existingUser) {
                await User.create(user);
                console.log(`Inserted: ${user.username}`);
            } else {
                console.log(`Skipped duplicate: ${user.username}`);
            }
        }

        // Fetch and print all users
        const users = await User.find();
        console.log("Users in database:", users);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
});

