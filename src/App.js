<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Header from './components/header';
=======
import React, { useState } from 'react';
>>>>>>> 5c82921a14831f5b1a272b0bac3bdfcceea12c84
import MapComponent from './components/map_component';
import InfoPanel from './components/info_panel';
import './App.css'; // For basic layout styling

<<<<<<< HEAD
const App = () => {
  const [palestineData, setPalestineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the /casualties endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/casualties');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const parsed_data = await response.json();

        // Only extract Palestine's data
        const palestine = parsed_data.palestine;

        setPalestineData(palestine);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {palestineData ? <Header data={palestineData} /> : <div>No data available</div>}
      <MapComponent></MapComponent>
=======
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
>>>>>>> 5c82921a14831f5b1a272b0bac3bdfcceea12c84
    </div>
  );
};

export default App;
