import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import logo from "../../../assets/logo.svg";
import avatar from '../../../assets/profileavatar.png'
import { FiAlignJustify } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";



import homeCover from "../../../assets/coverhome.png";
import SearchBar from "../SearchBarHome/SearchBar";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <li>
        <button>
      <div className=" h-8 w-16 bg-white rounded-full flex justify-start m" >
        <FiAlignJustify className="text-black ml-2 mt-2"/>
        <img className="h-6 mt-1 ml-1" src={avatar} alt="" />

      </div>    
      </button>   
      </li>
    </ul>
  );

  return (
    <div className="relative">
      <div
        className="absolute top-0 inset-0 z-[-1] bg-cover bg-top rounded-b-10 lg:rounded-b-0 bg-no-repeat mx-3 rounded-b-3xl "
        style={{ backgroundImage: `url(${homeCover})` }}
      ></div>
      {/* Navbar and Card container */}
      <div className="relative z-10">
        <Navbar className="sticky top-0 z-10 h-16 max-w-full border-0 rounded-none p-2 bg-black bg-opacity-50 lg:px-8 lg:py-4 ">
          <div className="flex items-center justify-between text-blue-gray-900  ">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-11 md:h-12 lg:h-12 xl:h-12 ml-4 md:ml-8 lg:ml-12 xl:ml-16" />
            </div>

            <div className="flex items-center gap-4">
              
              <div className="flex items-center  gap-x-1">
                <Button
                
                  variant="text"
                  size="sm"
                  className="hidden sm:inline-block  "
                >
                
                  <FaRegHeart className=" h-6 w-9 mb-3" />
                  
                </Button>
                
              </div>
              <div className="mr-4  ">{navList}</div>
            </div>
          </div>
        </Navbar>

        {/* Card */}
        <div className="mx-auto max-w-screen-md py-12 ">
          <Typography color="gray" className="font-normal">
            {/* ... (unchanged) */}

            <div className="flex flex-col px-1.5 pb-4 items-start">
              <header className="font-bold text-3xl text-white">
                Properties to Rent in Calicut
              </header>
            </div>
            <SearchBar />
          </Typography>
        </div>
      </div>
      {/* Mobile Nav */}
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>Sign in</span>
          </Button>
        </div>
      </MobileNav>
    </div>
  );
}
