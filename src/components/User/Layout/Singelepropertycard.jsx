import React, { useEffect, useState } from "react";
import { CardFooter, Carousel } from "@material-tailwind/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import home from "../../../assets/home1.svg";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import marker from "../../../assets/marker.png";
import ChatBox from "../../Chat/ChatBox"; 


import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { OwnerUrl } from "../../../constants/constants";
import axios from "axios";
import { CreateSaved, IsSave, Unsave } from "../../../services/postApi";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import CustomCarousel from "./ArouyndThisPropertycard";
import { Link } from "react-router-dom/dist";

function Singelepropertycard() {
  const [isSaved, SetisSaved] = useState(false);
  const { propertyId } = useParams();
  const [postData, setPostData] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.id;
  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;

  const getIconColor = (category) => {
    switch (category) {
      case "school":
        return "#00F"; // Blue color for school
      case "hospital":
        return "#F00"; // Red color for hospital
      case "pharmacy":
        return "#0F0"; // Green color for pharmacy
      case "movie_theater":
        return "#FF0"; // Yellow color for movie theater
      case "hotel":
        return "#F80"; // Orange color for hotel
      case "park":
        return "#0FF"; // Cyan color for park
      default:
        return "#000"; // Default color
    }
  };

  const libraries = ["places"];
  const mapContainerStyle = {
    width: "50vw",
    height: "50vh",
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDH8DKerF4jGQdGzE77cAN3or2rU7CiBJw",
    libraries,
  });
  const handleMapButtonClick = () => {
    setShowMap(!showMap);
  };
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  console.log(
    postData.lat,
    postData.long,
    "longggggggggggggggggggggggggggggggggggggggggggg"
  );
  const lat = postData.lat;
  const long = postData.long;
  console.log(lat, long, "fafdasddddddddddddddd");

  useEffect(() => {
    const apiUrl = `${OwnerUrl}post/${propertyId}/  `;
    axios
      .get(apiUrl)
      .then((response) => {
        setPostData(response.data);
        console.log(response.data, "dasdsadasdsadas");
        console.log(postData, "dadadasda");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [propertyId]);

  // const fetchNearbyPlaces = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=11.421585208597453,75.93509357861727&radius=5000&type=hospital,school&key="
  //     );AIzaSyDH8DKerF4jGQdGzE77cAN3or2rU7CiBJw
  //     const user = await response.json();

  //     setNearbyPlaces(response.data.results);
  //     console.log(response,"responnnnnnnnnnnnnnnnnnn");
  //     console.log(nearbyPlaces,"nearbyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  //   } catch (error) {
  //     console.error("Error fetching nearby places:", error);
  //   }
  // };

  const handleHeartClick = async () => {
    try {
      if (isSaved) {
        await Unsave(userId, propertyId);
        SetisSaved(false);
        toast.success("Property removed from wishlist!");
      } else {
        const values = { user: userId, post: propertyId };
        await CreateSaved(values);
        SetisSaved(true);

        toast.success("Property added from wishlist!");
      }
    } catch (error) {
      console.error("Error handling heart click:", error);
      toast.error("Error processing your request. Please try again later.");
    }
  };

  const propertyDetails = [
    { label: "Security", value: postData.security_deposit },
    { label: "Furnishing", value: postData.furnished_type },
    { label: "Buildup area", value: postData.build_up_area },
    { label: "Balcony", value: null },
    { label: "Bathrooms", value: null },
    { label: "FloorNumber", value: null },
  ];

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const isSavedResponse = await IsSave(userId, propertyId);
        SetisSaved(isSavedResponse.data.saved);
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    checkSavedStatus();
  }, [userId, propertyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${OwnerUrl}fetch_nearby_places/`, {
          params: {
            location: `${postData.lat},${postData.long}`,
            radius: "4000",
            place_type: "hospital,school,Shoppingmall,restaurent",
          },
        });
        console.log(response, "");

        setNearbyPlaces(response.data);

        console.log(nearbyPlaces, "nearbyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    };

    if (postData.lat && postData.long) {
      fetchData();
    }
  }, [postData.lat, postData.long]);
  if (!postData) {
    return (
      <div className="flex w-auto h-auto justify-center items-center">
        <div className="">
          <Typography>No Post found</Typography>
        </div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/property/${propertyId}`;
  const title = `${postData.bhk_type} ${postData.property_type} for ${postData.looking_to} in ${postData.locality}, ${postData.house_name}, ${postData.city}`;

  return (
    <div className="h-min w-full">
      {/* First Card */}
      <Card className="m-12 mt-24 md:m-14 bg-blue-gray-50 rounded-3xl shadow-2xl">
        <div className="flex h-40 rounded-2xl m-6 ">
          <div className="bg-blue-gray-50 w-1/2 flex flex-col">
            <div className="flex justify-between ">
              <Typography variant="h3" color="black" className="mb-2">
                {postData.bhk_type} {postData.property_type} for{" "}
                {postData.looking_to}
              </Typography>
              <div className="flex gap-7">
                {isSaved ? (
                  <FaHeart
                    color="orange"
                    size={"1.5rem"}
                    className="cursor-pointer"
                    onClick={handleHeartClick}
                  />
                ) : (
                  <FaRegHeart
                    color="orange"
                    size={"1.5rem"}
                    className="cursor-pointer"
                    onClick={handleHeartClick}
                  />
                )}

                <Menu
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <MenuHandler>
                    <Typography>
                      <IoShareSocialOutline
                        size={"1.5rem"}
                        className="cursor-pointer"
                      />
                    </Typography>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <FacebookShareButton url={shareUrl} quote={title}>
                        <FaFacebook size={24} className="cursor-pointer" />
                      </FacebookShareButton>
                    </MenuItem>
                    <MenuItem>
                      <TwitterShareButton url={shareUrl} title={title}>
                        <FaTwitter size={24} className="cursor-pointer" />
                      </TwitterShareButton>
                    </MenuItem>
                    <MenuItem>
                      <WhatsappShareButton url={shareUrl} title={title}>
                        <FaWhatsapp size={24} className="cursor-pointer" />
                      </WhatsappShareButton>
                    </MenuItem>

                    <MenuItem>
                      <EmailShareButton url={shareUrl} subject={title}>
                        <FaEnvelope size={24} className="cursor-pointer" />
                      </EmailShareButton>
                    </MenuItem>
                  </MenuList>
                </Menu>
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
                {postData.build_up_area} sqft
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

             
                <div className="">
                  <ChatBox PostData={postData} />
                </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64 w-2/3 mx-auto ">
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
                src={`${import.meta.env.VITE_USER1_URL}${image.image}`}
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
              {postData.locality},{postData.city}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography className="ml-7 -mb-7">Around This Property</Typography>
          <CustomCarousel nearbyPlaces={nearbyPlaces} />
          <div className="flex justify-center">
            <Typography
              className=" text-lg text-light-blue-900 px-4 py-2 rounded"
              onClick={handleMapButtonClick}
            >
              {showMap ? "Hide Map" : "Show Map"}
            </Typography>
          </div>
          {showMap && (
            <div className="flex justify-center items-center h-96">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={{
                  lat: parseFloat(postData.lat),
                  lng: parseFloat(postData.long),
                }}
                zoom={15}
              >
                <MarkerF
                  position={{
                    lat: parseFloat(postData.lat),
                    lng: parseFloat(postData.long),
                  }}
                />

                {nearbyPlaces.results &&
                  nearbyPlaces.results.map(
                    (place, index) =>
                      place.geometry && (
                        <MarkerF
                          key={index}
                          position={{
                            lat: parseFloat(place.geometry.lat),
                            lng: parseFloat(place.geometry.lng),
                          }}
                          icon={{
                            path: "M5 0C2.239 0 0 2.239 0 5s2.239 5 5 5 5-2.239 5-5S7.761 0 5 0zm0 7c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
                            fillColor: getIconColor(place.category),
                            fillOpacity: 1,
                            scale: 2,
                          }}
                          onClick={() => setSelectedPlace(place)}
                        />
                      )
                  )}

                {selectedPlace && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(selectedPlace.geometry.lat),
                      lng: parseFloat(selectedPlace.geometry.lng),
                    }}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div>
                      <h2>{selectedPlace.name}</h2>
                      <p>Category: {selectedPlace.category}</p>
                      <p>Distance: {selectedPlace.distance} km</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          )}
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

              {/* Display Amenities under "About this Property" */}
              <div className="ml-8 mt-4">
                <Typography variant="h6" color="black" className="text-lg">
                  Amenities
                </Typography>
                <ul className="list-disc ml-4">
                  {postData.amenities.map((amenity, index) => (
                    <li key={index}>
                      <Typography variant="paragraph">
                        {amenity.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
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
                Furnishing And Aminities
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Singelepropertycard;
