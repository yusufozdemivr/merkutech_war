import React, { useState } from 'react';
import MapComponent from './components/map_component';
import InfoPanel from './components/info_panel';
import './App.css'; // For basic layout styling

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    { id: 1, name: 'Location 1', coords: [31.5, 34.45] },
    { id: 2, name: 'Location 2', coords: [31.6, 34.55] },
    { id: 3, name: 'Location 3', coords: [31.7, 34.65] }
  ];

  const handleLocationClick = (location) => {
    setSelectedLocation(location.name);
  };

  return (
    <div className="App">
      <div className="map-container">
        <MapComponent locations={locations} onLocationClick={handleLocationClick} />
      </div>
      <InfoPanel selectedLocation={selectedLocation} />
    </div>
  );
}

export default App;
