import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserUrl } from "../../../../constants/constants";

function SuccessfulPayment() {
  const queryParameters = new URLSearchParams(window.location.search);
  const userId = queryParameters.get("userId");
  const planId = queryParameters.get("planId");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Use a ref to track whether the effect has already run
  const isMounted = useRef(true);

  useEffect(() => {
    const successUrl = `${UserUrl}premium/paymentsuccess/`;

    const fetchData = async () => {
      try {
        const response = await fetch(successUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, planId }),
        });
        console.log(response, "responsssssssssssssssssssssssssssssssssss");

        if (response.ok) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    // Check if the component is mounted before running the effect
    if (isMounted.current) {
      fetchData();
      // Set the ref to false after the first render
      isMounted.current = false;
    }

    // Cleanup function (will be called on component unmount)
    return () => {
      isMounted.current = false;
    };
  }, [userId, planId]); // Added dependencies to ensure useEffect runs when userId or planId changes

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className={`w-16 h-16 mx-auto my-6 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="20"
          >
            {success ? "✅" : "   "}
          </text>
        </svg>
        <div className="text-center">
          {loading && <p>Loading...</p>}
          {!loading && success && (
            <>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for doing business with us.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link to="/">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </button>
                </Link>
              </div>
            </>
          )}
          {!loading && !success && (
            <>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Failed
              </h3>
              <p>
                There was an issue processing your payment. Please try again
                later.
              </p>
              <div className="py-10 text-center">
                <Link to="/">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessfulPayment;
