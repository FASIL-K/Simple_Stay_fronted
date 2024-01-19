// // IndiaCityDropdown.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const IndiaCityDropdown = () => {
//   const [cityNames, setCityNames] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [localities, setLocalities] = useState([]);
//   const googlePlacesApiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key

//   useEffect(() => {
//     const fetchCityNames = async () => {
//       try {
//         const response = await axios.get(
//           `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cities+in+India&key=${googlePlacesApiKey}`
//         );

//         // Extract city names from the response
//         const cities = response.data.results.map((city) => city.name);
//         setCityNames(cities);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     };

//     fetchCityNames();
//   }, [googlePlacesApiKey]);

//   const handleCityChange = async (selectedCity) => {
//     setSelectedCity(selectedCity);
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${selectedCity}&types=(cities)&key=${googlePlacesApiKey}`
//       );

//       // Extract locality suggestions from the response
//       const suggestedLocalities = response.data.predictions.map((prediction) => prediction.description);
//       setLocalities(suggestedLocalities);
//     } catch (error) {
//       console.error("Error fetching localities:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>City Names:</h1>
//       <select onChange={(e) => handleCityChange(e.target.value)} value={selectedCity}>
//         <option value="">Select a city</option>
//         {cityNames.map((city, index) => (
//           <option key={index} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>

//       {selectedCity && (
//         <div>
//           <h2>Localities in {selectedCity}:</h2>
//           <ul>
//             {localities.map((locality, index) => (
//               <li key={index}>{locality}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IndiaCityDropdown;


// IndiaCityDropdown.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const IndiaCityDropdown = () => {
//   const [cityNames, setCityNames] = useState([]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [places, setPlaces] = useState([]);
//   const googlePlacesApiKey = "AIzaSyDH8DKerF4jGQdGzE77cAN3or2rU7CiBJw"; // Replace with your API key

//   useEffect(() => {
//     const fetchCityNames = async () => {
//       try {
//         const response = await axios.get(
//           `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cities+in+India&key=${googlePlacesApiKey}`
//         );
        
//         // Extract city names from the response
//         const cities = response.data.results.map((city) => city.name);
//         setCityNames(cities);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     };

//     fetchCityNames();
//   }, [googlePlacesApiKey]);

//   const handleCityChange = async (selectedCity) => {
//     setSelectedCity(selectedCity);
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${selectedCity}&key=${googlePlacesApiKey}`
//       );

//       // Extract places (localities and landmarks) from the response
//       const placesData = response.data.results.map((place) => place.name);
//       setPlaces(placesData);
//     } catch (error) {
//       console.error("Error fetching places:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>City Names:</h1>
//       <select onChange={(e) => handleCityChange(e.target.value)} value={selectedCity}>
//         <option value="">Select a city</option>
//         {cityNames.map((city, index) => (
//           <option key={index} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>

//       {selectedCity && (
//         <div>
//           <h2>Places in {selectedCity}:</h2>
//           <ul>
//             {places.map((place, index) => (
//               <li key={index}>{place}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IndiaCityDropdown;

// CitySelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IndiaCityDropdown = ({ onCityChange }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch cities from OpenStreetMap Nominatim API
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          'https://nominatim.openstreetmap.org/search?q=country&format=json&limit=1000'
        );
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    onCityChange(cityId);
  };

  return (
    <div>
      <label>Select City:</label>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="" disabled>Select a city</option>
        {cities.map(city => (
          <option key={city.place_id} value={city.display_name}>{city.display_name}</option>
        ))}
      </select>
    </div>
  );
};

export default IndiaCityDropdown;
