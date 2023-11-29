import React from 'react'
import * as jwt_decode from 'jwt-decode';

import { Outlet } from "react-router-dom";

import AdminHomePage from "../pages/Admin/AdminHomePage"
import UserLoginPage from "../pages/User/UserLoginPage"
import OwnerHomePage from "../pages/Owner/OwnerHomePage"

function PrivateRoute() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Redirect unauthenticated users to the login page
      return <Navigate to="/login" />;
    }
  
    const decode = jwt_decode(token);
  
    if (decode.user_type === 'admin') {
      return <AdminHomePage />;
    } else if (decode.user_type === 'owner') {
      return <OwnerHomePage />;
    } else if (decode.user_type === 'user') {
      // User is already authenticated, no need to render a login page here
      return <Navigate to="/user" />;
    } else {
      console.log(decode.user_type);
      return <Navigate to="/" />;
    }
  }


export default PrivateRoute



