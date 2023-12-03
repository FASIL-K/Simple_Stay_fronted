import React, { useState, useRef } from 'react';
// import backgroundImage from '../../../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from "../../../assets/main-logo.svg"; // Adjust the path accordingly
import {Loader} from "../../Loader/Loading"

function OwnerRegister() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({ email: '', password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const confirmPassInputRef = useRef(null);

  const Validation = () => {
    if (owner.email.trim() === '') {
      toast.error('Email field cannot be empty');
      return false;
    } else if (!isValidEmail(owner.email.trim())) {
      setOwner({ email: '', password: '', confirmPassword: '' });
      emailInputRef.current.focus();
      toast.error('Invalid email format');
      return false;
    } else if (owner.password.trim() === '') {
      passInputRef.current.focus();
      toast.error('Password should not be empty');
      return false;
    } else if (owner.password !== owner.confirmPassword) {
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
          import.meta.env.VITE_OWNER_URL + "register/",
          owner // The data object
        );
        
        handleLoading();
        toast.success(response.data.msg);
        setOwner({
          email: '',
          password: '',
          confirmPassword: '',
        });
        
      } catch (error) {
        handleLoading();
        console.log(error)
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.email) {
            toast.error(errorData.email[0]);
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
            {loading && <Loader/>}

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-96">
        <img src={logoImage} alt="Logo" className="mx-auto " />

          <div className="bg-white shadow-lg rounded p-8">
            <div className="mb-4">
              <h3 className="text-center text-2xl font-semibold">Owner Signup</h3>
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
                  value={owner.email}
                  id="email"
                  name="email"
                  className="w-full py-2 px-3 border rounded"
                  placeholder="Email"
                  onChange={(e) => setOwner({ ...owner, [e.target.name]: e.target.value })}
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
                  onChange={(e) => setOwner({ ...owner, [e.target.name]: e.target.value })}
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
                  onChange={(e) => setOwner({ ...owner, [e.target.name]: e.target.value })}
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

export default OwnerRegister;
