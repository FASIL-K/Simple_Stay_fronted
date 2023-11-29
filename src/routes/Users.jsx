import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from '../pages/User/UserSignupPage'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute';
import UserProtect from '../ProtectedRoutes/UserProtect';
import UserHomePage from '../pages/User/UserHomePage';

function UsersRoutes() {
    return (
        <Routes element={<PrivateRoute/>}>
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/login" element={<UserLoginPage />} />
         
        </Routes>
        
      );
    }
    

export default UsersRoutes

