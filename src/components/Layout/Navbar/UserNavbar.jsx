import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
} from "@material-tailwind/react";
import logo from "../../../assets/logo.svg";
import avatar from "../../../assets/profileavatar.png";
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
          <div className="h-8 w-16 bg-white rounded-full flex justify-start m">
            <FiAlignJustify className="text-black ml-2 mt-2" />
            <img className="h-6 mt-1 ml-1" src={avatar} alt="" />
          </div>
        </button>
      </li>
    </ul>
  );

  return (
    <div className="relative">
      <Navbar className="fixed top-0 z-10 h-16 max-w-full border-0 rounded-none p-2 bg-black bg-opacity-50 lg:px-8 lg:py-4 ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-11 md:h-12 lg:h-12 xl:h-12 ml-4 md:ml-8 lg:ml-12 xl:ml-16"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden sm:inline-block"
              >
                <FaRegHeart className="h-6 w-9 mb-3" />
              </Button>
            </div>
            <div className="mr-4">{navList}</div>
          </div>
        </div>
      </Navbar>

      <div className="relative">
        <div className="max-w-screen-2xl mx-auto">
          {/* Adjust the max-width based on your design needs */}
          <img
            src={homeCover}
            alt="Cover"
            className="w-full object-cover rounded-b-10 lg:rounded-b-0 mb-0 lg:mb-0 rounded-b-3xl"
          />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center text-white">
          <Typography color="white" className="font-normal">
            <div className="flex flex-col px-1.5 pb-4 items-start">
              <header className="font-bold text-3xl">
                Properties to Rent in Calicut
              </header>
            </div>
            <SearchBar style={{ fontSize: "20px", color: "white" }} />
          </Typography>
        </div>
      </div>

      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm">
            <span>Sign in</span>
          </Button>
        </div>
      </MobileNav>
    </div>
  );
}
