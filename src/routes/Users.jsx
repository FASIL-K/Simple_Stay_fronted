import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from '../pages/User/UserSignupPage'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute';
import UserProtect from '../ProtectedRoutes/UserProtect';
import UserHomePage from '../pages/User/UserHomePage';

function UsersRoutes() {
    
    return (
        <Routes >
         <Route exact element = {<PrivateRoute/>}>
            <Route path='/login/' element={<UserLoginPage/>}/> 
            <Route path='/signup/' element={<UserSignupPage/>}/> 
        </Route>
        <Route exact element = {<UserProtect/>}>

            <Route path='/userhome/' element = {<UserHomePage/>}/>
           
        </Route>
         
        </Routes>
        
      );
    }
    

export default UsersRoutes

