// PostDetailsModal.js
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Carousel } from "@material-tailwind/react";
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

const PostDetailsModal = ({ isOpen, onClose, post }) => {
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
      <Carousel className="rounded-xl h-[18rem] w-[18rem] mb-7 mt-2">
        {/* Map over post.images to create image elements */}
        {post.images.map((image, index) => (
          <img
            key={index}
            src={`${import.meta.env.VITE_USER1_URL}${image.image}`}
            alt={`Image ${index}`}
            className="h-[18rem] w-[18rem] object-cover"
          />
        ))}
      </Carousel>
      <div className="mt-5 mx-3 flex justify-between">
        {/* Display property details */}
        <div className="">
        <Typography variant="h5" color="blue-gray" className="font-bold mb-3">
          Property Details
        </Typography>
        <Typography variant="body2">
          <strong>Available From:</strong> {post.available_from}
        </Typography>
        <Typography variant="body2">
          <strong>BHK Type:</strong> {post.bhk_type}
        </Typography>
        <Typography variant="body2">
          <strong>Build-up Area:</strong> {post.build_up_area}
        </Typography>
        <Typography variant="body2">
          <strong>City:</strong> {post.city}
        </Typography>
        <Typography variant="body2">
          <strong>Locality:</strong> {post.locality}
        </Typography>
        <Typography variant="body2">
          <strong>FurnishType:</strong> {post.furnished_type
}
        </Typography>
        <Typography variant="body2">
          <strong>Type Of Property:</strong> {post.property_type

}
        </Typography>
        <Typography variant="body2">
          <strong>Rent:</strong> {post.monthly_rent}
        </Typography>
        <Typography variant="body2">
          <strong>Security Deposit:</strong> {post.security_deposit}
        </Typography>
        
        {/* Add more property details as needed */}
        
        </div>
       <div className="ml-20 ">
        {/* Display owner details */}
        <Typography variant="h5" color="blue-gray" className="font-bold  mb-3">
          Owner Details
        </Typography>
        <Typography variant="body2">
          <strong>Name:</strong> {post.owner_detail.name}
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> {post.owner_detail.email}
        </Typography>
        <Typography variant="body2">
          <strong>Phone:</strong> {post.owner_detail.phone}
        </Typography>
        {/* Add more owner details as needed */} 
       </div>
      </div>
      </div>
    </Modal>
  );
};

export default PostDetailsModal;
