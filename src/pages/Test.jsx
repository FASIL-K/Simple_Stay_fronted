import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Map = ({ onMarkerChange }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDH8DKerF4jGQdGzE77cAN3or2rU7CiBJw',
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    setMarkerPosition(newPosition);
    onMarkerChange(newPosition);
  };
  console.log(markerPosition,"maekerposition");

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className='flex justify-center items-center '>
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={handleMapClick}
        
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(event) =>
                handleMapClick(event)
            }
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
