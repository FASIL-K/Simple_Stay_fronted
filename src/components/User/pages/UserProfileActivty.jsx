import React, { useEffect, useState } from "react";
import ProfileNavigation from "../Layout/ProfileNavigation.jsx/ProfileNaviagtion";
import { Typography } from "@material-tailwind/react";
import { TbHomeHeart } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
import { Loader } from "../../Loader/Loading";
import axios from 'axios';

function UserProfileActivity() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);

  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;
  const ownerId = decode.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/owner/user-details/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setUserDetails(response.data);
        console.log(userDetails,"ssssssssssssssssssssssssss");
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchUserDetails();
    }
  }, [accessToken]);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const renderAdditionalContent = () => {
    if (selectedCard === "saved") {
      return (
        <div className="bg-green-100 p-4 rounded mt-4">
                {loading && <Loader />}

          Additional content for Saved Properties
        </div>
      );
    } else if (selectedCard === "seen") {
      return (
        <div className="bg-yellow-100 p-4 rounded mt-4">
                {loading && <Loader />}

          Additional content for Seen Properties
        </div>
      );
    }

    return null;
  };

  return (
      <div className="flex">
            {loading && <Loader />}
      <ProfileNavigation userDetails={userDetails} setUserDetails={setUserDetails}/>
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
