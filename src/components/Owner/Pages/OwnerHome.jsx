import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function OwnerHome() {
  const [userDetails, setUserDetails] = useState(null);

  const token = localStorage.getItem("token");
  const data=jwtDecode(token)
  console.log(data,"hhhhhh");
  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/owner/user-details/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response, "Response from API");
        setUserDetails(response.data,); // Update state with response data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false); // Make sure to set loading to false in case of error
      }
    };
  
    if (accessToken) {
      fetchUserDetails();
    }
  }, [accessToken]);
  console.log(userDetails,"dasdasdasd");

  return (
    <div className='releative w-screen'>
      <Card
          shadow={true}
          className="absolute w-8/12 h-40 top-36 right-1/4 bg-pink-100 "
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex justify-start items-start gap-4 pt-0 "
          >
            
            <Typography variant="" className="ml-10  text-2xl   text-black">Profile</Typography>
          </CardHeader>
          <CardBody>
            <>
            <Card
          color="white"
          shadow={true}
          className="absolute w-11/12   rounded-none "
          
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 "
          >
            <Avatar
              size="xxl"
              className="left-3"
              variant="circular"
              src={userDetails&&userDetails.profile_photo}
              alt="User Avatar"
            />

            <div className="flex w-full flex-col gap-0.5">
              <div>
                
              </div>
              <div className="flex items-center justify-between ">
                <Typography variant="h5" color="blue-gray">
                 {userDetails && userDetails.name}
                </Typography>

              </div>
              <Typography color="blue-gray">
              {userDetails&& userDetails.phone ? userDetails.phone :userDetails&&    userDetails.email}
              </Typography>
            </div>
          </CardHeader>
          <CardFooter className="flex items-end justify-end">
          <Link to="/owner/profile/">
          <Typography variant="h6" color="blue">
              ManageProfile
            </Typography>
          </Link>
          </CardFooter>
        </Card>

            </>
            
          </CardBody>
          
        </Card>
    </div>
  )
}

export default OwnerHome


