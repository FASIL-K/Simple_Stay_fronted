// PostCreations.js

import React, { useState } from "react";
import Navbar from "./Layouts/Navbar";
import { Button, Input, Typography } from "@material-tailwind/react";
import StepperWithDots from "./Layouts/Stepper";

function PostCreations() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handlePrev = () => {
    setActiveStep((activeStep) => activeStep-1);
  };

  const renderPropertyDetails = () => (
    <div className="space-y-6">
      <Typography variant="h4">Add Property Detail</Typography>

      <Typography variant="small" className="opacity-90 font-semibold">
        Property Type
      </Typography>
      <div className="mt-2 space-x-9">
        <Button variant="gradient" color="white" className="text-light-blue-900">
          Apartment
        </Button>
        <Button variant="gradient" color="white" className="text-light-blue-900">
          Independent Floor
        </Button>
      </div>

      <Typography variant="small" className="opacity-90 mt-3 font-semibold">
        Furnish Type
      </Typography>
      <div className="mt-2 space-x-9">
        <Button variant="gradient" color="white" className="text-light-blue-900">
          Fully Furnished
        </Button>
        <Button variant="gradient" color="white" className="text-light-blue-900">
          Semi Furnished
        </Button>
        <Button variant="gradient" color="white" className="text-light-blue-900">
          Unfurnished
        </Button>
      </div>

      <Typography variant="small" className="opacity-90 mt-3 font-semibold">
        BHK Type
      </Typography>
      <div className="mt-2 space-x-9">
        <Button variant="gradient" color="white" className="text-light-blue-900">
          1 BHK
        </Button>
        <Button variant="gradient" color="white" className="text-light-blue-900">
          2 BHK
        </Button>
        <Button variant="gradient" color="white" className="text-light-blue-900">
          3 BHK
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full md:w-[500px]">
        <Input variant="standard" placeholder="Building/House Name" />
        <Input variant="standard" placeholder="Locality" />
        <Input variant="standard" placeholder="Built up area sq.ft" />
      </div>

      <Button onClick={handleNext}>Next</Button>
    </div>
  );

  const renderPropertyPrice = () => (
    <div className="space-y-6">
    <Typography variant="h4">Add Property Price Detail</Typography>

    <Typography variant="small" className="opacity-90 font-semibold">
      Property Type
    </Typography>
    <div className="mt-2 space-x-9">
      <Button variant="gradient" color="white" className="text-light-blue-900">
        Apartment
      </Button>
      <Button variant="gradient" color="white" className="text-light-blue-900">
        Independent Floor
      </Button>
    </div>

    <Typography variant="small" className="opacity-90 mt-3 font-semibold">
      Furnish Type
    </Typography>
    <div className="mt-2 space-x-9">
      <Button variant="gradient" color="white" className="text-light-blue-900">
        Fully Furnished
      </Button>
      <Button variant="gradient" color="white" className="text-light-blue-900">
        Semi Furnished
      </Button>
      <Button variant="gradient" color="white" className="text-light-blue-900">
        Unfurnished
      </Button>
    </div>

    <Typography variant="small" className="opacity-90 mt-3 font-semibold">
      BHK Type
    </Typography>
    <div className="mt-2 space-x-9">
      <Button variant="gradient" color="white" className="text-light-blue-900">
        1 BHK
      </Button>
      <Button variant="gradient" color="white" className="text-light-blue-900">
        2 BHK
      </Button>
      <Button variant="gradient" color="white" className="text-light-blue-900">
        3 BHK
      </Button>
    </div>

    <div className="flex flex-col gap-6 w-full md:w-[500px]">
      <Input variant="standard" placeholder="Building/House Name" />
      <Input variant="standard" placeholder="Locality" />
      <Input variant="standard" placeholder="Built up area sq.ft" />
    </div>

    <Button onClick={handleNext}>Next</Button>
  </div>

  );

  // Add more functions for additional steps

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPropertyDetails();

      // Add more cases for additional steps
      case 1:
        return renderPropertyPrice()

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="absolute w-full max-w-screen-xl mx-auto bg-transparent border border-black border-opacity-25 md:left-0 xl:left-28 md:-mt-24 lg:-mt-24 xl:-mt-24 p-4 md:p-8 rounded-3xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 lg:w-1/4 xl:w-1/6 mb-1 md:mb-0 md:mr-4 lg:mr-8">
          <div className="w-full h-full bg-lime-50 shadow-2xl mt-1 rounded-2xl">
            <div className="">
              <StepperWithDots handleNext={handleNext} activeStep={activeStep} handlePrev={handlePrev} />
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
