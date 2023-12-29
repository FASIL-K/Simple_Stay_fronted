// ListPropertys.jsx

import React, { useEffect, useState } from "react";
import Navbar from "./Layouts/Navbar";
import { Typography } from "@material-tailwind/react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { OwnerUrl } from "../../../Constants/Constants";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Example from "./Layouts/DeleteAlertModal";
import NoImage from "../../../assets/House-image.svg";
import { Link } from "react-router-dom";
import { DeactivateProperty, PropertyListing } from "../../../services/ownerApi";

function ListPropertys() {
  const [postData, setPostData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const [modalKey, setModalKey] = useState(0); // Add a key to force remounting the modal

  useEffect(() => {
    DataListing()
    // const apiUrl = `${OwnerUrl}property-post/${userId}/`;
    // axios
    //   .get(apiUrl)
    //   .then((response) => {
    //     setPostData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  }, [userId]);

  const DataListing = async() =>{
    try {
      const response = await PropertyListing(userId)
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
      const res = await DeactivateProperty(userId,propertyToDelete.id,{is_available: isAvailable })
      if (res.status===200){
        setPostData((prevData) =>
        prevData.map((p) =>
          p.id === propertyToDelete.id ? { ...p, is_available: isAvailable } : p
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
      <Navbar />
      <div className="flex justify-center items-center flex-col ">
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
              <img
                src={
                  property.images.length > 0
                    ? `${import.meta.env.VITE_USER_URL}${
                        property.images[0].image
                      }`
                    : NoImage
                }
                alt=""
                className="h-full w-full object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardBody className="p-4">
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
                    <Typography
                      variant="h6"
                      className="text-light-blue-900 text-base cursor-pointer"
                    >
                      Share
                    </Typography>
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
