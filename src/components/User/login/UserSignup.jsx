import React, { useState } from "react";
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
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues:initialValues,
      validationSchema: SignupValidationSchema,
      onSubmit: async (values) => {
        try {
          console.log(values,"jjjjjjjjjjjjjjjjjjj");
          setLoading(true)
          const response = await axios.post(
            import.meta.env.VITE_USER_URL + "/user/register/",
            values
          );

          console.log(response,"ressssddddd");
          navigate("/emailcheck");
          setLoading(True)
          toast.success(response.data.msg);
        }  catch (error) {
          setLoading(false);
        
          if (error.response && error.response.data) {
            const errorData = error.response.data;
            console.log(errorData, "fecdefcsdjcfwdhj");
            toast.error(errorData.msg || "An error occurred during registration");
          } else {
            toast.error("An error occurred during registration.");
          }
        }
      },
    });

  // const inputFieldStyle =
  // "mb-6 peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 " +
  // `${(formik.touched.email && formik.errors.email) ||
  // (formik.touched.password && formik.errors.password) ||
  // (formik.touched.confirmPassword && formik.errors.confirmPassword)
  //   ? "border-red-500"
  //   : ""}`;

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
                    label="Password"
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
