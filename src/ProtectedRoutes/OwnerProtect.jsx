import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage';
import UserHomePage from '../pages/User/UserHomePage';
import OwnerSignupPage from '../pages/Owner/OwnerSignupPage';
import UserLoginPage from '../pages/User/UserLoginPage';

function OwnerProtect() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (token) {
    const decode = jwtDecode(token);

    if (decode.user_type === 'user') {
      return <UserHomePage />;
    } else if (decode.user_type === 'owner') {
      return <Outlet />;
    } else if (decode.user_type === 'admin') {
      return <AdminHomePage />;
    } else {
      console.log(decode, 'the else case of Owner Protected');
    }
  } else {
    // Redirect to the login page if no token is found
    console.log('No token found, redirecting to login');

    return <UserLoginPage/>
    // You might want to return null or a loading indicator here
    // depending on your use case
  }
}

export default OwnerProtect;
