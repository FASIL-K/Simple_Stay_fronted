import React, { useEffect } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";


export default function StepperWithDots({ handleNext, activeStep ,handlePrev }) {
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleStepClick = (step) => {
    // handleNext(step);
    handlePrev(step)
    
  };

  useEffect(() => {
    setIsLastStep(activeStep === 2); // Update based on the number of steps
    setIsFirstStep(activeStep === 0);
  }, [activeStep]);

  return (
    <div className="flex flex-col items-center  py-4 px-8 mt-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        className="transform rotate-90 top-20  h-80 w-80 "
      >
        
        <Step className="h-4 w-4 " onClick={() => handleStepClick(0)} />
        <Step className="h-4 w-4" onClick={() => handleStepClick(1)} />
        <Step className="h-4 w-4" onClick={() => handleStepClick(2)} />

        
        
      </Stepper>
      
    </div>
  );
}
