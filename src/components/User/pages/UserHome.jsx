import React from "react";
import TemporaryDrawer from "../../User/Layout/SidebarHome/SideBar";
import { Typography } from "@material-tailwind/react";
import findImage from "../../../assets/findEasy.png"; // Import the image file
import stayImage from "../../../assets/stay-easy.png";

function UserHome() {
  return (
    <div>
      <TemporaryDrawer />
      <>
        <div className="mt-28">
          {/* First Row */}
          <div className="flex w-auto h-screen">
            <div className=" h-4/6 w-screen flex">
              <div className="w-1/2 h-full bg flex items-center justify-center relative overflow-hidden">
                <div className="w-5/6 h-5/6 bg-red-200 rounded-2xl relative overflow-hidden ">
                  <div className="p-8">
                    <Typography
                      color="gray"
                      variant="h6"
                      style={{ fontSize: "4rem" }}
                      className="text-gray-900 font-thin text-start mt-6"
                    >
                      FIND
                    </Typography>
                    <Typography
                      color="gray"
                      style={{ fontSize: "2rem" }}
                      className="text-gray-900 font-bold text-start -mt-8"
                    >
                      EASY
                    </Typography>
                  </div>
                  {/* Image inside red div */}
                </div>
                {/* Image inside orange div */}
                <div className="absolute top-36 right-0 w-1/2 h-full bg-no-repeat bg-cover">
                  <img src={findImage} alt="" />
                </div>
              </div>

              <div className="w-1/2  flex justify-center  ">
                <div className="w-3/4 h-full  flex flex-col  overflow-hidden">
                  <div className=" w-full h-28 mt-10 flex justify-center items-center ">
                    <Typography className="text-2xl">
                      Easy on the pocket,
                      <span className="text-cyan-500"> Easy on the mind.</span>
                    </Typography>
                  </div>
                  <div className=" w-full h-28  flex justify-evenly items-center ">
                    <div className="">
                      <Typography>Fully Furnished</Typography>
                      <Typography>Homes</Typography> {/* New line */}{" "}
                    </div>
                    <div className="">
                      <Typography>Loaded </Typography>
                      <Typography>Amenities</Typography>
                    </div>
                    <div className="">
                      <Typography>App Based</Typography>
                      <Typography>Search</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex w-auto h-screen">
            <div className="bg-black w-auto h-screen"></div>
            <div className=" h-4/6 w-screen flex">
              <div className="w-1/2  flex justify-center  ">
                <div className="w-3/4 h-full  flex flex-col  overflow-hidden">
                  <div className=" w-full h-28 mt-10 flex justify-center items-center ">
                    <Typography className="text-xl ">
                      Perfect for working,
                      <span className="text-cyan-500">
                        More so for unwinding after.
                      </span>
                    </Typography>
                  </div>
                  <div className=" w-full h-28  flex justify-evenly items-center ">
                    <div className="">
                      <Typography>24x7</Typography>
                      <Typography>Assistance  </Typography> {/* New line */}{" "}
                    </div>
                    <div className="">
                      <Typography>App Based Issue </Typography>
                      <Typography>Resolutio</Typography>
                    </div>
                    <div className="">
                      <Typography>Thoughtful</Typography>
                      <Typography>Facilities</Typography>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="w-1/2 h-full flex items-center justify-center relative overflow-hidden">
                <div className="w-5/6 h-5/6 bg-red-200 rounded-2xl relative overflow-hidden">
                  <div className="p-8">
                    <Typography
                      color="gray"
                      variant="h6"
                      style={{ fontSize: "4rem" }}
                      className="text-gray-900 font-thin text-start mt-6"
                    >
                      STAY
                    </Typography>
                    <Typography
                      color="gray"
                      style={{ fontSize: "2rem" }}
                      className="text-gray-900 font-bold text-start -mt-8"
                    >
                      EASY
                    </Typography>
                  </div>
                  {/* Image inside red div */}
                </div>
                {/* Image inside orange div */}
                <div className="absolute top-36  right-0 w-1/2 h-full bg-no-repeat bg-cover">
                  <img src={stayImage} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="flex w-auto h-screen">
            <div className=" h-4/6 w-screen flex">
              <div className="w-1/2 h-full flex items-center justify-center relative overflow-hidden">
                <div className="w-5/6 h-5/6 bg-red-200 rounded-2xl relative overflow-hidden">
                  <div className="p-8">
                    <Typography
                      color="gray"
                      variant="h6"
                      style={{ fontSize: "4rem" }}
                      className="text-gray-900 font-thin text-start mt-6"
                    >
                      FIND
                    </Typography>
                    <Typography
                      color="gray"
                      style={{ fontSize: "2rem" }}
                      className="text-gray-900 font-bold text-start -mt-8"
                    >
                      EASY
                    </Typography>
                  </div>
                  {/* Image inside red div */}
                </div>
                {/* Image inside orange div */}
                <div className="absolute top-36  right-0 w-1/2 h-full bg-no-repeat bg-cover">
                  <img src={findImage} alt="" />
                </div>
              </div>
              <div className="w-1/2  flex justify-center  ">
                <div className="w-3/4 h-full  flex flex-col  overflow-hidden">
                  <div className=" w-full h-28 mt-10 flex justify-center items-center ">
                    <Typography className="text-2xl">
                      Join &
                      <span className="text-cyan-500">
                        {" "}
                        vibe with a vibrant colourful community.{" "}
                      </span>
                    </Typography>
                  </div>
                  <div className=" w-full h-28  flex justify-evenly items-center ">
                    <div className="">
                      <Typography>Fully Furnished</Typography>
                      <Typography>Homes</Typography> {/* New line */}{" "}
                    </div>
                    <div className="">
                      <Typography>Loaded </Typography>
                      <Typography>Amenities</Typography>
                    </div>
                    <div className="">
                      <Typography>App Based</Typography>
                      <Typography>Search</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default UserHome;
