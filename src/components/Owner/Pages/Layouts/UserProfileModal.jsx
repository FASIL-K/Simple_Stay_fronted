import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Avatar, Typography } from "@material-tailwind/react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../../redux/User";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "../../../Loader/Loading";
import { set } from "date-fns";

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

const validationSchema = Yup.object().shape({
  phone: Yup.string().matches(/^\d{10}$/, "Invalid phone number"),
  // Add more validation for other fields if needed
});

const UserProfileModal = ({ isOpen, onClose, userDetails, setUserDetails }) => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(userDetails?.profileImage || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailField, setEmailField] = useState(userDetails?.email || "");
  const [formChanged, setFormChanged] = useState(false);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const ownerId = decode.id;
  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setFieldValue("profileImage", file);
      setProfileImage(URL.createObjectURL(file));
      setFormChanged(true); // Indicate that the form has changed
    }
  };

  const EditProfiles = async (values, { setFieldValue }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (selectedImage) {
        // Only append the image if it's selected
        formData.append("profile_photo", selectedImage);
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/owner/profileEdit/${ownerId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserDetails(response.data);
      setLoading(false);

      onClose();
      toast.success("Profile updated successfully");

      if (selectedImage) {
        setProfileImage(URL.createObjectURL(selectedImage));
      }

      setFormChanged(false); // Reset the form changed state after submission
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Error updating user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails) {
      setEmailField(userDetails.email || "");
    }
  }, [userDetails]);

  console.log(userDetails,'dusereeeeeeeeeeeeeeeee');
  const handleModalClose = (formik) => {
    formik.resetForm(); // Reset the form when the modal is closed
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
        <div className="">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-semibold mb-3"
          >
            Edit Your Information
          </Typography>
          <Formik
            initialValues={{
                name: userDetails?.name || "",
              email: emailField,
              phone: userDetails?.phone || "",
              profileImage: userDetails?.profileImage || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, helpers) => EditProfiles(values, helpers)}
            enableReinitialize={true}
          >
            {({ setFieldValue, values, handleChange, handleBlur }) => (
              <Form encType="multipart/form-data">
                <div className="flex flex-col md:flex-row">
                  <div className="mb-4 md:mb-0 md:mr-4">
                    {selectedImage ? (
                      <Avatar
                        src={URL.createObjectURL(selectedImage)}
                        alt="avatar"
                        size="xxl"
                      />
                    ) : (
                      <Avatar
                        src={userDetails ? userDetails.profile_photo : ""}
                        alt="avatar"
                        size="xxl"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </div>
                  <div>
                    <div className="my-4"></div>
                    <label htmlFor="name">Username</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={(e) => {
                        handleChange(e);
                        setFormChanged(true);
                      }}
                      onBlur={handleBlur}
                      className="w-full md:w-96 lg:w-[900px] border rounded-md p-2"
                    />
                    <ErrorMessage name="name" component="div" />

                    <div className="my-4"></div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      disabled
                      className="w-full md:w-96 lg:w-[900px] border rounded-md p-2"
                    />
                    <ErrorMessage name="email" component="div" />

                    <div className="my-4"></div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={(e) => {
                        handleChange(e);
                        setFormChanged(true);
                      }}
                      onBlur={handleBlur}
                      className="w-full md:w-96 lg:w-[900px] border rounded-md p-2"
                    />
                    <ErrorMessage
                      name="phone"
                      className="text-red-800"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  {formChanged && (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export { UserProfileModal };
