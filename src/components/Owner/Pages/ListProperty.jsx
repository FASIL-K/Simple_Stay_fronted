// ListPropertys.jsx

import React, { useEffect, useState } from "react";
import Navbar from "./Layouts/Navbar";
import { Typography } from "@material-tailwind/react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { OwnerUrl } from "../../../constants/constants";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Example from "./Layouts/DeleteAlertModal";
import NoImage from "../../../assets/House-image.svg";
import { Link } from "react-router-dom";
import {
  DeactivateProperty,
  PropertyListing,
} from "../../../services/ownerApi";
import { Checkmark } from "react-checkmark";
import "./ListProperty.css";

function ListPropertys({ postData, setPostData }) {
  console.log(postData, "postssfaaaaaaaaaaaaaaaaaaaaaaaaa");
  // const [postData, setPostData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const [modalKey, setModalKey] = useState(0); // Add a key to force remounting the modal
  const User1Url ='https://simplestayback.molla.cloud'
  // useEffect(() => {
  //   DataListing();
  //   // const apiUrl = `${OwnerUrl}property-post/${userId}/`;
  //   // axios
  //   //   .get(apiUrl)
  //   //   .then((response) => {
  //   //     setPostData(response.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching data:", error);
  //   //   });
  // }, [userId]);

  // const DataListing = async () => {
  //   try {
  //     const response = await PropertyListing(userId);
  //     setPostData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleActivateClick = (property) => {
    setPropertyToDelete(property);
    // Reset the modal state and increment the key to force remounting the modal
    setShowDeleteModal(false);
    setModalKey((prevKey) => prevKey + 1);
    // Delay opening the modal to ensure proper reset
    setTimeout(() => setShowDeleteModal(true), 0);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const isAvailable = !propertyToDelete.is_available;
      const res = await DeactivateProperty(userId, propertyToDelete.id, {
        is_available: isAvailable,
      });
      if (res.status === 200) {
        setPostData((prevData) =>
          prevData.map((p) =>
            p.id === propertyToDelete.id
              ? { ...p, is_available: isAvailable }
              : p
          )
        );

        // Reset state
        setPropertyToDelete(null);
        setShowDeleteModal(false);
        // Increment the key to force remounting the modal
        setModalKey((prevKey) => prevKey + 1);
      }
      // console.log("Activating/Deactivating property:", propertyToDelete);

      // // Update the 'is_available' field based on the current state
      // const apiUrl = `${OwnerUrl}property-post/${userId}/${propertyToDelete.id}/`;

      // await axios.put(apiUrl, { is_available: isAvailable });

      // Update the local state to mark the post as active/inactive
    } catch (error) {
      console.error("Error activating/deactivating property:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center  flex-col ">
        {postData?.map((property) => (
          <Card
            key={property.id}
            className="w-full max-w-[48rem] flex-row mt-4 shadow-2xl relative mb-5"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-4 w-2/5 shrink-0  rounded relative"
            >
              {/* <img
                src={
                  property.images.length > 0
                    ? `${import.meta.env.VITE_USER1_URL}${
                        property.images[0].image
                      }`
                    : NoImage
                }
                alt="no image"
                className="h-full w-full object-cover rounded-t-lg"
              /> */}

              <img
                src={
                  property.images.length > 0
                    ? `${User1Url}${property.images[0].image}`
                    : NoImage
                }
                alt="no image"
                className="h-full w-full object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardBody className="p-4">
              {property.is_verify ? (
                <div className="flex">
                  <Typography variant="h6" className="mr-1">
                    Verified
                  </Typography>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="blue"
                      fill-rule="evenodd"
                      d="M4.252 14H4a2 2 0 1 1 0-4h.252c.189-.734.48-1.427.856-2.064l-.18-.179a2 2 0 1 1 2.83-2.828l.178.179A7.952 7.952 0 0 1 10 4.252V4a2 2 0 1 1 4 0v.252c.734.189 1.427.48 2.064.856l.179-.18a2 2 0 1 1 2.828 2.83l-.179.178c.377.637.667 1.33.856 2.064H20a2 2 0 1 1 0 4h-.252a7.952 7.952 0 0 1-.856 2.064l.18.179a2 2 0 1 1-2.83 2.828l-.178-.179a7.952 7.952 0 0 1-2.064.856V20a2 2 0 1 1-4 0v-.252a7.952 7.952 0 0 1-2.064-.856l-.179.18a2 2 0 1 1-2.828-2.83l.179-.178A7.952 7.952 0 0 1 4.252 14M9 10l-2 2l4 4l6-6l-2-2l-4 4z"
                    />
                  </svg>{" "}
                </div>
              ) : (
                ""
              )}
              <div className="absolute flex top-14 right-3 mt-4 mr-2">
                {property.is_available ? (
                  <>
                    <CheckCircleOutlineOutlinedIcon className="text-green-900" />
                    <Typography
                      variant="h6"
                      color="green"
                      className="ml-2 mt-1 cursor-pointer text-xs"
                    >
                      ACTIVE
                    </Typography>
                  </>
                ) : (
                  <>
                    <CheckCircleOutlineOutlinedIcon className="text-red-900" />
                    <Typography
                      variant="h6"
                      color="red"
                      className="ml-2 mt-1 cursor-pointer text-xs"
                    >
                      DEACTIVE
                    </Typography>
                  </>
                )}
              </div>
              <div className="absolute top-0 right-0 h-10 w-44 flex justify-around mt-4 mr-3 ">
                {property.is_available && (
                  <>
                    {/* <Typography
                      variant="h6"
                      className="text-light-blue-900 text-base cursor-pointer"
                    >
                      Share
                    </Typography> */}
                    <Link
                      to={`/owner/edit-properties/${property.id}`}
                      className="text-light-blue-900 text-base cursor-pointer"
                    >
                      <Typography variant="h6">Edit</Typography>
                    </Link>
                  </>
                )}
                {property.is_available ? (
                  <Typography
                    variant="h6"
                    className="text-red-800 text-base cursor-pointer"
                    onClick={() => handleActivateClick(property)}
                  >
                    Delete
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    className="text-green-900 text-base cursor-pointer ml-12"
                    onClick={() => handleActivateClick(property)}
                  >
                    Activate
                  </Typography>
                )}
              </div>

              <div className="relative flex mt-20">
                <Typography variant="h4" color="blue-gray" className="mb-7">
                  ₹ {property.monthly_rent}
                </Typography>
              </div>

              <Typography variant="h6" className="mb-2">
                {property.bhk_type} {property.property_type}
              </Typography>
              <div className="flex justify-between">
                <Typography className="font-normal">
                  {property.build_up_area} sq.ft
                </Typography>
                <Typography className="font-normal mb-28 ml-6">
                  {property.furnished_type}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
        {showDeleteModal && (
          <Example
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirmation}
            property={propertyToDelete} // Pass the property information to the modal
            unmount // Ensure that the modal is unmounted when closed
          />
        )}
      </div>
    </div>
  );
}

export default ListPropertys;
