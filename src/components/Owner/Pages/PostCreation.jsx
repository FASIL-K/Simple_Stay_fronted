import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Layouts/Navbar";
import { Button, Input, Typography } from "@material-tailwind/react";
import StepperWithDots from "./Layouts/Stepper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OwnerPostCreation } from "../../../services/ownerApi";
import axios, { Axios } from "axios";
import { jwtDecode } from "jwt-decode";
import { OwnerUrl } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import { formatISO } from "date-fns";
import { format } from "date-fns";

const validationSchemas = [
  Yup.object().shape({
    looking_to: Yup.string().required("Looking to is required"),
    city: Yup.string().required("City is required"),
  }),
  Yup.object().shape({
    property_type: Yup.string().required("Property Type is required"),
    furnished_type: Yup.string().required("Furnish Type is required"),
    bhk_type: Yup.string().required("BHK Type is required"),
    house_name: Yup.string().required("Building/House Name is required"),
    locality: Yup.string().required("Locality is required"),
    // Add more validations for the second step as needed
  }),
  Yup.object().shape({
    build_up_area: Yup.number().required("Built up area is required"),
    monthly_rent: Yup.number().required("Monthly Rent is required"),
    available_from: Yup.date().required("Available From is required"),
    security_deposit: Yup.string().required("Security Deposit is required"),
    // Add more validations for the third step as needed
  }),
];

