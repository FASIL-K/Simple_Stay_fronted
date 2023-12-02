import React from 'react';
import { jwtDecode } from "jwt-decode";
import {  Navigate, Outlet } from 'react-router-dom';

import AdminHomePage from '../pages/Admin/AdminHomePage';
import OwnerHomePage from '../pages/Owner/OwnerHomePage';
import UserHomePage from '../pages/User/UserHomePage';

function PrivateRoute() {
  const token = localStorage.getItem("token");
  console.log(token,'ascdvwedcs');

  if (token) {
    const decode = jwtDecode(token);
    if (decode.role === "owner") {
      return <OwnerHomePage />;
    } else if (decode.role === "user") {
      return <UserHomePage />;
    } else if (decode.role === "admin") {
      return <AdminHomePage />;
    }
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
 