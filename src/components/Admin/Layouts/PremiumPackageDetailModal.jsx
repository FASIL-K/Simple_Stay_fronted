// PostDetailsModal.js
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Typography } from "@material-tailwind/react"; // Import Typography from the material-tailwind library

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "80%",
    margin: "auto",
    borderRadius: "8px",
  },
};

const PackageDetailsModal = ({ isOpen, onClose, post }) => {
    console.log(post,"dasdasdasd");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Post Details Modal"
    >
      <div className="flex justify-end">
        <button onClick={onClose} className="text-2xl">
          <FaTimes />
        </button>
      </div>
     
      <div className="flex">
    
      <div className="mt-5 mx-3 flex justify-between">
        {/* Display property details */}
        <div className="">
        <Typography variant="h5" color="blue-gray" className="font-bold mb-3">
          Package Details
        </Typography>
        <Typography variant="body2">
          <strong>Name:</strong> {post.package_details.name}
        </Typography>
        <Typography variant="body2">
          <strong>Start Date:</strong> {post.start_date}
        </Typography>
        <Typography variant="body2">
          <strong>Expire Date:</strong> {post.exp_date}
        </Typography>
        <Typography variant="body2">
          <strong>Package Price:</strong> {post.package_details.price}
        </Typography>
        <Typography variant="body2">
          <strong>Active Status:</strong> {post.is_active? "Active":"Inactive"}
        </Typography>
       
        {/* Add more property details as needed */}
        
        </div>
       <div className="ml-20 ">
        {/* Display owner details */}
        <Typography color="blue-gray" variant="h6" font-semibold>
        Owner Details
      </Typography>
      
        <Typography variant="body2">
          <strong>Email:</strong> {post.user_details.email}
        </Typography>
        <Typography variant="body2">
          <strong>Phone:</strong> {post.user_details.phone}
        </Typography>
        {/* Add more owner details as needed */} 
       </div>
      </div>
      </div>
    </Modal>
  );
};

export default PackageDetailsModal;
