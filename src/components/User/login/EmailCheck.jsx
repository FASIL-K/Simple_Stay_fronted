import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Emailimage from "../../../assets/email.png";
import { UserResendEmail } from "../../../services/userApi";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../Loader/Loading";




function EmailCheck() {
  const location = useLocation();
  
  const email = location.state?.email || "";
  console.log(email,'femailddsaaaacdsaa');
  const [isResendDisabled, setResendDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(10); // Initial time in seconds
  const [loading, setLoading] = useState(false);


  const handleResendEmail = async () => {
    try {
        setLoading(true)
        const response = await UserResendEmail({
            email: email,
        });
        console.log(response,"daxoooooooooooooo")

      if (response.data.status === 'success') {
        setLoading(false)
        toast.success(response.data.msg)
        
        console.log('Verification email resent successfully');
      } else {
        console.error('Error resending verification email:', response.data.msg);
        toast.error(response.data.msg)
      }
    } catch (error) {
        toast.error(response.data.msg)
        setLoading(false)

      console.error('Error resending verification email:', error);
    }
}
  useEffect(() => {
    const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
            if (prevTime > 0) {
                return prevTime - 1;
            } else {
                // Enable the "Resend Email" button after 2 minutes
                setResendDisabled(false);
                clearInterval(interval);
                return 0;
            }
        });
    }, 1000);

    return () => {
        clearInterval(interval);
    };
}, []);


  // const email = location.state || '';

  const Gmail = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };

  return (
    <>
      <div className=" grid grid-rows mt-48">
      {loading && <Loader />}
      <ToastContainer />

        <div className="container mx-auto grid grid-rows-[13rem,5rem,3rem,5rem,4rem] -mt-32">
          <div className="flex justify-center">
            <img src={Emailimage} className="w-60" alt="" />
          </div>
          <div className="mt-5 flex justify-center">
            <p className="font-roboto-mono font-semibold sm:text-2xl text-xl">
              Verify your email to continue
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-prompt text-center text-md">
              Please check your email and select the <br /> link provided to
              verify your address.
            </p>
          </div>
          <div className="text-sm sm:mt-0 mt-8 text-[#051339] font-bold flex justify-center">
            <p className="cursor-pointer"> {email}</p>
          </div>
          <div className="flex justify-center ">
            <div className="flex justify-between sm:text-lg text-sm">
              <Button
                onClick={Gmail}
                className="text-white bg-[#051339]  sm:px-6 px-4 ms-5 my-2 xs:me-0 me-3 font-prompt-normal"
              >
                Go to Gmail inbox
              </Button>
            </div>
            <div className="flex justify-center">
                
  <Button
    onClick={handleResendEmail}
    disabled={isResendDisabled}
    className={`text-white bg-[#051339] sm:px-6 px-4 ms-5 my-2 xs:me-0 me-3 font-prompt-normal ${
      isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {isResendDisabled ? (
      `Please wait for ${Math.floor(remainingTime / 60)}m ${remainingTime % 60}s for resending`
    ) : (
      'Resend Email'
    )}
  </Button>
</div>

          </div>
        </div>
      </div>
    </>
  );
}

export default EmailCheck;

// import toast, { Toaster } from 'react-hot-toast'
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from '../../Assets/Connectlogo.png';

// const location = useLocation()
// const navigate = useNavigate()
// const email = location.state || '';
// console.log(email,'================================>>>>>email')
// useEffect(() => {
//     if (!email) {
//         navigate('/signup')
//     }

// }, [])