function PostCreations() {
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedLookingTo, setSelectedLookingTo] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedFurnishedType, setSelectedFurnishedType] = useState("");
  const [selectedBhkType, setSelectedBhkType] = useState("");
  const [selectedSecurityDeposit, setSelectedSecurityDeposit] = useState("");

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      looking_to: "",
      city: "",
      property_type: "",
      furnished_type: "",
      bhk_type: "",
      house_name: "",
      locality: "",
      build_up_area: "",
      monthly_rent: "",
      available_from: "",
      security_deposit: "",
      owner: userId,
      images: [],
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      try {
        const apiUrl = `${OwnerUrl}property-post/${userId}/`;
        console.log(values, "dsadasdas");

        const formattedDate = format(
          new Date(values.available_from),
          "yyyy-MM-dd"
        );
        values.available_from = formattedDate;

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            // Handle multiple images separately
            value.forEach((image) => {
              formData.append("images", image);
            });
          } else {
            formData.append(key, value);
          }
        });
        console.log(formData,"asdfasfdasd form data");
        const response = await axios.post(apiUrl, formData);

        console.log(response, "dafadfcad");
        if (response.status === 201) {
          const data = response.data;
          console.log(data,"dataaaaaaaaaa");

          // Handle successful submission
          toast.success("Post Created successfully!");
          navigate("/owner/list-properties/");

          setActiveStep(0); // Reset to the first step after submission
        } else {
          // Handle submission failure
          toast.error("Form submission failed. Please try again.");
        }
      } catch (error) {
        // Handle any errors that occurred during the submission
        console.error("Error submitting form:", error);
        toast.error(
          "An error occurred while submitting the form. Please try again later."
        );
      }
    },
  });

  const handleImageChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      formik.setFieldValue("images", [...formik.values.images, ...files]);
    },
    [formik]
  );

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
          color={selectedLookingTo === "Rent" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedLookingTo === "Rent" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("looking_to", "Rent");
            setSelectedLookingTo("Rent");
          }}
          style={{
            backgroundColor: selectedLookingTo === "Rent" ? "#F8F8F8" : "",
            color: selectedLookingTo === "Rent" ? "white" : "black",
          }}
        >
          Rent
        </Button>
        <Button
          variant="gradient"
          color={selectedLookingTo === "PG/CO-living" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedLookingTo === "PG/CO-living" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("looking_to", "PG/CO-living");
            setSelectedLookingTo("PG/CO-living");
          }}
          style={{
            backgroundColor:
              selectedLookingTo === "PG/CO-living" ? "#F8F8F8" : "",
            color: selectedLookingTo === "PG/CO-living" ? "white" : "black",
            boxShadow:
              selectedLookingTo === "PG/CO-living"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
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
          color={selectedPropertyType === "Apartment" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedPropertyType === "Apartment" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("property_type", "Apartment");
            setSelectedPropertyType("Apartment");
          }}
          style={{
            backgroundColor:
              selectedPropertyType === "Apartment" ? "#F8F8F8" : "",
            color: selectedPropertyType === "Apartment" ? "white" : "black",
            boxShadow:
              selectedPropertyType === "Apartment"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          Apartment
        </Button>
        <Button
          variant="gradient"
          color={
            selectedPropertyType === "Independent Floor" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            selectedPropertyType === "Independent Floor" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("property_type", "Independent Floor");
            setSelectedPropertyType("Independent Floor");
          }}
          style={{
            backgroundColor:
              selectedPropertyType === "Independent Floor" ? "#F8F8F8" : "",
            color:
              selectedPropertyType === "Independent Floor" ? "white" : "black",
            boxShadow:
              selectedPropertyType === "Independent Floor"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
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
          color={
            selectedFurnishedType === "Fully Furnished" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            selectedFurnishedType === "Fully Furnished" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("furnished_type", "Fully Furnished");
            setSelectedFurnishedType("Fully Furnished");
          }}
          style={{
            backgroundColor:
              selectedFurnishedType === "Fully Furnished" ? "#F8F8F8" : "",
            color:
              selectedFurnishedType === "Fully Furnished" ? "white" : "black",
            boxShadow:
              selectedFurnishedType === "Fully Furnished"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          Fully Furnished
        </Button>
        <Button
          variant="gradient"
          color={
            selectedFurnishedType === "Semi Furnished" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            selectedFurnishedType === "Semi Furnished" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("furnished_type", "Semi Furnished");
            setSelectedFurnishedType("Semi Furnished");
          }}
          style={{
            backgroundColor:
              selectedFurnishedType === "Semi Furnished" ? "#F8F8F8" : "",
            color:
              selectedFurnishedType === "Semi Furnished" ? "white" : "black",
            boxShadow:
              selectedFurnishedType === "Semi Furnished"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          Semi Furnished
        </Button>

        <Button
          variant="gradient"
          color={
            selectedFurnishedType === "Unfurnished" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            selectedFurnishedType === "Unfurnished" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("furnished_type", "SUnfurnished");
            setSelectedFurnishedType("Unfurnished");
          }}
          style={{
            backgroundColor:
              selectedFurnishedType === "Unfurnished" ? "#F8F8F8" : "",
            color: selectedFurnishedType === "Unfurnished" ? "white" : "black",
            boxShadow:
              selectedFurnishedType === "Unfurnished"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
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
          color={selectedBhkType === "1 BHK" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedBhkType === "1 BHK" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("bhk_type", "1 BHK");
            setSelectedBhkType("1 BHK");
          }}
          style={{
            backgroundColor: selectedBhkType === "1 BHK" ? "#F8F8F8" : "",
            color: selectedBhkType === "1 BHK" ? "white" : "black",
            boxShadow:
              selectedBhkType === "1 BHK" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "",
          }}
        >
          1 BHK
        </Button>
        <Button
          variant="gradient"
          color={selectedBhkType === "2 BHK" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedBhkType === "2 BHK" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("bhk_type", "2 BHK");
            setSelectedBhkType("2 BHK");
          }}
          style={{
            backgroundColor: selectedBhkType === "2 BHK" ? "#F8F8F8" : "",
            color: selectedBhkType === "2 BHK" ? "white" : "black",
            boxShadow:
              selectedBhkType === "2 BHK" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "",
          }}
        >
          2 BHK
        </Button>
        <Button
          variant="gradient"
          color={selectedBhkType === "3 BHK" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedBhkType === "3 BHK" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("bhk_type", "3 BHK");
            setSelectedBhkType("3 BHK");
          }}
          style={{
            backgroundColor: selectedBhkType === "3 BHK" ? "#F8F8F8" : "",
            color: selectedBhkType === "3 BHK" ? "white" : "black",
            boxShadow:
              selectedBhkType === "3 BHK" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "",
          }}
        >
          3 BHK
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[500px]">
        <Input
          variant="standard"
          placeholder="Building/House Name"
          name="house_name"
          value={formik.values.house_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.house_name && formik.errors.house_name && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.house_name}
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
          name="monthly_rent"
          value={formik.values.monthly_rent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.monthly_rent && formik.errors.monthly_rent && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.monthly_rent}
          </Typography>
        )}

        <DatePicker
          selected={formik.values.available_from}
          onChange={(date) => formik.setFieldValue("available_from", date)}
          onBlur={formik.handleBlur}
          placeholderText="Available From"
          className="border rounded-md px-3 py-2 mt-1 mb-1 text-sm w-full"
        />
        {formik.touched.available_from && formik.errors.available_from && (
          <Typography variant="small" className="text-red-500">
            {formik.errors.available_from}
          </Typography>
        )}
      </div>

      <Typography variant="small" className="opacity-90 font-semibold">
        Security Deposit
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color={selectedSecurityDeposit === "None" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedSecurityDeposit === "None" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "None");
            setSelectedSecurityDeposit("None");
          }}
          style={{
            backgroundColor:
              selectedSecurityDeposit === "None" ? "#F8F8F8" : "",
            color: selectedSecurityDeposit === "None" ? "white" : "black",
            boxShadow:
              selectedSecurityDeposit === "None"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          None
        </Button>
        <Button
          variant="gradient"
          color={selectedSecurityDeposit === "1 Month" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedSecurityDeposit === "1 Month" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "1 Month");
            setSelectedSecurityDeposit("1 Month");
          }}
          style={{
            backgroundColor:
              selectedSecurityDeposit === "1 Month" ? "#F8F8F8" : "",
            color: selectedSecurityDeposit === "1 Month" ? "white" : "black",
            boxShadow:
              selectedSecurityDeposit === "1 Month"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          1 Month
        </Button>
        <Button
          variant="gradient"
          color={selectedSecurityDeposit === "2 Month" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedSecurityDeposit === "2 Month" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "2 Month");
            setSelectedSecurityDeposit("2 Month");
          }}
          style={{
            backgroundColor:
              selectedSecurityDeposit === "2 Month" ? "#F8F8F8" : "",
            color: selectedSecurityDeposit === "2 Month" ? "white" : "black",
            boxShadow:
              selectedSecurityDeposit === "2 Month"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          2 Month
        </Button>
        <Button
          variant="gradient"
          color={selectedSecurityDeposit === "3 Month" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            selectedSecurityDeposit === "3 Month" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "3 Month");
            setSelectedSecurityDeposit("3 Month");
          }}
          style={{
            backgroundColor:
              selectedSecurityDeposit === "3 Month" ? "#F8F8F8" : "",
            color: selectedSecurityDeposit === "3 Month" ? "white" : "black",
            boxShadow:
              selectedSecurityDeposit === "3 Month"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          3 Month
        </Button>
      </div>
      <Button type="button" onClick={handleNext}>
        Next
      </Button>
      <Button type="submit">Submit</Button>
    </form>
  );

  const renderImageUplode = () => (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Typography variant="h4">Upload Images</Typography>

        <div className="flex flex-col gap-6 w-full md:w-[500px]">
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />

          {/* Display the selected images */}
          {formik.values.images.length > 0 &&
            formik.values.images.map((image, index) => (
              <div key={index}>
                <Typography variant="small">{image.name}</Typography>
              </div>
            ))}
        </div>

        <Button type="button" onClick={() => handlePrev(2)}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicDetails();

      case 1:
        return renderPropertyDetails();

      case 2:
        return renderPropertyPrice();

      case 3:
        return renderImageUplode();

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
