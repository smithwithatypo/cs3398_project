import React, { useState } from "react";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [expertiseLevel, setExpertiseLevel] = useState("Beginner");
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [favoritedMeals, setFavoritedMeals] = useState([]);
  const [newRestriction, setNewRestriction] = useState("");
  const [newMeal, setNewMeal] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };

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
      expertiseLevel,
      dietaryRestrictions,
      favoritedMeals,
      avatar,
    });
    alert("Profile saved!");
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl space-y-6">
        {/* Avatar & Name */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <img
              src={avatar || "https://via.placeholder.com/100"}
              alt="Avatar"
              className="w-24 h-24 object-cover rounded-full border border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-3 text-sm"
            />
          </div>

          <div className="w-full max-w-sm flex flex-col gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="text-2xl font-bold text-center text-[#1e2d3d] bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Expertise */}
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
          <ul className="text-[#1e2d3d] mb-2 space-y-1">
            {dietaryRestrictions.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#f0f0f0] px-3 py-1 rounded"
              >
                <span>{item}</span>
                <button
                  onClick={() =>
                    setDietaryRestrictions(
                      dietaryRestrictions.filter((_, i) => i !== index)
                    )
                  }
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
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
          <ul className="text-[#1e2d3d] mb-2 space-y-1">
            {favoritedMeals.map((meal, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#f0f0f0] px-3 py-1 rounded"
              >
                <span>{meal}</span>
                <button
                  onClick={() =>
                    setFavoritedMeals(favoritedMeals.filter((_, i) => i !== index))
                  }
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
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
