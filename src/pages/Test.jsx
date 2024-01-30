// import React, { useState } from "react";
// import MapComponent from "./User/MapComponet";
// import * as Yup from "yup";
// import { useFormik } from "formik";

// const LocationPage = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const validationSchema = Yup.object().shape({
//     latitude: Yup.number().required("Latitude is required"),
//     longitude: Yup.number().required("Longitude is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       latitude: "",
//       longitude: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       console.log("Form submitted with values:", values);
//     },
//   });

//   const handleLocationSelect = (location) => {
//     setSelectedLocation(location);
//     formik.setFieldValue("latitude", location.lat);
//     formik.setFieldValue("longitude", location.lng);
//   };

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <h1 className="text-2xl font-bold mb-4">Location Selection Page</h1>

//       <div className="flex gap-4">
//         <div className="w-1/2">
//           {selectedLocation && (
//             <div className="mt-2">
//               <p>Selected Location:</p>
//               <p>Latitude: {selectedLocation.lat}</p>
//               <p>Longitude: {selectedLocation.lng}</p>
//             </div>
//           )}
//         </div>

//         <form onSubmit={formik.handleSubmit} className="w-1/2">
//           <div className="mb-4">
//             <label htmlFor="latitude" className="block text-sm font-medium text-gray-600">
//               Latitude
//             </label>
//             <input
//               type="number"
//               id="latitude"
//               name="latitude"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.latitude}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             />
//             {formik.touched.latitude && formik.errors.latitude && (
//               <p className="text-red-500 text-sm">{formik.errors.latitude}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="longitude" className="block text-sm font-medium text-gray-600">
//               Longitude
//             </label>
//             <input
//               type="number"
//               id="longitude"
//               name="longitude"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.longitude}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             />
//             {formik.touched.longitude && formik.errors.longitude && (
//               <p className="text-red-500 text-sm">{formik.errors.longitude}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//                 <MapComponent onLocationSelect={handleLocationSelect} />

//     </div>
//   );
// };

// export default LocationPage;
