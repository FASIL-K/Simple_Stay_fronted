import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import backgroundImage from "../../../assets/login.jpg";
import googlelogo from '../../../assets/google-logo.png'
import { useGoogleLogin } from '@react-oauth/google';
import { UserGoogleSignin, UserGoogleSignup, UserSignin} from "../../../services/userApi";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { UserUrl } from "../../../constants/constants/"
import logoImage from "../../../assets/main-logo.svg"; 
import {Loader} from '../../Loader/Loading'
import { setUserDetails } from "../../../redux/User";
import { useDispatch } from "react-redux";


function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const [guser,setGuser] = useState()
  const [token, setToken] = useState(null);


  
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
  UserUrl

  // After form submission
  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (Validation()) {
      handleLoading();
  
      try {
        const res = await UserSignin(user);
  
        if (res) {
          const token = JSON.stringify(res);
          const decoded = jwtDecode(token);
          const setUser = {
            "user_id": decoded.user_id,
            "email": decoded.email,
            "name": decoded.name,
            "phone": decoded.phone,
            "user_type":decoded.user_type,
            "i_google": decoded.is_google,
            "is_active": decoded.is_active,
            "profileImage":decoded.profile_image,

          };

          dispatch(setUserDetails(setUser));

  
          localStorage.setItem('token', token);
  
          if (decoded.user_type === "user") {
            if (decoded.is_active) {
              navigate("/user/userhome/");
            } else {
              toast.error("Your account is not active, please try again later");
              navigate("/login/");
            }
          } else if (decoded.user_type === 'owner') {
            if (decoded.is_active) {
              navigate("/owner/ownerhome/");
            } else {
              toast.error("Your account is inactive, please try again later");
              navigate("/login/");
            }
          }
        } else {

          toast.error(
            "Invalid login credentials, please verify your email and password."
          );
        }
      } catch (error) {
        const res = await UserSignin(user);

        if (res) {
          toast.error(res.data.detail);
        } else {
          toast.error("An error occurred during login.");
        }
      } finally {
        handleLoading();
      }
    }
  };
  

  const backgroundStyle = {
    backgroundImage: `url()`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    overflow: "hidden",
   
    
  };


  
  useEffect(() => {
    
    document.title = "Login | SimpleStay";

    const GoogleAuth = async () => {
      try {
        
        if (!guser) return;
  
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${guser.access_token}`,
              Accept: "application/json",
            },
          }
        );
        const backend_access = guser.access_token
        const token_data = response.data
        
        
  
        const res = await UserGoogleSignup(backend_access,token_data);
        console.log(res,'DAXOOOOOOOOOOOO');
        const token = JSON.stringify(res.data.token);
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
       
        const setUser = {
            "user_id" :decoded.user_id,
            "email" : decoded.email,
            "phone" : decoded.phone,
            "i_google" : decoded.is_google,
            "is_active" : decoded.is_active,
            "profileImage" : decoded.profileImage,

          }
          console.log(setUser,'fascascascascdasdaxoooooooooooooooocs');
          dispatch(setUserDetails(setUser));



        
        if (decoded.user_type === "user") {
          if (decoded.is_active) {
            navigate("/user/userhome/");
          } else {
            toast.error("Your account is not active, please try again later");
            navigate("/login/");
          }
        } else if (decoded.user_type === 'owner') {
          if (decoded.is_active) {
            navigate("/owner/ownerhome/");
          } else {
            toast.error("Your account is inactive, please try again later");
            navigate("/login/");
          }
        }

      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("An error occurred during signup.");
        }
      }
    };

    if (guser) {
      GoogleAuth();
    }

  }, [guser]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGuser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  // Google signIn button design
  const customGoogleLoginButton = (
    <button
      type="button"
      className="flex items-center bg-light px-4 py-2 rounded"
      onClick={()=>login()}
      
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
    <>
    {loading && <Loader/>}
    
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
    </>
  );
}

export default UserLogin;
