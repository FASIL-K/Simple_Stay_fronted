import React, { useState } from "react";
import ProfileNavigation from "../Layout/ProfileNavigation.jsx/ProfileNaviagtion";
import { Typography } from "@material-tailwind/react";
import { TbHomeHeart } from "react-icons/tb";

function UserProfileActivity() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const renderAdditionalContent = () => {
    if (selectedCard === "saved") {
      return (
        <div className="bg-green-100 p-4 rounded mt-4">
          Additional content for Saved Properties
        </div>
      );
    } else if (selectedCard === "seen") {
      return (
        <div className="bg-yellow-100 p-4 rounded mt-4">
          Additional content for Seen Properties
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex">
      <ProfileNavigation />
      <div className="mt-8 ml-16 flex flex-col">
        <div className="mb-2">
          <Typography variant="h4">My Activity</Typography>
        </div>

        <div className="flex gap-7">
        <div
            className={`w-36 h-24 mt-3 bg-blue-gray-50 shadow-2xl cursor-pointer border-1 border-blue-gray-800 border-opacity-5 transition duration-75 hover:border-blue-500 rounded ${
              selectedCard === "saved" ? "border-blue-500 bg-blue-100" : ""
            }`}
            onClick={() => handleCardSelect("saved")}
          >
            <div className="flex justify-center">
              <Typography variant="h3" className="mb-2">
                <TbHomeHeart className="mt-1" />
              </Typography>
            </div>
            <div className="text-center">
              <Typography color="blue-gray" className="font-medium" textGradient>
                Saved
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                Properties
              </Typography>
            </div>
          </div>
          <div
            className={`w-36 h-24 mt-3 bg-blue-gray-50 shadow-2xl cursor-pointer border-1 border-blue-gray-800 border-opacity-5 transition duration-75 hover:border-blue-500 rounded ${
              selectedCard === "seen" ? "border-blue-500  bg-blue-100" : ""
            }`}
            onClick={() => handleCardSelect("seen")}
          >
            <div className="flex justify-center">
              <Typography variant="h3" className="mb-2">
                <TbHomeHeart className="mt-1" />
              </Typography>
            </div>
            <div className="text-center">
              <Typography color="blue-gray" className="font-medium" textGradient>
                Seen
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                Properties
              </Typography>
            </div>
          </div>
        </div>

        {renderAdditionalContent()}
      </div>
    </div>
  );
}

export default UserProfileActivity;
