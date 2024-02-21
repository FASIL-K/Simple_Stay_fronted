import React, { useState, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Layouts/Navbar";
import { Button, Input, Typography } from "@material-tailwind/react";
import StepperWithDots from "./Layouts/Stepper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EditProperty,
  OwnerPostCreation,
  PropertyEdit, 
} from "../../../services/ownerApi";
import axios, { Axios } from "axios";
import { jwtDecode } from "jwt-decode";
import { OwnerUrl } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import { formatISO } from "date-fns";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import Select from "react-select";
import DialogCustomAnimation from "./Layouts/AminitisModal";
import ScrollDialog from "./Layouts/AminitisModal";
import Map from "../../../pages/Test";

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


function PropertyForm({ isEditing, initialValues }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  console.log(selectedAmenities, "dasddddddddddddddddddddddd");
  const handleAmenitiesSelect = (selectedAmenities) => {
    const amenityNames = selectedAmenities.map((amenity) => amenity.name);
    console.log("Selected Amenity Names:", amenityNames);

    setSelectedAmenities(selectedAmenities);
    // Do something with the selected amenities data, e.g., store it in the component state
    console.log("Selected Amenitiessdasdasdasda:", selectedAmenities);
  };
  const navigate = useNavigate();
  const { propertyId } = useParams();
  console.log(propertyId, "sadasdcassad");
  console.log(isEditing, "isededasd");
  const [cityNames, setCityNames] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedLookingTo, setSelectedLookingTo] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedFurnishedType, setSelectedFurnishedType] = useState("");
  const [selectedBhkType, setSelectedBhkType] = useState("");
  const [selectedSecurityDeposit, setSelectedSecurityDeposit] = useState("");

  const [existingPostData, setExistingPostData] = useState(null);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [images, setImages] = useState([]);
  const [showAdditionalComponent, setShowAdditionalComponent] = useState(false);
  const [showAddLocationButton, setShowAddLocationButton] = useState(true);
  const [markerLocation, setMarkerLocation] = useState(null);


  const handleMarkerChange = (newPosition) => {
    setMarkerLocation(newPosition);
    console.log(markerLocation,"markeddddddddddddddddddddddddddlocationnnnnnnnnnnnnnn");
    // You can perform any additional logic here based on the new marker location
  };
  const lat = markerLocation?.lat;
  const long = markerLocation?.lng;
  console.log(markerLocation,lat,long,"lattttttttttttttttlonddgggggggggggggggggg");
  const handleAddLocationClick = () => {
    setShowAdditionalComponent(true);
    setShowAddLocationButton(false); // Hide the "Add Location" button
  };

  const handleDeleteImage = (imageId) => {
    setImages(images.filter((id) => id !== imageId));
  };
  useEffect(() => {
    const fetchCityNames = async () => {
      try {
        const geonamesUsername = "Fasil";
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?country=IN&maxRows=1000&username=${geonamesUsername}`
        );

        // Extract city names from the response
        const cities = response.data.geonames.map((city) => city.name);
        setCityNames(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCityNames();
  }, []);
  useEffect(() => {
    const fetchPostData = async () => {
      if (propertyId) {
        try {
          const response = await PropertyEdit(userId, propertyId);
          // const response = await axios.get(
          //   `${OwnerUrl}property-post/${userId}/${propertyId}/`
          // );
          const postData = response.data; // Assuming your API response has the post data structure
          console.log(postData, "postdateasssssssssss");
          // Parse the date received from the backend and set it in the correct format
          console.log(postData.available_from, "before date");
          const existingAvailableFromDate = format(
            new Date(postData.available_from),
            "MM-dd-yyyy"
          );
          console.log(existingAvailableFromDate, "new date");
          const parsedDate = existingAvailableFromDate;

          // Set the parsed date in the correct format
          postData.available_from = parsedDate;

          setExistingPostData(postData);
          console.log(
            existingPostData,
            "fadfasdcasacaswxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          );
        } catch (error) {
          console.error("Error fetching existing post data:", error);
        }
      }
    };

    fetchPostData();
  }, [propertyId, userId]);

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
      is_available: true,
      owner: userId,
      images: [],
      ...(initialValues || {}),
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      try {
        const formattedDate = format(
          new Date(values.available_from),
          "yyyy-MM-dd"
        );
        values.available_from = formattedDate;
        console.log("Form Data:", values); // Add this line to log the form data
        const amenityNames = selectedAmenities.map((amenity) => amenity.name);

        const formData = new FormData();
        formData.append("amenities", amenityNames);
        formData.append("lat", lat);
        formData.append("long", long);

        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            // Handle multiple images separately
            value.forEach((image) => {
              formData.append("image", image);
            });
          } else {
            formData.append(key, value);
          }
        });

        console.log("Form Data:");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        console.log(formData, "asdfasfdasd form data");
        const apiUrl = isEditing
          ? EditProperty(userId, propertyId, formData) // Pass values to EditProperty
          : OwnerPostCreation(userId, formData);

        console.log(apiUrl, "Constructed API URL");
        const response = isEditing
          ? await apiUrl // apiUrl is already a function
          : await apiUrl;
        console.log(response, "Response from API");

        console.log(response, "anzil");

        if (response.status === (isEditing ? 200 : 201)) {
          const data = response.data;
          console.log(data, "dataaaaaaaaaa");

          // Handle successful submission
          toast.success(
            `Property ${isEditing ? "updated" : "created"} successfully!`
          );
          navigate("/owner/list-properties/");

          setActiveStep(0); // Reset to the first step after submission
        } else {
          // Handle submission failure
          toast.error(
            `Property ${
              isEditing ? "update" : "creation"
            } failed. Please try again.`
          );
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


  const getGeocode = async (cityName) => {
    try {
      // Make a request to Google Maps Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=`
      );
        console.log(response,'resssssssssssssssssssssssssssssspoooooooooooo');
      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }
  
      const data = await response.json();
  
      // Check if the response contains results
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('No results found for the given city');
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  const handleCityChange = async (selectedCity) => {
    try {
      const coordinates = await getGeocode(selectedCity);
  
      // Make a request to Google Maps Geocoding API to get additional information
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
  
      if (!response.ok) {
        throw new Error('Additional Geocoding request failed');
      }
  
      const data = await response.json();
  
      // Extract landmarks and localities from the response
      const landmarks = data.results
        .filter((result) => result.types.includes('point_of_interest'))
        .map((result) => result.formatted_address);
  
      const localities = data.results
        .filter((result) => result.types.includes('locality'))
        .map((result) => result.formatted_address);
  
      // Display the information in your form or handle it as needed
      console.log('Landmarks:', landmarks);
      console.log('Localities:', localities);
    } catch (error) {
      console.error('Error during additional geocoding:', error);
      // Handle error appropriately (e.g., show a message to the user)
    }
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
          color={formik.values.looking_to === "Rent" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            formik.values.looking_to === "Rent" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("looking_to", "Rent");
            setSelectedLookingTo("Rent");
          }}
          style={{
            backgroundColor:
              formik.values.looking_to === "Rent" ? "#F8F8F8" : "",
            color: formik.values.looking_to === "Rent" ? "white" : "black",
          }}
        >
          Rent
        </Button>
        <Button
          variant="gradient"
          color={
            formik.values.looking_to === "PG/CO-living" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.looking_to === "PG/CO-living" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("looking_to", "PG/CO-living");
            setSelectedLookingTo("PG/CO-living");
          }}
          style={{
            backgroundColor:
              formik.values.looking_to === "PG/CO-living" ? "#F8F8F8" : "",
            color:
              formik.values.looking_to === "PG/CO-living" ? "white" : "black",
            boxShadow:
              formik.values.looking_to === "PG/CO-living"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          PG/CO-living
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[500px]">
      <Select
        placeholder="Select City"
        options={cityNames.map((city) => ({ label: city, value: city }))}
        value={
          formik.values.city
            ? { label: formik.values.city, value: formik.values.city }
            : null
        }
        onChange={async (selectedOption) => {
          await formik.setFieldValue("city", selectedOption?.value || "");
          await handleCityChange(selectedOption?.value || "");
        }}
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
          color={
            formik.values.property_type === "Apartment" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.property_type === "Apartment" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("property_type", "Apartment");
            setSelectedPropertyType("Apartment");
          }}
          style={{
            backgroundColor:
              formik.values.property_type === "Rent" ? "#F8F8F8" : "",
            color:
              formik.values.property_type === "Apartment" ? "white" : "black",
          }}
        >
          Apartment
        </Button>
        <Button
          variant="gradient"
          color={
            formik.values.property_type === "Independent Floor"
              ? "blue-gray"
              : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.property_type === "Independent Floor"
              ? "selectedStyle"
              : ""
          }`}
          onClick={() => {
            formik.setFieldValue("property_type", "Independent Floor");
            setSelectedPropertyType("Independent Floor");
          }}
          style={{
            backgroundColor:
              formik.values.property_type === "Independent Floor"
                ? "#F8F8F8"
                : "",
            color:
              formik.values.property_type === "Independent Floor"
                ? "white"
                : "black",
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
            formik.values.furnished_type === "Fully Furnished"
              ? "blue-gray"
              : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.furnished_type === "Fully Furnished"
              ? "selectedStyle"
              : ""
          }`}
          onClick={() => {
            formik.setFieldValue("furnished_type", "Fully Furnished");
            setSelectedFurnishedType("Fully Furnished");
          }}
          style={{
            backgroundColor:
              formik.values.furnished_type === "Fully Furnished"
                ? "#F8F8F8"
                : "",
            color:
              formik.values.furnished_type === "Fully Furnished"
                ? "white"
                : "black",
            boxShadow:
              formik.values.furnished_type === "Fully Furnished"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          Fully Furnished
        </Button>
        <Button
          variant="gradient"
          color={
            formik.values.furnished_type === "Semi Furnished"
              ? "blue-gray"
              : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.furnished_type === "Semi Furnished"
              ? "selectedStyle"
              : ""
          }`}
          onClick={() => {
            formik.setFieldValue("furnished_type", "Semi Furnished");
            setSelectedFurnishedType("Semi Furnished");
          }}
          style={{
            backgroundColor:
              formik.values.furnished_type === "Semi Furnished"
                ? "#F8F8F8"
                : "",
            color:
              formik.values.furnished_type === "Semi Furnished"
                ? "white"
                : "black",
            boxShadow:
              formik.values.furnished_type === "Semi Furnished"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          Semi Furnished
        </Button>

        <Button
          variant="gradient"
          color={
            formik.values.furnished_type === "Unfurnished"
              ? "blue-gray"
              : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.furnished_type === "Unfurnished"
              ? "selectedStyle"
              : ""
          }`}
          onClick={() => {
            formik.setFieldValue("furnished_type", "Unfurnished");
            setSelectedFurnishedType("Unfurnished");
          }}
          style={{
            backgroundColor:
              formik.values.furnished_type === "Unfurnished" ? "#F8F8F8" : "",
            color:
              formik.values.furnished_type === "Unfurnished"
                ? "white"
                : "black",
            boxShadow:
              formik.values.furnished_type === "Unfurnished"
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
          color={formik.values.bhk_type === "1 BHK" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            formik.values.bhk_type === "1 BHK" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("bhk_type", "1 BHK");
            setSelectedBhkType("1 BHK");
          }}
          style={{
            backgroundColor:
              formik.values.bhk_type === "1 BHK" ? "#F8F8F8" : "",
            color: formik.values.bhk_type === "1 BHK" ? "white" : "black",
            boxShadow:
              formik.values.bhk_type === "1 BHK"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          1 BHK
        </Button>
        <Button
          variant="gradient"
          color={formik.values.bhk_type === "2 BHK" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            formik.values.bhk_type === "2 BHK" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("bhk_type", "2 BHK");
            setSelectedBhkType("2 BHK");
          }}
          style={{
            backgroundColor:
              formik.values.bhk_type === "2 BHK" ? "#F8F8F8" : "",
            color: formik.values.bhk_type === "2 BHK" ? "white" : "black",
            boxShadow:
              formik.values.bhk_type === "2 BHK"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          2 BHK
        </Button>
        <Button
          variant="gradient"
          color={formik.values.bhk_type === "3 BHK" ? "blue-gray" : "white"}
          className={`text-light-blue-900 ${
            formik.values.bhk_type === "3 BHK" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("bhk_type", "3 BHK");
            setSelectedBhkType("3 BHK");
          }}
          style={{
            backgroundColor:
              formik.values.bhk_type === "3 BHK" ? "#F8F8F8" : "",
            color: formik.values.bhk_type === "3 BHK" ? "white" : "black",
            boxShadow:
              formik.values.bhk_type === "3 BHK"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          3 BHK
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[500px]">
        <Typography variant="small" className="opacity-90 mt-3 font-semibold">
          Building/House Name
        </Typography>
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

        <Typography variant="small" className="opacity-90 mt-3 font-semibold">
          Locality
        </Typography>
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
        <Typography variant="small" className="opacity-90 mt-3 font-semibold">
          Built up area
        </Typography>
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

      <div className="flex flex-col justify-start items-start">
        <ScrollDialog onAmenitiesSelect={handleAmenitiesSelect} />
        {showAddLocationButton && (
          <Button
            type="button"
            className="mt-3"
            onClick={handleAddLocationClick}
          >
            Add Location
          </Button>
        )}
        {showAdditionalComponent && <Map onMarkerChange={handleMarkerChange} />}
        <Button type="button" className="mt-3" onClick={handleNext}>
          Next
        </Button>
      </div>
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
        {isEditing && formik.values.available_from ? (
          <div className="mt-2">
            <Typography variant="small" className="opacity font-semibold">
              Available From
            </Typography>
            <div className="mt-1">
              {format(new Date(formik.values.available_from), "MM/dd/yyyy")}
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <Typography variant="small" className="opacity-90 font-semibold">
              Available From
            </Typography>
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
        )}
      </div>

      <Typography variant="small" className="opacity-90 font-semibold">
        Security Deposit
      </Typography>
      <div className="mt-2 space-x-9">
        <Button
          variant="gradient"
          color={
            formik.values.security_deposit === "None" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.security_deposit === "None" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "None");
            setSelectedSecurityDeposit("None");
          }}
          style={{
            backgroundColor:
              formik.values.security_deposit === "None" ? "#F8F8F8" : "",
            color:
              formik.values.security_deposit === "None" ? "white" : "black",
            boxShadow:
              formik.values.security_deposit === "None"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          None
        </Button>
        <Button
          variant="gradient"
          color={
            formik.values.security_deposit === "1 Month" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.security_deposit === "1 Month" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "1 Month");
            setSelectedSecurityDeposit("1 Month");
          }}
          style={{
            backgroundColor:
              formik.values.security_deposit === "1 Month" ? "#F8F8F8" : "",
            color:
              formik.values.security_deposit === "1 Month" ? "white" : "black",
            boxShadow:
              formik.values.security_deposit === "1 Month"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          1 Month
        </Button>
        <Button
          variant="gradient"
          color={
            formik.values.security_deposit === "2 Month" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.security_deposit === "2 Month" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "2 Month");
            setSelectedSecurityDeposit("2 Month");
          }}
          style={{
            backgroundColor:
              formik.values.security_deposit === "2 Month" ? "#F8F8F8" : "",
            color:
              formik.values.security_deposit === "2 Month" ? "white" : "black",
            boxShadow:
              formik.values.security_deposit === "2 Month"
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "",
          }}
        >
          2 Month
        </Button>
        <Button
          variant="gradient"
          color={
            formik.values.security_deposit === "3 Month" ? "blue-gray" : "white"
          }
          className={`text-light-blue-900 ${
            formik.values.security_deposit === "3 Month" ? "selectedStyle" : ""
          }`}
          onClick={() => {
            formik.setFieldValue("security_deposit", "3 Month");
            setSelectedSecurityDeposit("3 Month");
          }}
          style={{
            backgroundColor:
              formik.values.security_deposit === "3 Month" ? "#F8F8F8" : "",
            color:
              formik.values.security_deposit === "3 Month" ? "white" : "black",
            boxShadow:
              formik.values.security_deposit === "3 Month"
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
    </form>
  );

  const renderImageUplode = () => (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-6 ">
        <Typography variant="h4">Upload Images</Typography>

        <div className="flex flex-col gap-6 w-full md:w-[500px]">
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
      {isEditing && existingPostData && (
        <div>
          <Typography variant="h4">Existing Images</Typography>
          <div className="flex flex-wrap gap-4 mt-4">
            {existingPostData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`${import.meta.env.VITE_USER_URL}${image.image}`}
                  alt={`Image ${index}`}
                  className="h-[100px] w-[100px] object-cover rounded-t-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
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

export default PropertyForm;
