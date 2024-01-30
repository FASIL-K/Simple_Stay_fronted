// Import necessary components and styles
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Avatar, Typography } from "@material-tailwind/react";
import { Loader } from "../../../Loader/Loading";
import { jwtDecode } from "jwt-decode";

// Custom styles for the modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "90%",
    margin: "auto",
    borderRadius: "8px",
  },
};

const PackageDetailsModal = ({ isOpen, onClose, userDetails, setUserDetails }) => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const ownerId = decode.id;
  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;

  const handleModalClose = () => {
    onClose();
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="User Profile Modal"
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          <Typography variant="h5" color="blue-gray" className="font-semibold mb-3">
            Package Information
          </Typography>

          <div className="mb-2">
            <Typography className="font-bold">Package Name:</Typography>
            <Typography>{userDetails.premium_owner_details.package_details.name}</Typography>
          </div>
          <div className="mb-2">
            <Typography className="font-bold">Description:</Typography>
            <Typography>{userDetails.premium_owner_details.package_details.description}</Typography>
          </div>
          <div className="mb-2">
            <Typography className="font-bold">Price:</Typography>
            <Typography>{userDetails.premium_owner_details.package_details.price}</Typography>
          </div>
          <div className="mb-2">
            <Typography className="font-bold">Validity:</Typography>
            <Typography>{userDetails.premium_owner_details.package_details.validity}</Typography>
          </div>
          <div className="mb-2">
            <Typography className="font-bold">Start Date:</Typography>
            <Typography>{userDetails.premium_owner_details.start_date}</Typography>
          </div>
          <div>
            <Typography className="font-bold">End Date:</Typography>
            <Typography>{userDetails.premium_owner_details.exp_date}</Typography>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { PackageDetailsModal };
