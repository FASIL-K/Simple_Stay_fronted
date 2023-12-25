import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
  } from "@material-tailwind/react";
import Navbar from './Layouts/Navbar';
import profile from '../../../assets/profileavatar.png'
import { useDispatch, useSelector } from "react-redux";
import { DialogDefault } from './Layouts/UserProfileModal';

function Profile() {
  const userInfo = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch()
  return (
    <div className="relative w-screen">
     <Navbar/>

     {/* <div className="absolute  w-3/5   mx-auto bg-blue-gray-50 border border-black border-opacity-25  md:left-28  xl:left-48 md:-mt-24 lg:-mt-24 xl:-mt-24 p-4 md:p-8 rounded-3xl flex flex-col md:flex-row shadow-2xl  "> */}
      <Card color="white"  shadow={false} className=" absolute w-8/12 top-36 right-1/4  ">
        <CardHeader
          color="transparent    "
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8 "
        >
          <Avatar
            size="xxl"
            className=' left-3 '
            variant="circular"
            src={profile}
            alt="tania andrew"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between  ">
              <Typography variant="h5" color="blue-gray">
              {userInfo.email}
              </Typography>
              <div className=" flex items-center gap-0 absolute  right-3 ">
               <Button >
                Edit
               </Button>
               <DialogDefault/>

              </div>
            </div>
            <Typography color="blue-gray">{userInfo.email}</Typography>
          </div>
        </CardHeader>
        {/* <CardBody className="mb-6 p-0">
          <Typography>
            &quot;I found solution to all my design needs from Creative Tim. I use
            them as a freelancer in my hobby projects for fun! And its really
            affordable, very humble guys !!!&quot;
          </Typography>
        </CardBody> */}
      </Card>
      </div>
    // </div>
  )
}

export default Profile


