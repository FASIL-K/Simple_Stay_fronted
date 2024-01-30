import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = useState([0, 0]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationSelect({ lat, lng });
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>You selected this location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
