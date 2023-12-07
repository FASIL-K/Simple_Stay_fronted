import React from 'react';
import { jwtDecode } from "jwt-decode";
import {  Navigate, Outlet } from 'react-router-dom';

import AdminHomePage from '../pages/Admin/AdminHomePage';
import OwnerHomePage from '../pages/Owner/OwnerHomePage';
import UserHomePage from '../pages/User/UserHomePage';

function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    const decode = jwtDecode(token);
    if (decode.user_type === "owner") {
      return <OwnerHomePage />;
    } else if (decode.user_type === "user") {
      return <UserHomePage />;
    } else if (decode.user_type === "admin") {
      return <AdminHomePage />;
    }
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
 