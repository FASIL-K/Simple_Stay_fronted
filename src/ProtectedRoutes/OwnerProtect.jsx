
import {jwtDecode} from 'jwt-decode';

import React from 'react'
import UserHomePage from '../pages/User/UserHomePage';
import { Outlet } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage';


function OwnerProtect() {
    const token = localStorage.getItem("token");
    if (token){
        const decode = jwtDecode(token)
        
        if (decode.user_type === "user") {
            return <UserHomePage/>
        }
         else if (decode.user_type === "owner") {
            
            return <Outlet/>
        } else if (decode.user_type === "admin") {
            return <AdminHomePage />
        } else {
            console.log(decode, "the else case of Customer Protected")
        }


    } else {
         // return <UnknownHomePage/>                                      use this once this page is created
         console.log(decode, "the else case of Customer Protected if this was null it means no data there to decode")
    }
}

export default OwnerProtect


