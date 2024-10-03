import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Box } from '@mui/material';
import L from 'leaflet';
import CustomPopup from './custompopup';

// Define red dot icon
const redDotIcon = new L.DivIcon({
  html: `<div style="
      background-color: red;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 3px rgba(0,0,0,0.5);
    "></div>`,
  iconSize: [12, 12], // Size of the red dot
  className: 'custom-red-dot', // Optional: custom class for additional styling
});

// Helper component to change the map's view
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// Reusable button component for location-based zooming
const LocationButton = ({ onClick, label }) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={{ margin: '0 10px' }}
  >
    {label}
  </Button>
);

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  const [currentEndpoint, setCurrentEndpoint] = useState('https://malcom32.pythonanywhere.com/api/afghanistan'); // Default endpoint
  const [mapCenter, setMapCenter] = useState([34.5553, 69.2075]); // Kabul by default
  const [mapZoom, setMapZoom] = useState(6);
  const [count, setCount] = useState(0); // State to store the count for war casualties

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(currentEndpoint);
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentEndpoint]); // Re-fetch data when endpoint changes

  // Handle button click, update count and endpoint
  const handleButtonClick = (endpoint, center, zoom, casualties) => {
    setCurrentEndpoint(endpoint);
    setMapCenter(center);
    setMapZoom(zoom);
    setCount(casualties); // Update count based on clicked location
  };

  return (
    <div>
      {/* Button controls using MUI LocationButton component */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <LocationButton
          onClick={() => handleButtonClick('https://malcom32.pythonanywhere.com/api/afghanistan', [34.5553, 69.2075], 6, 12000)}
          label="Afganistan"
        />
        <LocationButton
          onClick={() => handleButtonClick('https://malcom32.pythonanywhere.com/api/israel', [31.0461, 34.8516], 7, 5000)}
          label="İsrail"
        />
        <LocationButton
          onClick={() => handleButtonClick('https://malcom32.pythonanywhere.com/api/syrian', [34.8021, 38.9968], 7, 15000)}
          label="Suriye"
        />
        <LocationButton
          onClick={() => handleButtonClick('https://malcom32.pythonanywhere.com/api/ukraine', [48.3794, 31.1656], 7, 30000)}
          label="Ukrayna"
        />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px" flexDirection="column">
        <h3>Güncel Veriler:</h3>
        <p>Toplam Hayat Kaybı: {count}</p> {/* Display the count */}
      </Box>

      {/* Map Component */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <ChangeView center={mapCenter} zoom={mapZoom} />

        {/* Render locations on the map */}
        {locations.length > 0 ? (
          locations.map((location) => (
            <Marker
              key={location.id} // Ensure unique key
              position={[location.lattitude, location.longtitude]}
              icon={redDotIcon}
            >
              <CustomPopup location={location} />
            </Marker>
          ))
        ) : (
          <div>No locations available</div>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
