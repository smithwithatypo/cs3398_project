import React from "react";

const Profile = () => {
  // These could eventually come from a backend or user context
  const user = {
    name: "Your Name",
    email: "you@example.com",
    expertiseLevel: "Intermediate Cook",
    dietaryRestrictions: ["Vegetarian", "Nut-Free"],
    favoritedMeals: ["Spicy Lentil Soup", "Mushroom Risotto", "Tofu Stir Fry"],
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-[#1e2d3d]">{user.name}</h2>
          <p className="text-[#1e2d3d]">{user.email}</p>
        </div>

        {/* Expertise Level */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#1e2d3d] mb-2">Expertise Level</h3>
          <p className="text-[#1e2d3d]">{user.expertiseLevel}</p>
        </div>

        {/* Dietary Restrictions */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#1e2d3d] mb-2">Dietary Restrictions</h3>
          {user.dietaryRestrictions.length > 0 ? (
            <ul className="list-disc list-inside text-[#1e2d3d]">
              {user.dietaryRestrictions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[#1e2d3d]">None specified</p>
          )}
        </div>

        {/* Favorited Meals */}
        <div>
          <h3 className="text-xl font-semibold text-[#1e2d3d] mb-2">Favorited Meals</h3>
          {user.favoritedMeals.length > 0 ? (
            <ul className="list-disc list-inside text-[#1e2d3d]">
              {user.favoritedMeals.map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[#1e2d3d]">No favorites yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
