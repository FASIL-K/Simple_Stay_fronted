import React, { useState, useRef } from 'react';
// import backgroundImage from '../../../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../../../assets/main-logo.svg"; // Adjust the path accordingly
import {Loader} from "../../Loader/Loading"

function UserSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false);

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const confirmPassInputRef = useRef(null);

  const Validation = () => {
    if (user.email.trim() === '') {
      toast.error('Email field cannot be empty');
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: '', password: '', confirmPassword: '' });
      emailInputRef.current.focus();
      toast.error('Invalid email format');
      return false;
    } else if (user.password.trim() === '') {
      passInputRef.current.focus();
      toast.error('Password should not be empty');
      return false;
    } else if (user.password !== user.confirmPassword) {
      confirmPassInputRef.current.focus();
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }


  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (Validation()) {
      handleLoading();
      try {
        const response = await axios.post(
          import.meta.env.VITE_USER_URL + "/user/register/",
          user // The data object
        );

        console.log(response.data);

        setUser({
          email: '',
          password: '',
          confirmPassword: '',
        });
        handleLoading();
        toast.success(response.data.msg);
      } catch (error) {
        console.log(error,'facacfs');
        handleLoading();

        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.email) {
            toast.error('Email Already Exists');
          }
        } else {
          toast.error("An error occurred during registration.");
        }
      }
    }
  };
 

  const backgroundStyle = {
    backgroundImage: `url()`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={backgroundStyle}>
            {loading && <Loader />}

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-96">
        <img src={logoImage} alt="Logo" className="mx-auto " />

          <div className="bg-white shadow-lg rounded p-8">
            <div className="mb-4">
              <h3 className="text-center text-2xl font-semibold">User Signup</h3>
            </div>
            <ToastContainer />
            <form onSubmit={FormHandlerSignup}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={user.email}
                  id="email"
                  name="email"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  ref={passInputRef}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Password"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  ref={confirmPassInputRef}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Confirm Password"
                  onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="bg-yellow-400 text-white py-2 px-4 w-1/2 rounded">
                  {submitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
              <p className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/user/login" className="text-blue-500">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
