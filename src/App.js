import React, { useEffect, useState } from 'react';
import MapComponent from './components/map_component';
import './App.css'; // For basic layout styling

const App = () => {

  return (
    <div>
        <MapComponent/> {/* Ensure locations is passed */}
    </div>
  );
}
export default App;
