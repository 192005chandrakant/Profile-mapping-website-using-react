// src/pages/ProfileDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profiles/${id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        {profile.name}'s Profile
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
        />
        <p className="text-gray-700 text-center mb-4">{profile.description}</p>
        <p className="text-gray-500 text-center mb-4">
          <strong>Address:</strong> {profile.address}
        </p>
        <p className="text-gray-500 text-center">
          <strong>Interests:</strong> {profile.interests || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default ProfileDetails;
