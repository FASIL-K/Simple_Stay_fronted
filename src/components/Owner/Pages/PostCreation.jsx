import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Layouts/Navbar";
import { Button, Input, Typography } from "@material-tailwind/react";
import StepperWithDots from "./Layouts/Stepper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OwnerPostCreation } from "../../../services/ownerApi";
import axios from "axios";

const validationSchemas = [
  Yup.object().shape({
    lookingTo: Yup.string().required("Looking to is required"),
    city: Yup.string().required("City is required"),
  }),
  Yup.object().shape({
    propertyType: Yup.string().required("Property Type is required"),
    furnishType: Yup.string().required("Furnish Type is required"),
    bhkType: Yup.string().required("BHK Type is required"),
    buildingName: Yup.string().required("Building/House Name is required"),
    locality: Yup.string().required("Locality is required"),
    // Add more validations for the second step as needed
  }),
  Yup.object().shape({
    build_up_area: Yup.number().required("Built up area is required"),
    rentprice: Yup.number().required("Monthly Rent is required"),
    availableFrom: Yup.date().required("Available From is required"),
    securityDeposit: Yup.string().required("Security Deposit is required"),
    // Add more validations for the third step as needed
  }),
];

function PostCreations() {
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      lookingTo: "",
      city: "",
      propertyType: "",
      furnishType: "",
      bhkType: "",
      buildingName: "",
      locality: "",
      build_up_area: "",
      rentprice: "",
      
      availableFrom: null,
      securityDeposit: "",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await axios.post(import.meta.env.VITE_OWNER_URL + 'createpost/', values);
        console.log(response,"dafadfcad")
        if (response.status === 200) {
          // Handle successful submission
          toast.success("Form submitted successfully!");
          setActiveStep(0); // Reset to the first step after submission
        } else {
          // Handle submission failure
          toast.error("Form submission failed. Please try again.");
        }
      } catch (error) {
        // Handle any errors that occurred during the submission
        console.error('Error submitting form:', error);
        toast.error("An error occurred while submitting the form. Please try again later.");
      }
    },
  });

  const handleNext = () => {
    setFormSubmitted(true);

    // Validate the current step's form
    formik.validateForm().then(() => {
      const currentValidationSchema = validationSchemas[activeStep];

      if (!formik.isValidating) {
        if (currentValidationSchema.isValidSync(formik.values)) {
          setActiveStep((prevStep) => prevStep + 1);
        } else {
          toast.error("Form is not valid. Please check your inputs.");
        }
      } else {
        console.log("Form is still validating...");
      }
    });
  };

  const handlePrev = (value) => {
    setActiveStep(value);
  };

  const renderBasicDetails = () => (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <Typography variant="h4">Add Property Basic Detail</Typography>

      <Typography variant="small" className="opacity-90 font-semibold">
        Looking to
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("lookingTo", "Rent")}
        >
          Rent
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("lookingTo", "PG/CO-living")}
        >
          PG/CO-living
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[500px]">
        <Input
          variant="standard"
          placeholder="City"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.city}
          </Typography>
        )}
      </div>

      <Button type="button" onClick={handleNext}>
        Next
      </Button>
    </form>
  );

  const renderPropertyDetails = () => (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <Typography variant="h4">Add Property Detail</Typography>

      <Typography variant="small" className="opacity-90 font-semibold">
        Property Type
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("propertyType", "Apartment")}
        >
          Apartment
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("propertyType", "Independent Floor")}
        >
          Independent Floor
        </Button>
      </div>

      <Typography variant="small" className="opacity-90 mt-3 font-semibold">
        Furnish Type
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("furnishType", "Fully Furnished")}
        >
          Fully Furnished
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("furnishType", "Semi Furnished")}
        >
          Semi Furnished
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("furnishType", "Unfurnished")}
        >
          Unfurnished
        </Button>
      </div>

      <Typography variant="small" className="opacity-90 mt-3 font-semibold">
        BHK Type
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("bhkType", "1 BHK")}
        >
          1 BHK
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("bhkType", "2 BHK")}
        >
          2 BHK
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("bhkType", "3 BHK")}
        >
          3 BHK
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[500px]">
        <Input
          variant="standard"
          placeholder="Building/House Name"
          name="buildingName"
          value={formik.values.buildingName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.buildingName && formik.errors.buildingName && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.buildingName}
          </Typography>
        )}

        <Input
          variant="standard"
          placeholder="Locality"
          name="locality"
          value={formik.values.locality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.locality && formik.errors.locality && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.locality}
          </Typography>
        )}

        <Input
          variant="standard"
          type="number"
          placeholder="Built up area sq.ft"
          name="build_up_area"
          value={formik.values.build_up_area}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.build_up_area && formik.errors.build_up_area && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.build_up_area}
          </Typography>
        )}
      </div>

      <Button type="button" onClick={handleNext}>
        Next
      </Button>
    </form>
  );

  const renderPropertyPrice = () => (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <Typography variant="h4">Add Price Detail</Typography>
      <div className="flex flex-col gap-6 w-full md:w-[500px]">
        <Input
          variant="standard"
          type="number"
          placeholder="Monthly Rent"
          name="rentprice"
          value={formik.values.rentprice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.rentprice && formik.errors.rentprice && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.rentprice}
          </Typography>
        )}

        <DatePicker
          selected={formik.values.availableFrom}
          onChange={(date) => formik.setFieldValue("availableFrom", date)}
          onBlur={formik.handleBlur}
          placeholderText="Available From"
          className="border rounded-md px-3 py-2 mt-1 mb-1 text-sm w-full"
        />
        {formik.touched.availableFrom && formik.errors.availableFrom && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.availableFrom}
          </Typography>
        )}
      </div>

      <Typography variant="small" className="opacity-90 font-semibold">
        Security Deposit
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("securityDeposit", "None")}
        >
          None
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("securityDeposit", "1 Month")}
        >
          1 Month
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("securityDeposit", "2 Month")}
        >
          2 Month
        </Button>
        <Button
          variant="gradient"
          color="white"
          className="text-light-blue-900"
          onClick={() => formik.setFieldValue("securityDeposit", "3 Month")}
        >
          3 Month
        </Button>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicDetails();

      case 1:
        return renderPropertyDetails();

      case 2:
        return renderPropertyPrice();

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <ToastContainer />

      <div className="absolute w-full max-w-screen-xl mx-auto bg-transparent border border-black border-opacity-25 md:left-0 xl:left-28 md:-mt-24 lg:-mt-24 xl:-mt-24 p-4 md:p-8 rounded-3xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 lg:w-1/4 xl:w-1/6 mb-1 md:mb-0 md:mr-4 lg:mr-8">
          <div className=" h-full w-full bg-lime-50 shadow-2xl  rounded-2xl">
            <div className="pt-3 ">
              <Typography variant="h6" className="ml-7">
                Return Dashboard
              </Typography>
              <StepperWithDots
                handleNext={handleNext}
                activeStep={activeStep}
                handlePrev={handlePrev}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-11/12 lg:w-3/4 xl:w-4/5">
          <div className="relative bg-lime-50 shadow-2xl rounded-2xl p-8">
            {renderStepContent(activeStep)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCreations;
