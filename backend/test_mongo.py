from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["recipeDB"]
users_collection = db["users"]

# Insert a test document
users_collection.insert_one({
    "username": "test_user",
    "email": "test@example.com",
    "ingredients": ["carrot", "potato", "onion"]
})

# Fetch and print all users
for user in users_collection.find():
    print(user)
