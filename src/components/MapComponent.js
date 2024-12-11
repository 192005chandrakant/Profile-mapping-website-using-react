import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ lat, lng }) => {
  useEffect(() => {
    // Check if map is already initialized
    if (document.getElementById('map')._leaflet_id) return;

    // Initialize the map
    const map = L.map('map').setView([lat, lng], 13);

    // Set the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add a marker at the provided coordinates
    L.marker([lat, lng]).addTo(map);
  }, [lat, lng]); // Re-run when lat/lng changes

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
