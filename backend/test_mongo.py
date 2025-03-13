import json
from pymongo import MongoClient

try:
    # Connect to MongoDB
    client = MongoClient("mongodb://127.0.0.1:27017/")
    db = client["recipeDB"]
    users_collection = db["users"]
    # Load sample data from JSON file
    with open("sample.json") as f:
        sample_data = json.load(f)

    # Insert data into MongoDB (avoid duplicates)
    for user in sample_data:
        if not users_collection.find_one({"username": user["username"]}):
            users_collection.insert_one(user)
            print(f"Inserted {user['username']} into the database.")
        else:
            print(f"{user['username']} already exists. Skipping insertion.")

    # Fetch and print all users
    print("\nUsers in the database:")
    for user in users_collection.find():
        print(user)

except Exception as e:
    print("Error:", e)

finally:
    # Close MongoDB connection
    client.close()
    print("\nMongoDB connection closed.")
