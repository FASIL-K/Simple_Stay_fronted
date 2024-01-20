import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import Navbar from './Layouts/Navbar';
import { UserProfileModal } from './Layouts/UserProfileModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userDetails) {
      console.log(userDetails, 'User details fetched successfully');
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/owner/user-details/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setUserDetails(response.data);
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

  

  return (
    <div className="relative w-screen">
      <Navbar />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card color="white" shadow={false} className="absolute w-8/12 top-36 right-1/4 ">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="xxl"
              className="left-3"
              variant="circular"
              src={userDetails ? userDetails.profile_photo : ''}
              alt="User Avatar"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between ">
                <Typography variant="h5" color="blue-gray">
                  {userDetails && userDetails.name}
                </Typography>
                <div className="flex items-center gap-0 absolute right-3">
                  <Button onClick={openModal}>Edit</Button>
                </div>
              </div>
              <Typography color="blue-gray">{userDetails && userDetails.phone}</Typography>
            </div>
          </CardHeader>
        </Card>
      )}

      <UserProfileModal isOpen={isModalOpen} onClose={closeModal} userDetails={userDetails} setUserDetails={setUserDetails} />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
}

export default Profile;
