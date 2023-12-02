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

  //validation

  const validation = () => {
    if (form.email.trim() === "") {
      toast.error("email should not be empty");
      return false;
    } else if (form.password.trim() === "") {
      toast.error("email should not be empty");
      return false;
    } else if (!isValidEmail(form.email.trim())) {
      toast.error("enter a valid email");
      return false;
    }
    return true;
  };

  //after submission

  const FormHandlerLogin = async (e) => {
    e.preventDefault();

    if (validation()) {
      handleLoading();
      AdminSignin(form).then((res) => {
        if (res.status === 200) {
          const token = JSON.stringify(res.data);
          const decoded = jwtDecode(token);
          handleLoading();
          if (decoded.user_type === "admin" && decoded.is_admin) {
            localStorage.setItem("token", token);
            navigate("/admin/adminhomepage/");
          } else {
            toast.error("invalid credentials");
            
          }
        }else{
          handleLoading();
          toast.error(
            "invalid login credentials please verify your email and password "
          ); 

        }
      });
    }
  };

  return (
    <>
    {loading && <Loader/>}
      <ToastContainer />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="outward-shadow bg-white w-2/4 h-3/4 sm:w-1/3 flex justify-center items-center">
          <form
            className="space-y-8 sm:w-52 lg:w-80 xl:w-96 mt-4"
            action=""
            onSubmit={FormHandlerLogin}
          >
            <h1 className="text-2xl font-bold mb-8 text-center text-gray-600">
              ADMIN
            </h1>
            <Input
              name="email"
              id="email"
              value={form.email}
              className=""
              variant="standard"
              label="Email"
              onChange={(e) => {
                console.log(form);
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
                console.log(form);
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
