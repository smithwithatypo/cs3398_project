import React, { useState } from "react";

const Profile = () => {
  // Editable state
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("you@example.com");
  const [expertiseLevel, setExpertiseLevel] = useState("Intermediate Cook");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(["Vegetarian"]);
  const [favoritedMeals, setFavoritedMeals] = useState(["Spicy Lentil Soup"]);
  const [newRestriction, setNewRestriction] = useState("");
  const [newMeal, setNewMeal] = useState("");

  const handleAddRestriction = () => {
    if (newRestriction.trim()) {
      setDietaryRestrictions([...dietaryRestrictions, newRestriction]);
      setNewRestriction("");
    }
  };

  const handleAddMeal = () => {
    if (newMeal.trim()) {
      setFavoritedMeals([...favoritedMeals, newMeal]);
      setNewMeal("");
    }
  };

  const handleSave = () => {
    console.log("Saved profile data:", {
      name,
      email,
      expertiseLevel,
      dietaryRestrictions,
      favoritedMeals,
    });
    alert("Profile saved!");
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-2xl font-bold text-center text-[#1e2d3d] bg-transparent border-b border-gray-300 focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block mx-auto text-[#1e2d3d] bg-transparent border-b border-gray-300 focus:outline-none mt-1"
          />
        </div>

        {/* Expertise Level */}
        <div>
          <h3 className="text-xl font-semibold text-[#1e2d3d] mb-1">Expertise Level</h3>
          <select
            value={expertiseLevel}
            onChange={(e) => setExpertiseLevel(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option>Beginner</option>
            <option>Intermediate Cook</option>
            <option>Experienced Chef</option>
          </select>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <h3 className="text-xl font-semibold text-[#1e2d3d] mb-1">Dietary Restrictions</h3>
          <ul className="list-disc list-inside text-[#1e2d3d] mb-2">
            {dietaryRestrictions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add restriction"
              value={newRestriction}
              onChange={(e) => setNewRestriction(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
              onClick={handleAddRestriction}
              className="bg-[#1e2d3d] hover:bg-[#16232e] text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Favorited Meals */}
        <div>
          <h3 className="text-xl font-semibold text-[#1e2d3d] mb-1">Favorited Meals</h3>
          <ul className="list-disc list-inside text-[#1e2d3d] mb-2">
            {favoritedMeals.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add favorite meal"
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
              onClick={handleAddMeal}
              className="bg-[#1e2d3d] hover:bg-[#16232e] text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-6 rounded-md"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
