import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { Avatar, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../../redux/User';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

import { EditProfile } from '../../../../services/ownerApi';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '90%',
    margin: 'auto',
    borderRadius: '8px',
  },
};

const validationSchema = Yup.object().shape({
  phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number'),
});

const UserProfileModal = ({ isOpen, onClose, userInfo }) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(userInfo.profileImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const ownerId = decode.id;
  console.log(decode,"decodddddddddddddddddd");

  useEffect(() => {
    setProfileImage(userInfo.profileImage);
  }, [userInfo.profileImage, userInfo.phone]);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFieldValue('profileImage', file);

      // Display the selected image in the avatar
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const EditProfiles = async (values, { setFieldValue }) => {
    try {
      const response = await EditProfile(ownerId, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        profileImage: values.profileImage,
      });

      dispatch(setUserDetails(response.ownerData));
      onClose();
      toast.success('Profile updated successfully');

      if (selectedImage) {
        setProfileImage(URL.createObjectURL(selectedImage));
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

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
        <Typography variant="h5" color="blue-gray" className="font-semibold mb-3">
          Edit Your Information
        </Typography>
        <Formik
          initialValues={{
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            profileImage: userInfo.profileImage,
          }}
          validationSchema={validationSchema}
          onSubmit={EditProfiles}
        >
          {({ setFieldValue, values, handleChange, handleBlur }) => (
            <Form encType="multipart/form-data">
              <div className="flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <Avatar src={profileImage} alt="avatar" size="xxl" />
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full md:w-96 lg:w-[900px] border rounded-md p-2"
                  />
                  <ErrorMessage name="phone" component="div" />
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export { UserProfileModal };