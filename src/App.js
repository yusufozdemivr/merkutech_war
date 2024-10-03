import React, { useEffect, useState } from 'react';
import Header from './components/header';
import MapComponent from './components/map_component';

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
    </div>
  );
};

export default App;
