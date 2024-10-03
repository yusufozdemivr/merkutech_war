import React from 'react';

const InfoPanel = ({ selectedLocation }) => {
  return (
    <div className="info-panel">
      {selectedLocation ? (
        <p>{selectedLocation}: asdaegjsfam</p>
      ) : (
        <p>Click a location on the map</p>
      )}
    </div>
  );
};

export default InfoPanel;
