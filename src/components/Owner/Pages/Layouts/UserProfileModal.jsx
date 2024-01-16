// UserProfileModal.js
import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Avatar, Input, Typography } from "@material-tailwind/react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "90%", // Use a relative unit like percentage for responsiveness
    margin: "auto",
    borderRadius: "8px",
  },
};

export const UserProfileModal = ({ isOpen, onClose, userInfo }) => {
  return (
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
      <div className="">
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-semibold mb-3"
        >
          Edit Your Information
        </Typography>
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="xxl"
            />
          </div>
          <div>
            <Input
              variant="standard"
              label="Username"
              placeholder="Username"
              className="w-full md:w-96 lg:w-[900px]"
            />
            <div className="my-4"></div>
            <Input
              variant="standard"
              label="Email"
              placeholder="Email"
              defaultValue={userInfo.email}
              className="w-full md:w-96 lg:w-[900px]"
            />
            <div className="my-4"></div>
            <Input
              variant="standard"
              type="number"
              label="Phone"
              className="w-full md:w-96 lg:w-[900px]"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
