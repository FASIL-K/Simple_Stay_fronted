import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";

function SearchBar() {
  const [cityNames, setCityNames] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCityNames = async () => {
      try {
        const geonamesUsername = "Fasil";
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?country=IN&maxRows=1000&username=${geonamesUsername}`
        );
        const cities = response.data.geonames.map((city) => city.name);
        console.log(cities, "citiesssssssssssssssss");
        setCityNames(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCityNames();
  }, []);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    // You can perform any additional logic here based on the selected city
  };

  return (
    <>
      <div className="relative h-32 xl:w-[53rem] md:w-[40rem] rounded-[2rem] overflow-hidden">
        <div className="h-full w-full bg-black absolute opacity-40 z-10"></div>

        <div className="h-[50%] flex justify-start items-center gap-4 ml-16 relative z-20">
          <h3 className="text-base mt-3 text-white font-medium opacity-60">
            RENT
          </h3>
          
          <h3 className="text-base mt-3 text-white font-medium opacity-60">
            P/G
          </h3>
          <Select
            placeholder="Select City"
            options={cityNames}
            value={selectedCity}
            onChange={handleCityChange} // Corrected typo
          />
        </div>

        <div className="h-[58%] bg-white rounded-full relative z-20 flex justify-end">
          <div className="mt-2.5 mr-5">
            <Button className="bg-green-600 text-white px-4 py-2 rounded-3xl text-lg font-bold">
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
