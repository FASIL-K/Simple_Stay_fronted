import { Card, Typography } from "@material-tailwind/react";
import bag from "../../../assets/bag.png";
import hospital from "../../../assets/hospital.png";
import pharmacy from "../../../assets/pharmacy.png"
import movie from "../../../assets/movie.png"
import hotel from "../../../assets/hotel.png"
import park from "../../../assets/park.png"
import "./Around.css"
import { Tooltip } from "@material-tailwind/react";

import { useEffect, useState } from "react";

export default function CustomCarousel({ nearbyPlaces }) {
  const [data, setData] = useState([]);
  console.log(nearbyPlaces, "neeeeeeeeeeee");
  console.log(data, "daaaaaaaaaaaaaa");

  useEffect(() => {
    // Check if nearbyPlaces is defined before updating the state
    if (nearbyPlaces && nearbyPlaces.results) {
      setData(nearbyPlaces.results);
    }
  }, [nearbyPlaces]);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };

  return (
    <div className="flex w-full overflow-x-auto space-x-4 p-4 ">
      {data.map((place, index) => (
        <Tooltip className="bg-white text-black" content={place.name}>
        <Card
          key={index}
          className="bg-blue-gray-50 w-72 h-14 shadow-xl mb-3 mt-3 border relative  flex-shrink-0"
        >
          {/* Left Div */}
          <div className="absolute h-full w-1/5 flex items-center justify-end">
            <img src={getIcon(place.category)} alt="" className="mr-5" />
          </div>

          {/* Center Div */}
          <div className="absolute h-full w-3/5 flex flex-col items-center">
            <Typography className="mt-1.5 text-xs opacity-60">
              {place.category}
            </Typography>
            <Typography className="text-xs ml-16">
              {truncateString(place.name, 20)}
            </Typography>
          </div>

          {/* Right Div */}
          <div className="absolute ml-52 h-full w-2/5 flex items-end justify-start">
            <Typography className="opacity-55 text-black text-sm  p-2">
              {place.distance.toFixed(2)} km
            </Typography>
          </div>
        </Card>
        </Tooltip>
      ))}
    </div>
  );
}

// Function to get the appropriate icon based on the category
function getIcon(category) {
  switch (category) {
    case "school":
      return bag;
    case "hospital":
      return hospital;
      case "pharmacy":
        return pharmacy;
    case "movie_theater":
        return movie;
    case "hotel":
        return hotel;
    case "park":
        return park;
        
            
    // Add more cases as needed for other categories
    default:
      return bag;
  }
}
