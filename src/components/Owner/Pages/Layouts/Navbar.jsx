import React, { useState } from "react";
import cover from "../../../../assets/ownercover.png";
import logo from "../../../../assets/logo.svg";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DropDown from "./Menulist";

const navItems = [
  { path: "/owner/ownerhome/", label: "Dashboard" },
  { path: "/owner/list-properties/", label: "Listing" },
  { path: "/owner/profile/", label: "Profile" },
  { path: "/owner/premium/", label: "Packages" },
  
];

function Navbar() {
  const [arrowRotation, setArrowRotation] = useState(0);

  const rotateArrow = () => {
    setArrowRotation(arrowRotation + 180);
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
      <div className="absolute flex justify-center top-14 left-2/4 transform -translate-x-1/2 -translate-y-1/2 space-x-16">
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
        <Link to="/owner/add-properties">
        <Button className="bg-green-600 hover:bg-black w-44">
          + ADD Properties
        </Button>
        </Link>
        
        
        
      </div>
    </div>
  );
}

export default Navbar;
