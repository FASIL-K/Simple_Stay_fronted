import React, { useEffect, useState } from 'react';
import ProfileNavigation from '../Layout/ProfileNavigation.jsx/ProfileNaviagtion';
import { Card, CardBody, Avatar, Button } from '@material-tailwind/react';
import { Input } from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { Loader } from "../../Loader/Loading";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
});

function UserProfiles() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);

  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;
  const ownerId = decode.id;

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', values.name);
      form.append('email', values.email);
      form.append('phone', values.phone);

      const response = await axios.patch(
        `http://127.0.0.1:8000/owner/profileEdit/${ownerId}/`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserDetails(response.data);
      toast.success("Profile updated successfully");
      setLoading(false);

      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/owner/user-details/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setUserDetails(response.data);
        console.log(userDetails,"ssssssssssssssssssssssssss");
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchUserDetails();
    }
  }, [accessToken]);

  return (
    <div className="min-w-full">
      {loading && <Loader />}
      <div className="flex justify-center">
        <ProfileNavigation userDetails={userDetails} setUserDetails={setUserDetails} />
        <Card className="w-2/3 h-3/4 mx-4 bg-blue-gray-50 shadow-2xl mt-11">
          <CardBody className="flex items-start">
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" className="mr-4" />
            <Formik
               initialValues={{
                name: userDetails?.name || '',
                email: userDetails?.email || '',
                phone: userDetails?.phone || '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
              enableReinitialize={true}
            
            >
              {({ dirty }) => (
                <Form className="flex justify-center items-center ml-5 mt-3 flex-col">
                  <Field
                    as={Input}
                    variant="standard"
                    label="Name"
                    placeholder="Name"
                    name="name"
                    
                  />
                  <ErrorMessage name="name" component="div" className="text-red-800" />
                  <div className="mb-2"></div>

                  <label htmlFor="email" className=" text-xs opacity-50 -ml-40 ">Email</label>
                  <Field
                    as={Input}
                    variant="standard"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    disabled
                  />
                  <ErrorMessage name="email" component="div" className="text-red-800" />
                  <div className="mb-2"></div>

                  <Field
                    as={Input}
                    variant="standard"
                    label="Phone"
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-800" />
                  <div className="mb-2"></div>

                  <Button type="submit" color="blue" className="mt-4" disabled={!dirty}>
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
}

export default UserProfiles;
