import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logoImage from "../../../assets/main-logo.svg";
import { Loader } from "../../Loader/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignupValidationSchema } from "../../FormValidation/SignupValidation";
import "./UserSignup.css";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

function UserSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [email, setEmail] = useState(""); 
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post('https://simplestayback.molla.cloud/user/register/', values);
        setEmail(values.email);
        setLoading(false);
        toast.success(response.data.msg);
        navigate('/emailcheck', { state: { email: values.email } }); // Pass email as a parameter
      } catch (error) {
        setLoading(false);

        if (error.response && error.response.data) {
          const errorData = error.response.data;
          console.log(errorData, 'fecdefcsdjcfwdhj');
          toast.error(errorData.msg || 'An error occurred during registration');
        } else {
          toast.error('An error occurred during registration.');
        }
      }
    },
  });

  // Log the updated value of email when it changes
  useEffect(() => {
    console.log(email, 'dasxxxxxc');
  }, [email]);




  const backgroundStyle = {
    backgroundImage: `url()`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div className="bg-cover bg-center  flex justify-center items-center container mx-auto w-screen" style={backgroundStyle}>
      {loading && <Loader />}

      <div className=" ">
        <div className="">
          <Card className="shadow-2xl shadow-black  rounded-md w-96 sm:w-[28rem]">
          <img src={logoImage} alt="Logo" className="mx-auto " />
            <div className="m-6 flex flex-col  justify-center items-center ">
              <Typography
                variant="h4"
                color="black"
                className="text-center mb-4 md:mb-8"
              >
                USER SIGN UP
              </Typography>
              <ToastContainer />

              <form className="" onSubmit={handleSubmit}>
                <div className="mb-3 w-80 sm:w-96">
                  <Input
                    label="Email"
                    variant="standard"
                    name="email"
                    color="black"
                    className=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                      <div className="text-red-500 text-xs ">{errors.email}</div>
                    )}
                </div>

                <div className="mb-3 w-80 sm:w-96">
                  <Input
                    type="password"
                    variant="standard"
                    name="password"
                    label="Password"
                    color="black"
                    className="bg-[#1572a9b6]"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                      <div className="text-red-500 text-xs ">{errors.password}</div>
                    )}
                </div>
                <div className="mb-3 w-80 sm:w-96">
                  <Input
                    type="password"
                    variant="standard"
                    name="confirmPassword"
                    label="ConfirmPassword"
                    color="black"
                    className="bg-[#1572a9b6]"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                      <div className="text-red-500 text-xs ">{errors.confirmPassword}</div>
                    )}
                </div>
                <div className="flex items-start justify-between">
                  <Button
                    className="mt-4 w-full"
                    variant="filled"
                    type="submit"
                    color="blue"
                  >
                    Sign up
                  </Button>
                </div>
                <Typography
                  color="black"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account ?{"  "}
                  <Link to={"/login"} className="font-medium text-gray-900">
                    Login
                  </Link>
                </Typography>
              
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
