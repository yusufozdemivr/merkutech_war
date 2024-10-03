import React from 'react';

const Header = ({ data }) => {
  return (
    <header style={headerStyle}>
      <h1>Palestine Conflict Data</h1>
      <div style={dataStyle}>
        <div>
          <h3>Killed</h3>
          <p>{data.killed}</p>
        </div>
        <div>
          <h3>Injured</h3>
          <p>{data.injured}</p>
        </div>
        <div>
          <h3>Missing</h3>
          <p>{data.missing}</p>
        </div>
      </div>
    </header>
  );
};

// Example of basic inline styles
const headerStyle = {
  padding: '20px',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
};

const dataStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '20px',
};

export default Header;
