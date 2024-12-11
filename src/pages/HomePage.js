// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profiles");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummaryClick={handleSummaryClick}
          />
        ))}
      </div>
      {selectedProfile && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Map for {selectedProfile.name}
          </h2>
          <iframe
            title="Map"
            className="w-full h-80 border-2"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              selectedProfile.address
            )}&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default HomePage;
