import React, { useEffect, useState } from "react";
import { CardFooter, Carousel } from "@material-tailwind/react";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import home from "../../../assets/home1.svg";
import { useParams } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { OwnerUrl } from "../../../Constants/Constants";
import axios from "axios";

function Singelepropertycard() {

  const data = [
    {
      imgelink:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
  ];
 
  const [active, setActive] = React.useState(
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  );

  const { propertyId } = useParams();
  const [postData, setPostData] = useState("")

  const propertyDetails = [
    { label: "Security", value: postData.security_deposit  },
    { label: "Furnishing", value: postData.furnished_type },
    { label: "Buildup area", value: postData.build_up_area },
    { label: "Balcony", value: null },
    { label: "Bathrooms", value: null },
    { label: "FloorNumber", value: null },
  ];
  useEffect(() => {
    const apiUrl = `${OwnerUrl}post/${propertyId}/  `;
    axios
      .get(apiUrl)
      .then((response) => {
        setPostData(response.data);
        console.log(response.data,"dasdsadasdsadas");
        console.log(postData, "dadadasda");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [propertyId]);
  if (!postData) {
    return (
      <div className="flex w-auto h-auto justify-center items-center">
        <div className="">
          <Typography>No Post found</Typography>
        </div>
      </div>
    );
  }

  return (
    
    <div className="h-min w-full">
     
      {/* First Card */}
      <Card className="m-12 mt-24 md:m-14 bg-blue-gray-50 rounded-3xl shadow-2xl">
        <div className="flex h-40 rounded-2xl m-6 ">
          <div className="bg-blue-gray-50 w-1/2 flex flex-col">
            <div className="flex justify-between ">
              <Typography variant="h3" color="black" className="mb-2">
              {postData.bhk_type} {postData.property_type} for {postData.looking_to}
              </Typography>
              <div className="flex gap-7">
                <FaRegHeart
                  color="orange"
                  size={"1.5rem"}
                  className="cursor-pointer"
                />
                <IoShareSocialOutline
                  size={"1.5rem"}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="flex w-2/4 mb-1 gap-24  ">
              <Typography
                variant="h6"
                color="black"
                className="font-light text-lg opacity-70 "
              >
                {postData.furnished_type}
              </Typography>
              <Typography
                variant="h5"
                color="black"
                className="font-light text-lg opacity-70 "
              >
                { postData.build_up_area} sqft
              </Typography>
            </div>
            <Typography
              variant="h5"
              color="black"
              className="font-light text-base opacity-70"
            >
              {postData.locality},{postData.house_name},{postData.city}
            </Typography>
          </div>
          <div className="flex bg-blue-gray-50 w-1/2 justify-end  ">
            <div className="flex flex-col">
              <Typography variant="h3" color="black" className="text-3xl ">
                {" "}
                ₹ {postData.monthly_rent}
              </Typography>
              <Typography
                variant="h6"
                color="black"
                className="font-light text-lg opacity-70 "
              >
                Date of post
              </Typography>
              <div className=" gap-3 cursor-pointer w-[15rem] h-12 bg-light-green-400 rounded-md flex justify-center items-center text-white mt-4 mr-8  ">
                <FiMessageSquare />
                <Typography>Message Owner</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64 w-2/3 mx-auto">
          <Carousel
            className="rounded-xl h-64 w-2/3 mb-11 "
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {postData.images.map((image, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_USER_URL}${image.image}`}
                alt={`image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
          
        </div>
      </Card>

      {/* Second Card */}
      <Card
        color="transparent"
        shadow={false}
        className="m-12 w-5/6 mt-24 md:m-14 bg-blue-gray-50 rounded-3xl shadow-2xl"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar size="xxl" variant="circular" src={home} alt="tania andrew" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
              <Typography color="blue-gray" className="opacity-90 text-sm">
                Property Location
              </Typography>

              <div className="5 flex items-center gap-0"></div>
            </div>
            <Typography variant="h5" color="blue-gray">
              Address
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography>
            &quot;I found solution to all my design needs from Creative Tim. I
            use them as a freelancer in my hobby projects for fun! And its
            really affordable, very humble guys !!!&quot;
          </Typography>
        </CardBody>
      </Card>

      {/* Third Card */}
      <Card
        color="transparent"
        shadow={false}
        className="m-12 w-5/6 mt-24 md:m-14 bg-blue-gray-50 rounded-3xl shadow-2xl"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8 relative"
        >
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="ml-4 md:ml-10"
              >
                Overview
              </Typography>
              <hr className="border-t border-blue-gray-300 absolute w-full  md:mt-14" />
            </div>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <div className="flex flex-wrap">
            {propertyDetails.map((item, index) => (
              <div key={index} className="w-full md:w-1/2 p-4">
                <Typography className="ml-8">{item.label}</Typography>
                {item.value && (
                  <Typography variant="h6" className="ml-8 mt-2">
                    {item.value}
                  </Typography>
                )}
              </div>
            ))}
            <div>
              <Typography
                variant="h6"
                color="black"
                className="text-lg ml-12 mt-3"
              >
                About this Property
              </Typography>
              <Typography variant="paragraph" className="ml-12 mt-4">
                daslfkdasjfdoisajdjasiojkdnaskcnoik
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card
        color="transparent"
        shadow={false}
        className="m-12 w-5/6 mt-24 md:m-14 bg-blue-gray-50 rounded-3xl shadow-2xl"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8 relative"
        >
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="ml-4 md:ml-10"
              >
                Furnishing 
              </Typography>
              <hr className="border-t border-blue-gray-300 absolute w-full  md:mt-14" />
            </div>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <div className="flex flex-wrap">
            {propertyDetails.map((item, index) => (
              <div key={index} className="w-full md:w-1/2 p-4">
                <Typography className="ml-8">{item.label}</Typography>
                {item.value && (
                  <Typography variant="h6" className="ml-8 mt-2">
                    {item.value}
                  </Typography>
                )}
              </div>
            ))}
            <div>
              <Typography
                variant="h6"
                color="black"
                className="text-lg ml-12 mt-3"
              >
                About this Property
              </Typography>
              <Typography variant="paragraph" className="ml-12 mt-4">
                daslfkdasjfdoisajdjasiojkdnaskcnoik
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Singelepropertycard;
