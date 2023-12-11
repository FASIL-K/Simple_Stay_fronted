import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSignin } from "../../services/adminApi/";
import { jwtDecode } from "jwt-decode";
import { Loader } from "../../components/Loader/Loading/";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  // Validation
  const validation = () => {
    if (form.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (form.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (!isValidEmail(form.email.trim())) {
      toast.error("Enter a valid email");
      return false;
    }
    return true;
  };

  // After submission
  const FormHandlerLogin = async (e) => {
    e.preventDefault();

    if (validation()) {
      handleLoading(); // Start loading

      try {
        const res = await AdminSignin(form);

        handleLoading(); // Stop loading regardless of the result

        if (res.status === 200) {
          const token = JSON.stringify(res.data);
          const decoded = jwtDecode(token);

          if (decoded.user_type === "admin" && decoded.is_admin) {
            localStorage.setItem("token", token);
            navigate("/admin/adminhomepage/");
          } else {
            toast.error("Invalid credentials");
          }
        } else {
          toast.error("Invalid login credentials. Please verify your email and password.");
        }
      } catch (error) {
        handleLoading(); // Stop loading in case of an error
        console.error("Error during login:", error);

        // You can customize the error message based on the specific error received
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="outward-shadow bg-white w-2/4 h-3/4 sm:w-1/3 flex justify-center items-center">
          <form
            className="space-y-8 sm:w-52 lg:w-80 xl:w-96 mt-4"
            action=""
            onSubmit={FormHandlerLogin}
          >
            <h1 className="text-2xl font-bold mb-8 text-center text-gray-600">ADMIN</h1>
            <Input
              name="email"
              id="email"
              value={form.email}
              className=""
              variant="standard"
              label="Email"
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
            <Input
              name="password"
              value={form.password}
              id="password"
              variant="standard"
              label="Password"
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
            <div className="flex justify-end">
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">
                Forgot password?
              </a>
            </div>
            <button className="w-11/12 bg-gray-700 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
