import React, { useEffect, useState } from "react";
import Navbar from "./Layouts/Navbar";
import { Typography } from "@material-tailwind/react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { OwnerUrl } from "../../../Constants/Constants";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Example from "./Layouts/DeleteAlertModal";

function ListPropertys() {
  const [postData, setPostData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;

  useEffect(() => {
    const apiUrl = `${OwnerUrl}property-post/${userId}/`;
    axios
      .get(apiUrl)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    console.log("Deleting property:", propertyToDelete);
    // Handle the deletion logic here

    // Reset state
    setPropertyToDelete(null);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-col">
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
                    : ""
                }
                alt="No andi"
                className="h-full w-full object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardBody className="p-4">
              <div className="absolute flex top-14 right-3 mt-4 mr-2">
                <CheckCircleOutlineOutlinedIcon className="text-green-900" />
                <Typography
                  variant="h6"
                  color="green"
                  className="ml-2 mt-1 cursor-pointer text-xs"
                >
                  ACTIVE
                </Typography>
              </div>
              <div className="absolute top-0 right-0 h-10 w-44 flex justify-around mt-4">
                <Typography
                  variant="h6"
                  className="text-light-blue-900 text-base cursor-pointer"
                >
                  Share
                </Typography>
                <Typography
                  variant="h6"
                  className="text-light-blue-900 text-base cursor-pointer"
                >
                  Edit
                </Typography>
                <Typography
                  variant="h6"
                  className="text-red-800 text-base cursor-pointer"
                  onClick={() => handleDeleteClick(property)}
                >
                  Delete
                </Typography>
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
            unmount // Ensure that the modal is unmounted when closed
          />
        )}
      </div>
    </div>
  );
}

export default ListPropertys;
