import React from 'react';
import { Popup } from 'react-leaflet';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import './PopupStyles.css'; // Importing external CSS for styles

const CustomPopup = ({ location }) => {
  return (
    <Popup>
      <div className="popup-container">
        {/* Side A and Side B data in two columns */}
        <div className="popup-columns">

          <div className="popup-column popup-side-b">
            <h4>{location.side_b}</h4>
            <p><PeopleIcon /> Askeri Hayat Kaybı: {location.deaths_b}</p>
            <p><ChildCareIcon /> Çocuk Kaybı: {location.deaths_child}</p>
            <p><GavelIcon /> Kaçırılan: {location.kidnapped}</p>
          </div>
          <div className="popup-column popup-side-a">
            <h4>{location.side_a}</h4>
            <p><GavelIcon /> Askeri Hayat Kaybı: {location.deaths_a}</p>
            <p><EmojiPeopleIcon /> Sivil Kaybı: {location.deaths_b}</p>
          </div>

          {/* Side B Data */}

        </div>

        {/* Non-sided Data (bottom center) */}
        <div className="popup-footer">
          <strong>{location.city}</strong> — {location.conflict_name}, {location.year}
        </div>
      </div>
    </Popup>
  );
};

export default CustomPopup;
