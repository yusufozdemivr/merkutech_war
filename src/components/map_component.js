import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import L from 'leaflet';

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

// Reusable button component for location-based zooming using Material-UI
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
  const [currentEndpoint, setCurrentEndpoint] = useState('/api/afghanistan'); // Default endpoint
  const [mapCenter, setMapCenter] = useState([34.5553, 69.2075]); // Kabul by default
  const [mapZoom, setMapZoom] = useState(6);

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

  const handleButtonClick = (endpoint, center, zoom) => {
    setCurrentEndpoint(endpoint);
    setMapCenter(center);
    setMapZoom(zoom);
  };

  return (
    <div>
      {/* Button controls using MUI LocationButton component */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <LocationButton
          onClick={() => handleButtonClick('/api/afghanistan', [34.5553, 69.2075], 6)}
          label="Afghanistan"
        />
        <LocationButton
          onClick={() => handleButtonClick('/api/israel', [31.0461, 34.8516], 7)}
          label="Israel"
        />
        <LocationButton
          onClick={() => handleButtonClick('/api/syrian', [34.8021, 38.9968], 7)}
          label="Syria"
        />
        <LocationButton
          onClick={() => handleButtonClick('/api/ukraine', [48.3794, 31.1656], 7)}
          label="Ukraine"
        />
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
              <Popup>
                <div>
                  <strong>{location.city}</strong>
                  <p><GavelIcon /> Deaths: {location.deaths_a}</p>
                  <p><EmojiPeopleIcon /> Deaths (Civilians): {location.deaths_b}</p>
                  <p><ChildCareIcon /> Children Deaths: {location.deaths_child}</p>
                  <p><PeopleIcon /> Civilian Deaths: {location.deaths_civil}</p>
                  <p><GavelIcon /> Kidnapped: {location.kidnapped}</p>
                </div>
              </Popup>
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
