// src/components/ProfileCard.js
import React from "react";

const ProfileCard = ({ profile, onSummaryClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-32 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
      <p className="text-gray-700 mb-4">{profile.description}</p>
      <button
        onClick={() => onSummaryClick(profile)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard;
