import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { PackageList } from "../../../../services/premiumApi";
import { PremiumAxiosInstant } from "../../../../utils/axiosUtils";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { UserUrl } from "../../../../constants/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function Premium() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const userData = jwtDecode(token);
  console.log(userData,"userdaaaaaaaaaaaataaaaaaaaaaaaaaaaaa");

  const paymentOfPremium = async (selectedPlan) => {
    try {
		const responsed = await fetch(`${UserUrl}premium/checkpremiumstatus/${userData.user_id}/`);
    	const premiumStatus = await responsed.json();
		if (premiumStatus.isPremium) {
			// Show a toast or a message indicating that the user is already a premium user
			toast.success("User is already a premium user")
			console.log("User is already a premium user");
			return;
		  }
      // Check if a plan is selected
      if (!selectedPlan) {
        console.error("Please select a premium plan.");
        return;
      }

      var data = {
        planId: selectedPlan.id,
        userId: userData.user_id,
        name: selectedPlan.name,
        currency: "INR",
        unit_amount: selectedPlan.price * 100, // Convert to cents
        quantity: 1,
        mode: "payment",
        success_url: 'http://localhost:5173/owner/customer/success=true',
        cancel_url: 'http://localhost:5173/owner/customer/canceled=true',
        // Add any additional data you need
      };

      console.log("Complete data object:", data); // Log the complete data object

      // Make a request to your backend to initiate the Stripe payment
      const response = await axios.post(`${UserUrl}premium/payment/`, data);

      // Redirect to the Stripe checkout session URL
      window.location.href = response.data.message.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };



  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await PremiumAxiosInstant.get(
          "packagesview/"
        );
        console.log(response,"dxasddddddddddddddddd");
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setError(error.message || "An error occurred while fetching packages.");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="py-20 dark:bg-gray-800 dark:text-gray-100">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-bold tracki uppercase dark:text-violet-400">
              Pricing
            </span>
            <h2 className="text-4xl font-bold lg:text-5xl">
              Choose your best plan
            </h2>
          </div>
          <div className="flex flex-wrap items-stretch -mx-4">
            {packages.map((pkg,index) => (
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-900">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">{pkg.name}</h4>
                    <span className="text-6xl font-bold">
					₹{pkg.price}
                      <span className="text-sm tracki">
                        {pkg.validity}/Days
                      </span>
                    </span>
                  </div>
                  <p className="leadi dark:text-gray-400">{pkg.description}.</p>
                  <ul className="space-y-2 dark:text-gray-400">
				  <li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
					 
                      <span>
                        
					  <li>Unlimited Post</li>
                        
                      </span>
					  
                    </li><li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
					 
                      <span>
                        
					  <li>24*7 Support</li>
                        
                      </span>
					  
                    </li><li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
					 
                      <span>
                        
					  <li>Priority Customer support</li>
                        
                      </span>
					  
                    </li><li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
					 
                      <span>
                        
					  <li>Zero Brokerage owners contacts</li>
                        
                      </span>
					  
                    </li>
                  </ul>
                  <button
                    rel="noopener noreferrer"
                    onClick={() => paymentOfPremium(pkg)}
                    className="inline-block w-full px-5 py-3 font-semibold tracki text-center rounded dark:bg-violet-400 dark:text-gray-900 hover:text-blue-900 transform transition"
                  >
                    BuyNow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
	  <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Premium;
