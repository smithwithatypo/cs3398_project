import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-[#1e2d3d]">Your Name</h2>
        <p className="text-[#1e2d3d] mt-2">you@example.com</p>

        <button className="mt-6 bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
