// ProtectedRoute.jsx
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem('token');

  if (token) {
    const decode = jwtDecode(token);

    if (allowedRoles.includes(decode.user_type)) {
      return <Outlet />;
    } else {
      // Redirect to a login page or handle unauthorized access
      console.log(decode, 'Unauthorized access');
      return <Navigate to="/login/" />;
    }
  } else {
    // Redirect to the login page if no token is found
    console.log('No token found, redirecting to login');
    return <Navigate to="/login/" />;
  }
}

export default ProtectedRoute;
