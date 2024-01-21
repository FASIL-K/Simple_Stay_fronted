import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLoginPage from "../pages/User/UserLoginPage";
import UserSignupPage from '../pages/User/UserSignupPage'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute';
import UserProtect from '../ProtectedRoutes/UserProtect';
import UserHomePage from '../pages/User/UserHomePage';
import PropertyList from '../pages/User/PropertyList';
import PropertySinglePages from '../pages/User/PropertySinglePage';
import UserProfile from '../pages/User/UserProfile';
import UserProfileActivity from '../pages/User/UserProfileActivity';

function UsersRoutes() {
    
    return (
        <Routes >
         <Route exact element = {<PrivateRoute/>}>
            <Route path='/login/' element={<UserLoginPage/>}/> 
            <Route path='/signup/' element={<UserSignupPage/>}/> 
        </Route>
        <Route exact element = {<UserProtect/>}>

        <Route path='/userhome/' element = {<UserHomePage/>}/>
        <Route path='/userprofile/' element = {<UserProfile/>}/>
        <Route path='/userprofile/myactivity/' element = {<UserProfileActivity/>}/>
        <Route path='/property_list/' element = {<PropertyList/>}/>
        <Route path='/property/:propertyId' element={<PropertySinglePages />} />

        </Route>
         
        </Routes>
        
        
      );
    }
    

export default UsersRoutes

