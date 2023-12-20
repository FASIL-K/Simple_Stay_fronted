import React, { useEffect, useState } from "react";
import Navbar from "./Layouts/Navbar";
import { Typography } from "@material-tailwind/react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { OwnerUrl } from "../../../Constants/Constants";
import { jwtDecode } from "jwt-decode";
import axios, { Axios } from "axios";

function ListPropertys() {
  const [postData, setPostData] = useState([])
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  useEffect(() => {
    const apiUrl = `${OwnerUrl}property-post/${userId}/`;
    axios.get(apiUrl)
      .then((response) => {
        console.log(response,'response sadfsasaswesc');
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);


  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <Card className="w-full max-w-[48rem] flex-row mt-4 shadow-2xl relative mb-5">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-4 w-2/5 shrink-0  rounded relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="card-image"
              className="h-full w-full object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardBody className="p-4">
            <div className="absolute flex top-14 right-3 mt-4 mr-2">
              <CheckCircleOutlineOutlinedIcon className="text-green-900" />
              <Typography
                variant="h6"
                color="green"
                className="ml-2 mt-1 cursor-pointer text-xs"
              >
                ACTIVE
              </Typography>
            </div>
            <div className="absolute top-0 right-0 h-10 w-44 flex justify-around mt-4">
              <Typography
                variant="h6"
                className="text-light-blue-900 text-base cursor-pointer"
              >
                Share
              </Typography>
              <Typography
                variant="h6"
                className="text-light-blue-900 text-base cursor-pointer"
              >
                Edit
              </Typography>
              <Typography
                variant="h6"
                className="text-red-800 text-base cursor-pointer"
              >
                Delete
              </Typography>
            </div>
            <div className="relative flex mt-20">
              <Typography variant="h4" color="blue-gray" className="mb-7">
                $20,000
              </Typography>
            </div>

            <Typography variant="h6" className="mb-2">
              2 BHK Independent House
            </Typography>
            <div className="flex justify-between">
              <Typography className="font-normal">1500 sq.ft</Typography>
              <Typography className="font-normal mb-28">
                Semi Furnished
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ListPropertys;
