import zIndex from '@mui/material/styles/zIndex';
import React from 'react';

const InfoPanel = ({ count }) => {

  // Define styles for the sidebar, adjusting its position based on visibility
  const sidebarStyles = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '300',
    backgroundColor: '#f8f9fa',
    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
    transition: 'right 0.3s ease',
    padding: '20px',
    zIndex: 0
  };

  return (
    <div style={sidebarStyles}>
      <h3>War Info</h3>
      <p>A Killed: {count}</p>
    </div>
  );
};

export default InfoPanel;