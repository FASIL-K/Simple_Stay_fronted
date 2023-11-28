import React from 'react'
import * as jwt_decode from 'jwt-decode';

import { Outlet } from "react-router-dom";

import AdminHomePage from "../pages/Admin/AdminHomePage"
import UserLoginPage from "../pages/User/UserLoginPage"
import OwnerHomePage from "../pages/Owner/OwnerHomePage"

function PrivateRoute() {
    const token = localStorage.getItem('token')



    if (token){
        const decode = jwt_decode(token)
        if (decode.user_type === 'admin' ){
            return <AdminHomePage/>
        }
        else if(decode.user_type === 'owner'){
            return <OwnerHomePage/>
        }
        else if(decode.user_type === 'user'){
            return <UserLoginPage/>
        }
        else{
            console.log(decode.user_type)
            return <Outlet/>
        }
    }
    return <Outlet/> 
}


export default PrivateRoute



