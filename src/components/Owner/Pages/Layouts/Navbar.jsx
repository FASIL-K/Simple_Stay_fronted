import React, { useEffect, useState } from "react";
import cover from "../../../../assets/ownercover.png";
import logo from "../../../../assets/logo.svg";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DropDown from "./Menulist";
import { jwtDecode } from "jwt-decode";
import { PropertyListing } from "../../../../services/ownerApi";

const navItems = [
  { path: "/owner/ownerhome/", label: "Dashboard" },
  { path: "/owner/list-properties/", label: "Listing" },
  { path: "/owner/profile/", label: "Profile" },
  { path: "/owner/premium/", label: "Packages" },
];

function Navbar() {
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.user_id;
  const isPremium = decode.is_premium; // Assuming you have a field indicating premium status

  const DataListing = async () => {
    try {
      const response = await PropertyListing(userId);
      console.log(response, "dsadsadas");
      setPostData(response.data);
      console.log(postData, "posttttttttttttttttttttdsaaaaaaaaadsa");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    DataListing();
  }, []);
  useEffect(() => {
    console.log(postData, "posttttttttttttttttttttdsaaaaaaaaadsa");
  }, [postData]);


  const canAddPost = () => {
    if (isPremium) {
      // Premium user can add posts without any limit
      return true;
    } else {
      // Check if the user has created less than 3 posts
      return postData && postData.length < 1;
    }
  };

  return (
    <div className="relative mx-auto overflow-hidden">
      <img
        src={cover}
        alt="Cover"
        className="w-full object-cover h-[230px] rounded-b-10 lg:rounded-b-0 mb-0 lg:mb-0 rounded-b-3xl"
      />
      <div className="absolute top-0 left-10 p-4 flex flex-col items-center">
        <img className="w-40" src={logo} alt="" />
        <Typography className="text-white text-sm -mt-2 mr-7 font-sans opacity-80 font-semibold">
          Owner
        </Typography>
      </div>
      <div className="absolute flex  lg:flex-row justify-center top-14 left-0 lg:left-1/4 transform lg:translate-x(-50) space-y-4 lg:space-y-0 lg:space-x-16 lg:items-center">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-white text-xl font-sans opacity-60 hover:opacity-100 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
        <DropDown />
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {canAddPost() ? (
            <Link to="/owner/add-properties">
              <Button className="bg-green-600 hover:bg-black lg:w-auto">
                + ADD Properties
              </Button>
            </Link>
          ) : (
            <Link to="/owner/premium/">
              <Button className="bg-yellow-500 hover:bg-yellow-400 lg:w-auto">
                Upgrade to Premium
              </Button>
            </Link>
          )}
          <Link to="/owner/chat/">
            <Button className="bg-blue-gray-500 hover:bg-yellow-400 lg:w-auto">
              Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
