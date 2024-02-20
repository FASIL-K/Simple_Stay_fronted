import React, { useState } from "react";
import Example from "../Layout/Navbar/UserListingNavbar";
import { HorizontalCard } from "../Layout/PropertyCard";
import axios from "axios";
import { UserUrl } from "../../../Constants/Constants";
import { Breadcrumbs, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import FilterBar from "../Layout/FilterBar";
import { Link } from "react-router-dom/dist";
import { useLocation } from "react-router-dom";

function PostList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const type = queryParams.get("type");
  console.log(city, type, "ssssssssssssssssssssssss");
  // const [post, setPost] = useState([]);
  const [postData, setPostData] = useState(null);

  const searchPost = async (keyword) => {
    if (keyword !== "") {
      try {
        const request = await axios.get(
          `${UserUrl}user/searchpost/?search=${keyword}`
        );
        const postData = request.data;
        setPostData(postData);
      } catch (error) {
        console.error("Error searching for users:", error);
        toast.error("An error occurred while searching for users.");
      }
    } else {
      // Handle case when keyword is empty
    }
  };

  return (
    <div>
      <Example searchPost={searchPost} city={city} />

      

      <div className="ml-8 mt-9">
        <Breadcrumbs>
          <Link to="/user/userhome/" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link to="/user/userhome/" className="opacity-60">
            <span>Property </span>
          </Link>
        </Breadcrumbs>
      </div>
      <div className=" -mt-14">
      
        <FilterBar postData={postData} setPostData={setPostData} />
      </div>
    </div>
  );
}

export default PostList;
