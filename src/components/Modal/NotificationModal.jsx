import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";


function NotificationModal({ buttonText, modalTitle, modalContent, onOkClick,modalHeading,buttonColor }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleOkClick = () => {
    onOkClick(); // Call the provided onOkClick function
    handleOpen(); // Close the modal
  };

  return (
    <>
      
      <Button onClick={handleOpen} color={buttonColor}>{buttonText}</Button>
      <Dialog open={open} handler={handleOpen} size='xxl' className='bg-black bg-opacity-[10rem]  backdrop-blur-sm' >
        <div className='text-center mt-[10rem] bg-white shadow-2xl w-[40rem] h-[20rem] ml-80'>

          <Typography variant="h5" color="blue-gray" className='mt-10'>
            {modalTitle}
          </Typography>
        
        <div className="grid place-items-center gap-4">
        
          <Typography color="red" variant="h4">
            {modalHeading}
          </Typography>
          {modalContent}
        </div>
        <div className="space-x-2 mt-14 ">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" onClick={handleOkClick}>
            Ok, Got It
          </Button>
        </div>
        </div>

      </Dialog>
    </>
  );
}

export default NotificationModal;




