import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import Navbar from './Layouts/Navbar';
import profile from '../../../assets/profileavatar.png';
import { useDispatch, useSelector } from "react-redux";
import { UserProfileModal } from './Layouts/UserProfileModal'; // Import the UserProfileModal component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-screen">
      <Navbar />

      <Card color="white" shadow={false} className="absolute w-8/12 top-36 right-1/4 ">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="xxl"
            className=' left-3 '
            variant="circular"
            src={`${import.meta.env.VITE_USER_URL}${userInfo.profile_photo}`}
            alt="tania andrew"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between ">
              <Typography variant="h5" color="blue-gray">
                {userInfo.email}
              </Typography>
              <div className="flex items-center gap-0 absolute right-3">
                <Button onClick={openModal}>Edit</Button>
              </div>
            </div>
            <Typography color="blue-gray">{userInfo.email}</Typography>
          </div>
        </CardHeader>
      </Card>

      {/* Render the UserProfileModal */}
      <UserProfileModal isOpen={isModalOpen} onClose={closeModal} userInfo={userInfo}  />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />

    </div>
  );
}

export default Profile;
