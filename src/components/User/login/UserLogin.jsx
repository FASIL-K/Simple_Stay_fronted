import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import backgroundImage from "../../../assets/login.jpg";
import googlelogo from '../../../assets/google-logo.png'
import { useGoogleLogin } from '@react-oauth/google';
import { UserGoogleSignup, userSignin } from "../../../services/userApi";
import axios from "axios";
import * as jwtDecode from 'jwt-decode';
import { Auth_url } from "../../../constants/constants";
import logoImage from "../../../assets/main-logo.svg"; 



function UserLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  
  // Validations
  const Validation = () => {
    if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: "" });
      emailInputRef.current.focus();
      toast.warn("Enter a valid email");
      return false;
    } else if (user.password.trim() === "") {
      passInputRef.current.focus();
      toast.error("Password should not be empty");
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  // After form submission
  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (Validation()) {
      await axios.post(`${Auth_url}token/`, user)
        .then((res) => {
          if (res.status === 200) {
            const token = JSON.stringify(res.data);
            localStorage.setItem("token", token);
            toast.success("Login successful");
            navigate("/user/");
            console.log(res.data,'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
          } else {
            toast.error("Invalid login credentials");
          }
        })
        .catch((error) => {
          toast.error("Login failed");
        });
    }
  };

  const backgroundStyle = {
    backgroundImage: `url()`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    overflow: "hidden",
   
    
  };

  const [guser, setgUser] = useState([]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (guser) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`)
        .then((res) => {
          UserGoogleSignup(res.data).then((gres) => {
            if (gres.status === 201) {
              const token = JSON.stringify(gres.data.token);
              localStorage.setItem("token", token);
              toast.success("Login successful");
              navigate("/");
            } else {
              toast.error("Invalid login credentials");
            }
          });
        })
        .catch((err) => console.log(err));
        
    }
  }, [guser]);
  
  // Google signIn button design
  const customGoogleLoginButton = (
    <button
      type="button"
      className="flex items-center bg-light px-4 py-2 rounded"
      onClick={()=>handleGoogleLogin()}
      
    >
      <img
        src={googlelogo}
        alt="Google logo"
        className="google-logo img-fluid"
        width="22"
        height="22"
        
      />
      <span className="button-text ms-2">Continue with Google</span>
    </button>
  );

  return (
    <div  className="bg-cover bg-center bg " style={backgroundStyle} >
      <div className="flex justify-center items-center min-h-screen mb-2">
        <div className="w-96">
        <img src={logoImage} alt="Logo" className="mx-auto " />

          <div className="bg-white shadow-lg rounded p-8 ">
            <div className="mb-4">
              <h3 className="text-center text-2xl font-semibold">User Login</h3>
            </div>
            <ToastContainer />
            <form onSubmit={FormHandlerLogin}  className="mb-2">
              <div className="mb-3 text-center">
                <p className="text-gray-600">Please enter your email and password</p>
              </div>
              <div className="mb-4">
                <input
                  ref={emailInputRef}
                  type="email"
                  value={user.email}
                  id="email"
                  name="email"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Email"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <input
                  ref={passInputRef}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Password"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-yellow-400 text-white py-2 px-4 w-1/2 rounded"
                >
                  Sign In
                </button>
              </div>
              <div className="text-right mt-3">
                <Link to="#" className="text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </form>
            <div className="text-center my-3">
              <p className="text-gray-600">Or</p>
            </div>
            <div className="text-center" style={{margin:"2.5rem"}}>
              {customGoogleLoginButton}
            </div>
            <div className="text-center mt-3">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/usertype" className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
