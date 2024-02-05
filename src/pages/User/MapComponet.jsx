import React, { useEffect, useRef } from 'react';

const LocationSearch = () => {
  const cityInputRef = useRef(null);
  const localityInputRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDH8DKerF4jGQdGzE77cAN3or2rU7CiBJw&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      const cityAutocomplete = new window.google.maps.places.Autocomplete(cityInputRef.current);
      const localityAutocomplete = new window.google.maps.places.Autocomplete(localityInputRef.current);

      cityAutocomplete.addListener('place_changed', () => {
        const cityPlace = cityAutocomplete.getPlace();
        const cityLat = cityPlace.geometry.location.lat();
        const cityLng = cityPlace.geometry.location.lng();

        localityAutocomplete.setBounds(
          new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(cityLat - 0.1, cityLng - 0.1),
            new window.google.maps.LatLng(cityLat + 0.1, cityLng + 0.1)
          )
        );
      });

      localityAutocomplete.addListener('place_changed', () => {
        const localityPlace = localityAutocomplete.getPlace();
        const localityName = localityPlace.name;
        const localityAddress = localityPlace.formatted_address;

        // Do something with the locality information
        console.log('Selected Locality:', localityName, localityAddress);
      });
    };

    // Load Google Maps API script
    loadGoogleMapsScript();
  }, []);

  return (
    <div>
      <label>
        Select City:
        <input
          ref={cityInputRef}
          type="text"
        />
      </label>
      <br />
      <label>
        Select Locality:
        <input
          ref={localityInputRef}
          type="text"
        />
      </label>
    </div>
  );
};

export default LocationSearch;
