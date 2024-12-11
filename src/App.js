import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import ProfileDetails from './pages/ProfileDetails';
import AdminPage from './pages/AdminPage';
import MapComponent from './components/MapComponent'; // Import the Map component
import './styles/styles.css';  // Import the styles

const App = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch profiles from the backend
    axios.get('http://localhost:5000/api/profiles')
      .then((response) => {
        setProfiles(response.data);  // Save profiles in state
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <h1>Interactive Map</h1>
        {/* Pass latitude and longitude to MapComponent for the first profile */}
        {profiles.length > 0 && (
          <MapComponent
            lat={profiles[0].address.lat}
            lng={profiles[0].address.lng}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
